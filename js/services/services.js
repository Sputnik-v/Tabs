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

const getResource = async (url) => {                                                 //Отправляем запрос на получение данных
    const res = await fetch(url);

    if (!res.ok) {                                                                   //Если статус не ок, выкидывем ошибку
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();                                                         //Иначе возвращаем данные в json формате
};

export {postData};
export {getResource};