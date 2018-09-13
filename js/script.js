/*IN PROGRESS!!!*/

/**
 Реализовать универсальный фильтр массива объектов

 Технические требования:
 - Написать функцию filterCollection(), которая позволит отфильтровать любой массив по заданным ключевым словам.
 - Функция должна принимать на вход три основных аргумента:
 - массив, который надо отфильтровать
 - строку с ключевыми словами, которые надо найти внутри массива (одно слово или несколько слов, разделеных пробелом)
 - boolean флаг, который будет говорить, надо ли найти все ключевые слова (true), либо же достаточно совпадения одного из них (false)
 - четвертый и последующие аргументы будут являться именами полей, внутри которых надо искать совпадение. Если поле находится не на первом уровне объекта, к нему надо указать полный путь через .. Уровень вложенности полей может быть любой.
 Пример вызова функции:
 filterCollection(vehicles, 'en_US Toyota', true, 'name', 'description', 'contentType.name', 'locales.name', 'locales.description')
 В данном примере будет отфильтрован массив vehicles, с помощью ключевых слов en_US и Toyota. true в третьем параметре означает, что для успешного включения записи в финальный результат должно быть совпадение по обоим ключевым словам. Последние несколько параметров содержат имена полей, внутри которых надо искать ключевые слова. Например contentType.name означает, что внутри каждого объекта vehicle может быть поле contentType, которое является объектом или массивом объектов, внутри которых может быть поле name. Именно в этом поле (а также в других указанных) необходимо искать сопадения с ключевыми словами.

 В примере выше - запись locales.name означает, что поле locales внутри объекта vehicle может быть как объектом, так и массивом. Если оно является массивом, это значит, что внутри массива находятся объекты, у каждого из которых может быть свойство name. Для успешной фильтрации достаточно нахождения ключевого слова хотя бы в одном из элементов массива.
 Разные ключевые слова могут находиться в разных свойствах объекта. Например, в примере выше, ключевое слово en_US может быть найдено в поле locales.name, в то время как ключевое слово Toyota может, например, находиться внутри свойства description. При этом такой объект должен быть найден.
 Поиск должен быть нечувствительным к регистру.
 Примечание:

 Реализацию данной задачи можно использовать в реальной жизни. Например, если на странице есть таблица с данными, а вверху есть строка поиска, данную функцию можно использовать для фильтра значений в таблице при вводе ключевых слов в строку поиска
 */

let testArr = [
    {
        name: "Dima",
        age: 33,
        position: "developer",
        gender: "male",
        lang: "ru"
    },

    {
        name: "Vita",
        lastName: "Vitova",
        age: 30,
        position: "manager",
        education: "high",
        gender: "female",
        lang: "en"
    },

    {
        name: "ira",
        lastName: "Eva",
        age: 20,
        position: "student",
        lang: "ru en",
        gender: "female"
    },

    "Sasha",

    {
        name: "Vova",
        age: 40,
        position: "Lawyer",
        gender: "male"
    },

    "Marina",

    "Ira",

    {
        name: "Misha",
        gender: "male"
    }
];

function filterCollection(array, keyWord, findAll) {

    let arr = [];

    if (typeof keyWord !== "string") {
        keyWord = String(keyWord);
    }

    keyWord = keyWord.trim();

    let arrKeyWord = keyWord.split(" ").map((item) => {
        return item.toLowerCase();
    });

    if (arguments.length === 3) {
        if (!findAll) {
            arr = array.filter((item) => {
                let result = null;
                if (typeof item === 'object') {
                    Object.keys(item).forEach((key) => {
                        if (arrKeyWord.indexOf(String(item[key]).toLowerCase()) !== -1) {
                            result = item;
                        }
                    })
                } else {
                    return result = arrKeyWord.indexOf(item.toLowerCase()) !== -1;
                }
                return result;
            })
        }
    } else if (arguments.length > 3) {

    } else {
        console.log("Error arguments!");
    }

    return arr;
}

function filteritems(array, keyWord, findAll) {

    let arr = [];

    if (typeof keyWord !== "string") {
        keyWord = String(keyWord);
    }

    keyWord = keyWord.trim();

    return array.filter(function (item) {
        return item.score > 40 && item.status && (item.populations.filter(function (population) {
            return population.population_name === 'Heart failure';
        })).length;
    });
}

let result = filterCollection(testArr, "  ira    ", false);

console.log(result);