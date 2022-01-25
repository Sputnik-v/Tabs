import {getResource} from '../services/services.js'

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

export default cards;