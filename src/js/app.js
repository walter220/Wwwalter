/**
 * Created by: Walter Jansen
 */

import _ from 'lodash';
import '../css/style.css';

function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());
