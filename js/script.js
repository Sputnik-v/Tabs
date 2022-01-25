"use strict"

import tabs from './modules/tabs';
import modalWindow from './modules/modalwindow';
import timer from './modules/timer';
import forms from './modules/forms';
import cards from './modules/cards';
import slider from './modules/slider';
import calculate from './modules/calculate'; 
import {modalOpen} from './modules/modalwindow';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => modalOpen('.modal', modalTimerId), 50000);                             //Открытие модального окна через 50с через функцию setTimeout

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modalWindow('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-02-02');
    forms('form', modalTimerId);
    cards();
    slider({
        container: '.offer__slide',
        slide: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calculate();      

});









