import {closeModal, modalOpen} from './modalwindow.js';
import {postData} from '../services/services.js';

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
        modalOpen('.modal', modalTimerId);                                                               //Методом открываем модальное окно
 
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

            closeModal('.modal');                                                          //Закрываем новое модальное окно через4с
            
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

export default forms;