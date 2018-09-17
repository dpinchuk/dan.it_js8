/*IN PROGRESS!!!*/

/**
 Реализовать универсальный фильтр массива объектов

 Технические требования:
 - Написать функцию filterCollection(), которая позволит отфильтровать любой массив по заданным ключевым словам.
 - Функция должна принимать на вход три основных аргумента:
 - массив, который надо отфильтровать
 - строку с ключевыми словами, которые надо найти внутри массива (одно слово или несколько слов, разделеных пробелом)
 - boolean флаг, который будет говорить, надо ли найти все ключевые слова (true), либо же достаточно совпадения одного
 из них (false)
 - четвертый и последующие аргументы будут являться именами полей, внутри которых надо искать совпадение.
 Если поле находится не на первом уровне объекта, к нему надо указать полный путь через ..
 Уровень вложенности полей может быть любой.

 Пример вызова функции:
 filterCollection(vehicles, 'en_US Toyota', true, 'name', 'description', 'contentType.name', 'locales.name',
 'locales.description')
 В данном примере будет отфильтрован массив vehicles, с помощью ключевых слов en_US и Toyota. true в третьем параметре
 означает, что для успешного включения записи в финальный результат должно быть совпадение по обоим ключевым словам.
 Последние несколько параметров содержат имена полей, внутри которых надо искать ключевые слова. Например contentType.name
 означает, что внутри каждого объекта vehicle может быть поле contentType, которое является объектом или массивом объектов,
 внутри которых может быть поле name. Именно в этом поле (а также в других указанных) необходимо искать сопадения с
 ключевыми словами.

 В примере выше - запись locales.name означает, что поле locales внутри объекта vehicle может быть как объектом, так
 и массивом. Если оно является массивом, это значит, что внутри массива находятся объекты, у каждого из которых может
 быть свойство name. Для успешной фильтрации достаточно нахождения ключевого слова хотя бы в одном из элементов массива.
 Разные ключевые слова могут находиться в разных свойствах объекта. Например, в примере выше, ключевое слово en_US может
 быть найдено в поле locales.name, в то время как ключевое слово Toyota может, например, находиться внутри свойства
 description. При этом такой объект должен быть найден.
 Поиск должен быть нечувствительным к регистру.

 Примечание:

 Реализацию данной задачи можно использовать в реальной жизни. Например, если на странице есть таблица с данными,
 а вверху есть строка поиска, данную функцию можно использовать для фильтра значений в таблице при вводе ключевых слов
 в строку поиска
 */

const PARAM_LIMIT = 3;

let vehicles =
    [
        {
            name: "Toyota",
            description: "Camry 2018",
            contentType:
                {
                    name: "Left side",
                    description: "Auto gear"
                },
            locales:
                {
                    name: "en_EN",
                    description: "Europe, America, BMW, Colt"
                }
        },

        {
            name: "Toyota",
            description: "Land Cruiser 2018",
            contentType:
                {
                    name: "Left Right side",
                    description: "Auto gear"
                },
            locales:
                {
                    name: "en_EN",
                    description: "Europe, Asia"
                }
        },

        {
            name: "BMW",
            description: "X5 2018",
            contentType:
                {
                    name: "Left side",
                    description: "Auto gear"
                },
            locales:
                {
                    name: "en_US",
                    description: "North America Colt"
                }
        },

        {
            name: "Mitsubishi",
            description: "Colt 2018",
            contentType:
                {
                    name: "Left side",
                    description: "Robo gear"
                },
            locales:
                {
                    name: "en_EN ru_RU",
                    description: "Europe, Asia"
                }
        },

        {
            name: "Mitsubishi",
            description: "Colt 2007",
            contentType:
                {
                    name: "Left side",
                    description: "Robo gear"
                },
            locales:
                {
                    name: "en_EN ru_RU",
                    description: "Europe, Asia"
                }
        },
        "Colt 2008, 1.3 Robot bmw toyota"
    ];

let convertToString = (obj) => {
    return JSON.stringify(obj).toLowerCase();
};

function filterCollection(array, keyWord, findAll) {
    if (typeof keyWord !== "string") {
        keyWord = String(keyWord);
    }

    keyWord = keyWord.trim();

    let arrParams = [];

    let arrKeyWord = keyWord.split(" ").filter((item) => {
        return item !== "";
    });

    arrKeyWord = arrKeyWord.map((item) => {
        return item.toLowerCase();
    });

    let arr = [];

    if (arguments.length === PARAM_LIMIT) {
        if (findAll) {
            arr = array.filter((item) => {
                if (typeof item === 'object') {
                    let str = convertToString(item);
                    return arrKeyWord.every((e) => {
                        return str.includes(e);
                    })
                } else {

                    return arrKeyWord.every((e) => {
                        return item.toLowerCase().includes(e);
                    });
                }
            });
        } else {
            arr = array.filter((item) => {
                if (typeof item === 'object') {
                    let str = convertToString(item);
                    return arrKeyWord.some((e) => {
                        return str.includes(e);
                    })
                } else {

                    return arrKeyWord.some((e) => {
                        return item.toLowerCase().includes(e);
                    });
                }
            });

        }
    } else if (arguments.length > PARAM_LIMIT) {
        for (let i = PARAM_LIMIT; i < arguments.length; i++) {
            arrParams.push(arguments[i]);
        }

        if (findAll) {
            arr = array.forEach((item) => {
                if (typeof item === 'object') {
                    for (let i = 0; i < arrParams.length; i++) {
                        let arrStr = arrParams[i].split(".");
                    }

                    console.log(Object.keys((item)));
                    console.log(item['contentType']['name']);
                    }
                })
        } else {
        }
    } else {
        console.log("Error parameters!");
    }
    return arr;
}

console.log(filterCollection(vehicles, "  Colt   bmw toyota ", true, 'contentType.name', 'locales.name'));