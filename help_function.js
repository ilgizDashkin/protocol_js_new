const proizvoditel = ['Дашкин И.А.',
    'Габбасов А.Р.',
    'Фадеев И.Н.',
    'Карпов В.Г.',
    'Абдуллин Р.Р.'
]

/**
 * вставляет в div элемент 'proizv_weather' список производителей и погодные условия
 *
 * @param {[string]} proizvoditel массив производителей.
 */
function gen_proizv_weather(proizvoditel) {
    // находим элемент создаем и добавляем
    let proizv_weather = document.getElementById('proizv_weather')
    let p_name = document.createElement("p");
    p_name.className = "bg-dark"
    p_name.textContent = 'кто произвёл'
    proizv_weather.appendChild(p_name);

    let proizv = document.createElement("select");
    proizv.id = "proizv";
    proizv.className = "form-control bg-warning"
    proizv_weather.appendChild(proizv);

    proizvoditel.forEach(value => {
        let option = document.createElement("option");
        option.value = value;
        option.text = value;
        proizv.appendChild(option);
    })

    proizv.insertAdjacentHTML('afterend', `<br><p class='bg-dark'>температура</p>
<input id="temp" class='form-control' type="search" value="+1"><br>
<p class='bg-dark'>давление</p>
<input id="pres" class='form-control' type="search" value="750"><br>
<p class='bg-dark'>влажность</p>
<input id="vlag" class='form-control' type="search" value="70"><br>`)
}

// преобразует дату для протокола
function getDateNow(id_elemement) {
    let elem_out = document.getElementById(id_elemement)
    let todayDate = new Date();
    let currYear = todayDate.getFullYear();
    let currMonth = todayDate.getMonth() + 1;
    let currDay = todayDate.getDate();
    // document.write("Сегодняшняя дата: ");
    // console.log( typeof currDay)
    if (currMonth < 10) {
        currMonth = "0" + currMonth
    }
    if (currDay < 10) {
        currDay = "0" + currDay
    }
    elem_out.value = (currYear + "-" + currMonth + "-" + currDay)
}

/**
 * вставляет в div элемент html таблицу
 *
 * @param {[string]} row_name массив названия строк.
 * @param {[string]} col_massiv массив 'элементов'.
 * @param {[string]} col_name массив названия столбцов.
 */ 
function gen_tab(row_name = ["A", "B", "C"], col_massiv = ['type_opn', 'nomer_opn', 'year_opn'], col_name = ['фаза', 'тип', 'заводской номер', 'дата выпуска']) {
    let tab_cont = document.getElementById('tab_cont')
    let tbl = document.createElement("table");
// создаем название колонок
    col_name.forEach(value => {
        let col_n = document.createElement("th");
        col_n.innerHTML = value;
        tbl.appendChild(col_n);
    })
// создаем строки и столбцы таблицы
    row_name.forEach((value,index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = value;
        col_massiv.forEach(value => {
            let col = document.createElement("td");
            let inpt = document.createElement("input");
            inpt.id = value + (index+1)
            inpt.value = value + (index+1)
            col.appendChild(inpt)
            // col.innerHTML = value;
            tr.appendChild(col)
        })
        tbl.appendChild(tr);
    })

    tab_cont.appendChild(tbl)
    tbl.insertAdjacentHTML('afterend','<br>')
}

// случайные числа
function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  
 function matrix_from_table(row_name = ["A", "B", "C"], col_massiv = ['type_opn', 'nomer_opn', 'year_opn'], col_name = ['фаза', 'тип', 'заводской номер', 'дата выпуска']){

 }