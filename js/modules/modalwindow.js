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

export default modalWindow;
export {closeModal};
export {modalOpen};