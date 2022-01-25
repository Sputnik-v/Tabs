/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculate.js":
/*!*********************************!*\
  !*** ./js/modules/calculate.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculate() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex =  localStorage.getItem('sex')
    } else {
        sex = 'femail';
        localStorage.setItem('sex', 'femail');
    }

    if (localStorage.getItem('ratio')) {
        ratio =  localStorage.getItem('ratio')
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', '1.375');
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((item) => {
            item.classList.remove(activeClass);
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'; // Можете придумать что угодно
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
                input.style.color = 'red';
                input.style.textDecoration = 'underline'
            } else {
                input.style.border = 'none';
                input.style.color = 'black';
                input.style.textDecoration = 'none'
            }
            
            switch(input.getAttribute('id')) {
                
                case "height":
                    
                    height = +input.value;
                    break;
                case "weight":
                    
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculate);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {        //Создаем конструктор класса с параметрами(аргументами), а также с rest оператором для добавления в будущем других аргументов
            this.src = src;                                                             //путь к картинке
            this.alt = alt;                                                             //альт картинки
            this.title = title;                                                         //название карточки
            this.descr = descr;                                                         //текст карточки
            this.price = price;                                                         //цена на карточке
            this.classes = classes;                                                     //массив из аргументов
            this.parent = document.querySelector(parentSelector);                       //селектор элемента
            this.transfer = 27;                                                         //курс доллара
            this.changeToUAH();                                                         //метод, переводящий доллары в гривны
        }

        changeToUAH() {
            this.price = this.price * this.transfer;                                    //Сам метод, переводящий доллары в гривны
        }

        render () {                                                                     //Основной метод render()
            const element = document.createElement('div');                              //Создаем html элемент

            if (this.classes.length === 0) {                                            //Создаем условие, что если в конструкторе в массиве classes 0 элементов
                this.classes = 'menu__item';                                            //то добавляем в classes дефолтное значение класса
                element.classList.add(this.classes);                                    //и добавляем к элементу этот класс
            } else {
                this.classes.forEach(className => {                                     //а иначе перебираем этот массив и добавляем к элементу эти классы, переданные в массив classes
                    element.classList.add(className)
                });
            }

            
            element.innerHTML = `                                                       
            
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                
            `
                                                                                          
            this.parent.append(element);                                                  //Добавляем наш элемент с содержимым в родительский элемент parent
        }
    }

    const getResource = async (url) => {                                                 //Отправляем запрос на получение данных
        const res = await fetch(url);

        if (!res.ok) {                                                                   //Если статус не ок, выкидывем ошибку
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();                                                         //Иначе возвращаем данные в json формате
    };

    getResource('http://localhost:3000/menu')                                            //делаем запрос на сервер
        .then(data => {                                                                  //Получаем ответ
            data.forEach(({img, altimg, title, descr, price}) => {                              //Перебираем данные, создавая новый объект на основе класса и применяя к нему метод render()
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();     //Используем деструктуризацию для перебора свойств объекта
            })
        });

    // axios.get('http://localhost:3000/menu')
    //     .then(dataProm => {                                                                      //Получение данных с сервера при помощи библиотеки axios
    //         dataProm.data.forEach(({img, altimg, title, descr, price}) => {                              
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

                                                                               
    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         createCard(data);                                                   //Делаем запрос на сервер и вызываем функцию обработки данных
    //     });

    // function createCard(data) {                                                 //Функция работы с данными
    //     data.forEach(({img, altimg, title, descr, price}) => {                  //Перебираем данные, раскладывая полученный объект на свойства
    //         const element = document.createElement('div');                      //Создаем элемент
    //         element.classList.add('menu__item');                                //Добавляем класс и разметку со свойствами в нашем полученном объекте
    //         element.innerHTML = `                                               
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);          //Добавляем элемент на страницу
    //     })
    // }   

        //ОПЕРАТОР REST

    // const log = function(a, b, ...rest) {        //оператор rest в данном примере собирает оставшиеся аргументы в массив
    //     console.log(a, b, rest)
    // }
    // log(23, 24, 25, 27);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modalwindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalwindow.js */ "./js/modules/modalwindow.js");


