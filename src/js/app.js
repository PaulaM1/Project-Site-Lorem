import {Slider} from './js/slider';
import {parallax} from './js/parallax';
import {header} from './js/header';
import {map} from './js/map';
import {form} from './js/form-jquery'; //w src/js/ jest jeszcze wersja jquery

//wyjatkowa sytuacja w Google Map
//google map w linku podaje odniesienie do tej funkcji
//webpack nam zamyka caly kod w moduly, ktore nie sa widoczne na zewnatrz
//zeby ta funkcja byla widoczna na zewnatrz, dodajemy ja do obiektu window
//ale zmienilem mapę na mapBoxa przez to że google rząda podania danych karty przy zakladaniu mapy
//wiec w pliku map.js znajdziesz uzycie mapBox, które jest nawet prostsze
// window.initMap = function() {
//     map();
// };

//po zaladowaniu dokumentu odpalamy co należy
//zauważ, że DOMContentLoaded dopiero tutaj użyliśmy
document.addEventListener('DOMContentLoaded', function() {

    parallax();
    header();
    form();

    const slider = new Slider('.banner', {
        pauseTime : 5000
    });

});
