"use strict"

window.addEventListener('DOMContentLoaded', () => {

//TABS

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



    //TIMER

    const day = new Date();

    const year = day.getFullYear();
    const month = day.getMonth();
    const chislo = day.getDate();

    const afterData = `${year}-${month + 1}-${chislo + 2}`;


    const deadline = afterData;

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };            
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();      

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);




    //MODAL WINDOW

    const modalTrigger = document.querySelectorAll('[data-modal]'),                  //Создаем переменные по атрибутам элемента
          modal = document.querySelector('.modal'),                                  //Переменная модального окна
          modalCloseBtn = document.querySelector('[data-close]');                    //Переменная крестика закрытия
    
    modalTrigger.forEach(item => {
        item.addEventListener('click', modalOpen);                                   //Перебираем триггеры(кнопки) и создаем для каждого событие клик с функцией открытия модально окна
    });

    function modalOpen() {
        modal.classList.add('show');                                                //Функция открытия модально окна       --добавляется класс
        modal.classList.remove('hide');                                             //                                     --удаляется класс  
        document.body.style.overflow = 'hidden';                                    //                                     --добавляется свойство css
        clearInterval(modalTimerId);                                                //                                     --удаляется функция интервала
    }
    
    function closeModal () {
        modal.classList.add('hide');                                               //Функция закрытия модально окна       --добавляется класс
        modal.classList.remove('show');                                            //                                     --удаляется класс
        document.body.style.overflow = 'auto';                                     //                                     --добавляется свойство css
    }

    modalCloseBtn.addEventListener('click', closeModal);                           //Навешивается события на крестик для закрытия модального окна

    modal.addEventListener('click', (e) => {                                       //Если клик на область вне модально окна то функция закрытия
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {                                  //Событие при нажатии на кнопку "Escape", тоже закрытие окна
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(modalOpen, 10000);                             //Открытие модального окна через 10с через функцию setTimeout

    function showModalByScroll() {                                                                                    //Если сумма высоты документа и высоты экрана больше либо равно 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {    //перемещению по высоте документа
            modalOpen();                                                                                              //вызываем функцию открытия окна
            window.removeEventListener('scroll', showModalByScroll);                                                  //и удаляем событие скролла с этой самой функцией
        }
    }

    window.addEventListener('scroll', showModalByScroll);                           //Событие скролла с функцией showModalByScroll


});