function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);                             //NodeList форм сайта
    const message = {
        loading: 'img/form/spinner.svg',                                         //Объект с записями после отправки формы
        success: 'Спасибо! Скоро мы с вами свяжемся',                            //В loading -- путь к файлу svg
        failure: 'Что-то пошло не так...'
    };


    forms.forEach(item => {                                                     //Перебираем формы, подставляя их в аргумент функции
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {                                         //Создаем асинхронную функцию
            method: 'POST',                                                    //и ожидаем fetch
            headers: {                                                         //после этого возвращаем ответ в json формате
                'Content-Type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {                                                  //Основная функция
        form.addEventListener('submit', (e) => {                               //Событие при отправке формы submit
            e.preventDefault();                                                //Изменяем стандартное действия браузера

            let statusMessage = document.createElement('img');                 //Создаем элемент img
            statusMessage.src =message.loading;                                //Добавляем src атрибут к нему
            statusMessage.style.cssText = `
                display: block;                                                
                margin: 0 auto;
            `;                                                                 //Добавляем CSS свойства элементу img
            
            form.insertAdjacentElement('afterend', statusMessage);              //Добавляем в форму наш код
        
            // const request = new XMLHttpRequest();                              //Создаем объект на основе класса XML..
            // request.open('POST', 'server.php');                                //Инициализируем запрос на сервер методом POST
         

            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');   //Отправляем заголовки
            const formData = new FormData(form);                               //Создаем объект formData на основе класса FormData, передавая параметр нашей формы

             
            const json = JSON.stringify(Object.fromEntries(formData.entries()));              //Берем formData, сначало превращаем массив массивов ее, после этого превращаем ее в классический объект, а после уже превращаем в JSON
                                                                                              
           
            postData('http://localhost:3000/requests', json)                       //Отправляем данные на сервер
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
           
            // request.send(json);                                                //Отправляем на сервер наши json-данные

            // request.addEventListener('load', () => {                           //Создаем событие load при загрузке данных на сервер
            //     if (request.status === 200) {                                  //Если статус запроса, отправки 200
            //         console.log(request.response);

            //         showThanksModal(message.success);                          //Вызываем функцию нового модально окна после отправки
            //         form.reset();                                              //Скидываем данные с полей форм
            
            //         statusMessage.remove();
                        
                   
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }


    function showThanksModal(message) {                                            //Создаем функцию модального окна "Спасибо" (аргумент -- сообщение пользователю)

        const prevModalDialog = document.querySelector('.modal__dialog');          //Находим элемент модального окна
        prevModalDialog.classList.add('hide');                                     //Добавляем к нему класс
        (0,_modalwindow_js__WEBPACK_IMPORTED_MODULE_0__.modalOpen)('.modal', modalTimerId);                                                               //Методом открываем модальное окно
 
        const thankModal = document.createElement('div');                          //Создаем элемент div
        thankModal.classList.add('.modal__dialog');                                //Добавляем к нему класс
        thankModal.innerHTML = `                                                   
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;                                                                         //Добавляем к нему контент
                                                                                    
        document.querySelector('.modal').append(thankModal);                       //Добавляем этот созданный элемент, родитель которого является элемент с классом "modal"

        setTimeout(() => {                                                         
            thankModal.remove();                                                   //Удаляем это новое модальное окно
            prevModalDialog.classList.add('show');                                 //Добавляем элементу с классом '.modal__dialog' новый класс
            prevModalDialog.classList.remove('hide');                              //Удаляем у него класс "hide"

            (0,_modalwindow_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');                                                          //Закрываем новое модальное окно через4с
            
        }, 4000)                                                                   
    }

    //*********************** FETCH API **********************/
    

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Igor', family: 'Tronin'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json))

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modalwindow.js":
/*!***********************************!*\
  !*** ./js/modules/modalwindow.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "modalOpen": () => (/* binding */ modalOpen)
/* harmony export */ });
function modalOpen(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');                                                //Функция открытия модально окна       --добавляется класс
  modal.classList.remove('hide');                                             //                                     --удаляется класс  
  document.body.style.overflow = 'hidden';                                    //                                     --добавляется свойство css
  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);                                                //                                     --удаляется функция интервала
  }
  

}

function closeModal (modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');                                               //Функция закрытия модально окна       --добавляется класс
  modal.classList.remove('show');                                            //                                     --удаляется класс
  document.body.style.overflow = 'auto';                                     //                                     --добавляется свойство css
}


function modalWindow(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),                  //Создаем переменные по атрибутам элемента
    modal = document.querySelector(modalSelector);                                  //Переменная модального окна
                        

modalTrigger.forEach(item => {
  item.addEventListener('click', () => modalOpen(modalSelector, modalTimerId));                                   //Перебираем триггеры(кнопки) и создаем для каждого событие клик с функцией открытия модально окна
});




modal.addEventListener('click', (e) => {                                       //Если клик на область вне модально окна то функция закрытия
  if (e.target === modal || e.target.getAttribute('data-close') == '') {           //или на элемент с атрибутом data-close, который без значения
      closeModal(modalSelector);
  }
});

document.addEventListener('keydown', (e) => {                                  //Событие при нажатии на кнопку "Escape", тоже закрытие окна
  if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
  }
});



function showModalByScroll() {                                                                                    //Если сумма высоты документа и высоты экрана больше либо равно 
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {    //перемещению по высоте документа
      modalOpen(modalSelector, modalTimerId);                                                                                              //вызываем функцию открытия окна
      window.removeEventListener('scroll', showModalByScroll);                                                  //и удаляем событие скролла с этой самой функцией
  }
}

window.addEventListener('scroll', showModalByScroll);                           //Событие скролла с функцией showModalByScroll

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currTextContent();

        getOpacity(dots);

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currTextContent();

        getOpacity(dots);
      
    });

    

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`

            currTextContent();

            getOpacity(dots);

        });
    });

    function getOpacity(arrayDots) {
        arrayDots.forEach(dot => dot.style.opacity = '.5');
        arrayDots[slideIndex - 1].style.opacity = '1';
    }

    function currTextContent() {
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    };

    // showSlides(slideIndex);                                             //Инициализация слайдов

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;                        //Если количество слайдов меньше 10, то добавляем в текст элемента перед числом 0
    // } else {
    //     total.textContent = `${slides.length}`;                         //иначе не добавляем
    // }

    // function showSlides(n) {                                            //Функция для числового изменения номера слайда
    //     if (n > slides.length) {                                        //Если номер слайда больше длины массива слайдов, ставим переменную на 1
    //         slideIndex = 1
    //     }
    //     if (n < 1) {                                                   //Если номер слайда меньше 1, ставим переменную в номер длины слайдов
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');           //Скрываем все слайды на странице

    //     slides[slideIndex - 1].style.display = 'block';                //Ставим слайду display = block

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;                    //Если количество слайдов меньше 10, то добавляем в номер текущего слайда 0
    //     } else {
    //         current.textContent = slideIndex;                          //иначе не добавляем
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n)                                    //Функция для вызова showSlides()
    // }
    
    // prev.addEventListener('click', (e) => {                           //Событие на стрелки с вызовом функции
    //     e.preventDefault();
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     plusSlides(1);
    // })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modalwindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modalwindow */ "./js/modules/modalwindow.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculate */ "./js/modules/calculate.js");


;





 


window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modalwindow__WEBPACK_IMPORTED_MODULE_1__.modalOpen)('.modal', modalTimerId), 50000);                             //Открытие модального окна через 50с через функцию setTimeout

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modalwindow__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_calculate__WEBPACK_IMPORTED_MODULE_6__["default"])();      

});










})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map