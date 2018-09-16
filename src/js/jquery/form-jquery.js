//formularz laczy sie na skrypt ktory ma podany w atrybucie action
//skrypt wymaga polaczeniea post i danych z nazwami name
//formName
//formEmail
//formMsg
//tak zwa sie pola (maja takie atrybuty name)
//skrypt mozesz zobaczyc w katalogu dist - nazywa sie send-script.php

function form() {
    const $form = $('#mainForm');
    const $inputs = $form.find('input[required], textarea[required]');

    //wszystkim wymaganym inputom podpieliśmy event "input" (taki fajny gdy sie wpisuje do pola)
    $inputs.on('input', function() {
        //checkValidity spradza czy pole jest wypelnione poprawnie
        //robi to na bazie:
        //atrybut require
        //atrybut pattern lub type pola (np email)
        if (!this.checkValidity()) { //czysto metoda - dlatego tutaj nie ma $(this)
            $(this).addClass('form-control-error');
        } else {
            $(this).removeClass('form-control-error');
        }
    })


    //musze wylaczyc walidacje html ktora bazuje na required i pattern kolejnych pol
    $form.attr('novalidate', true);
    $form.on('submit', function(e) {
        e.preventDefault();
        const $btn = $form.find('button:submit');

        //spradzam czy pola sa bledne
        let formHasError = false;
        $inputs.each(function() {
            if (!this.checkValidity()) { //jsowa metoda - dlatego tutaj nie ma $(this)
                $(this).addClass('form-control-error');
                formHasError = true;
            } else {
                $(this).removeClass('form-control-error');
            }
        })

        //jak nie sa to robie wysylke
        if (!formHasError) {
            $btn.addClass('loading');
            $btn.prop('disabled', true);

            //url i metode pobieram bezposrednio z formularza
            //skrypt wysyla dane do skryptu na serwerze. Skrypt ten spradza te dane
            //a jak sa ok to wysyla maila.
            //skrypt dorzucam do katalogu dist
            $.ajax({
                url : $form.attr('action'),
                method : $form.attr('method'),
                dataType : 'json',

                //jquery pozwala caly formularz zamienic na obiekt - dzieki temu nie trzeba tego robic recznie
                //ale wtedy wazne jest by parametry "name" pol byly takie jakich wymaga skrypt.
                //mozemy to zawsze zrobic recznie jak ponizej, albo uzyc wlasnie serialize:


                // data : {
                //     formName : $('#formName').val(),
                //     formEmail : $('#formEmail').val(),
                //     formMsg : $('#formMsg').val(),
                // }
                data : $form.serialize()
            }).done(response => {
                //skrypt na serwerze tez sprawdza czy dane sa dobrze wyslane
                //bo mogla by byc sytuacja ze ktos nam wysle dane z innej strony, albo cos spreparuje

                //z serwera dostajemy zwrotke (skrypt jest tak napisany by takie cos zwracal):
                //{status : "ok"} - wszystko ok
                //{status : "error"} - coś poszło nie tak (np przy wysylaniu maila nie ustawiliśmy właściwego emaila dla nagłówka from )
                //{errors : ["name", "email", "message"]} - errors zawiera tablice blednie wypelnionych pol

                //xhr.response to to samo co res ---> .done(function(res) {})

                $form.find('.form-message').remove()
                if (response.status === "ok") {
                    $form.find('button:submit').after('<div class="form-message">Wysłano wiadomość</div>');
                } else if (response.status==="error") {
                    $form.find('button:submit').after('<div class="form-message">Coś poszło nie tak</div>');
                }

                if (response.errors) {
                    //tablica errors zawiera nazwy blednie wypelnionych pol
                    //pobieram je i daje im klasy error
                    response.errors.forEach(el => {
                        $form.find(`[name="${el}"]`).addClass('form-control-error');
                    });
                }
            }).fail(() => {
                $form.find('.form-message').remove()
                $form.find('button:submit').after('<div class="form-message">Wystąpił błąd w połączeniu</div>');
            }).always(() => {
                $btn.removeClass('loading');
                $btn.prop('disabled', false);
            })

        }
    });
}

export {
    form
}