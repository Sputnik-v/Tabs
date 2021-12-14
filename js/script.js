"use strict"

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),                               //Создаем переменные: 1. массив из кнопок меню 
          tabsContent = document.querySelectorAll('.tabcontent'),                             //                    2. массив из контентов табов                    
          tabsParent = document.querySelector('.tabheader__items');                           //                    3. активная кнопка с определенным классом


    function hideTabContent() {                                                              //Функция для переборки контента и добавления и удаления определенного класс
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach((tab) => {                                                             //А также для удаления активного класса
            tab.classList.remove('tabheader__item_active');
        });
    };  
    
    function showTabContent(i = 0) {                                                       //Функция для добавления определенному контенту классов и удалению класса, а также добавлению активного класса кнопке
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('.tabheader__item_active');
    };

    hideTabContent();

    showTabContent();


    tabsParent.addEventListener('click', (e) => {                                         //Делегирование событий.. Установка события на родительский элемент кнопок
        const target = e.target;                                                          //Установка переменной - элемент на который нажали(кнопку)

        if (target && target.classList.contains('tabheader__item')) {                     //Если элемент, на который нажали есть и у этого элемента имеется класс 'tabheader__item'
            tabs.forEach((item, i) => {                                                   //Перебираем кнопки-элементы
                if (target == item) {                                                     //Если элемент , на который нажали равен элементу в переборе 
                    hideTabContent();                                                     //То вызываем функции к этому элементу
                    showTabContent(i);
                };
            });
        };
    });

});