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
          modal = document.querySelector('.modal');                                  //Переменная модального окна
                              
    
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


    modal.addEventListener('click', (e) => {                                       //Если клик на область вне модально окна то функция закрытия
        if (e.target === modal || e.target.getAttribute('data-close') == '') {           //или на элемент с атрибутом data-close, который без значения
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {                                  //Событие при нажатии на кнопку "Escape", тоже закрытие окна
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(modalOpen, 50000);                             //Открытие модального окна через 50с через функцию setTimeout

    function showModalByScroll() {                                                                                    //Если сумма высоты документа и высоты экрана больше либо равно 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {    //перемещению по высоте документа
            modalOpen();                                                                                              //вызываем функцию открытия окна
            window.removeEventListener('scroll', showModalByScroll);                                                  //и удаляем событие скролла с этой самой функцией
        }
    }

    window.addEventListener('scroll', showModalByScroll);                           //Событие скролла с функцией showModalByScroll


    //CLASSES

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



    //FORMS

    const forms = document.querySelectorAll('form');                             //NodeList форм сайта
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
        modalOpen();                                                               //Методом открываем модальное окно
 
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

            closeModal();                                                          //Закрываем новое модальное окно через4с
            
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
});








