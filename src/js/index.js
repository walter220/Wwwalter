/**
 * Created by: Walter Jansen
 */

console.log('WWWalter v0.0.1');

// Stylesheet imports for webpack
// import '../sass/test.css';
import '../sass/main.scss';

// Library imports for global usage
import $ from 'jquery';

/**
 * Setting global libraries
 */
window.jQuery = $;
window.$ = $;

// import 'bootstrap';

$(document).ready(() => {

    let $btn = $('button');
    let $box = $('.box');

    $btn.click(() => {
        let curVal = $box.text();
        $box.text(curVal += ' Added');
    });

});
