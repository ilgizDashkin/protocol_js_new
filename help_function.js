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

/**
 * создает и вставляет элемент select список 
 *
 * @param {string} where_id id элемента после которого создается список
 * @param {string} elem_id id создаваемого элемента 
 * @param {string} name_el название списка
 * @param {[string]} list элементы списка 
 */
function select_generation(where_id = 'copy_pasteR', elem_id = "copy_selectR", name_el = 'выбор',
    list = ['R_AB',
        'R_BC',
        'R_AC',
        // 'K_AB',
        // 'K_BC',
        // 'K_AC'
    ]) {

    // находим элемент создаем и добавляем
    let el_created = document.getElementById(where_id)
    let p_name = document.createElement("p");
    p_name.className = "bg-dark"
    p_name.textContent = name_el
    el_created.appendChild(p_name);

    let proizv = document.createElement("select");
    proizv.id = elem_id;
    proizv.className = "form-control bg-warning"
    el_created.appendChild(proizv);

    list.forEach(value => {
        let option = document.createElement("option");
        option.value = value;
        option.text = value;
        proizv.appendChild(option);
    })
}

/**
 * преобразует сегодняшнюю дату и вставляет в элемент 
 * 
 * @param {string} id_elemement id элемента 
 */
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
    row_name.forEach((value, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = value;
        col_massiv.forEach(value => {
            let col = document.createElement("td");
            let inpt = document.createElement("input");
            inpt.id = value + (index + 1)
            inpt.value = value + (index + 1)
            col.appendChild(inpt)
            // col.innerHTML = value;
            tr.appendChild(col)
        })
        tbl.appendChild(tr);
    })

    tab_cont.appendChild(tbl)
    tbl.insertAdjacentHTML('afterend', '<br>')
}

// случайные числа
function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

/**
 * из html таблицы создает 2-х мерный массив
 *  
 * @param {[string]} row_name массив названия строк.
 * @param {[string]} col_massiv массив id элементов колонок которые перебираются 
 * @param {[string]} col_name массив названия столбцов.
 * @return {[string]} tab_arr 2-х мерный массив
 */
function matrix_from_table(row_name = ["A", "B", "C"], col_massiv = ['type_opn', 'nomer_opn', 'year_opn'], col_name = ['фаза', 'тип', 'заводской номер', 'дата выпуска']) {
    const tab_arr = []
    row_name.forEach((row, index) => {
        col_arr = []
        col_massiv.forEach((value) => {
            let tab_content = document.getElementById(`${value + (index + 1)}`)
            col_arr.push(tab_content.value)
        })
        tab_arr.push(col_arr)
    })
    tab_arr.forEach((value, index) => {
        value.unshift(row_name[index])
    })
    tab_arr.unshift(col_name)
    console.log(tab_arr)
    return tab_arr
}

// заголовок документа
function doc_head(doc, paragraph0, num) {
    // чтоб вставить картинку ее надо перевести в басе64 формат +размер 620х140
    doc.createImage(pic, 600, 140)

    const table = doc.createTable(1, 2);
    table.getCell(0, 0).addContent(new Paragraph('Свидетельство о регистрации электролаборатории №045-2018 от «22» июня 2018года.'))
    table.getCell(0, 0).addContent(new Paragraph("Срок действия Свидетельства установлен"))
    table.getCell(0, 0).addContent(new Paragraph("до «22» июня 2021 года."))
    table.getCell(0, 1).addContent(new Paragraph('1.Перепечатка, размножение протокола без разрешения ЭЛ (или Заказчика) запрещена.'))
    table.getCell(0, 1).addContent(new Paragraph('2.Протокол испытаний распространяется только на данную электроустановку.'))
    table.getCell(0, 1).addContent(new Paragraph('3.Исправления, дополнения в протоколе не допускаются.'))
    table.getCell(0, 1).addContent(new Paragraph('4.Копии протоколов хранятся в ЭЛ.'))

    doc.addParagraph(paragraph0);
    const paragraph = new Paragraph();
    const institutionText = new TextRun(`                                 ПРОТОКОЛ № ${num}`).bold().size(35);
    paragraph.addRun(institutionText);
    doc.addParagraph(paragraph);
    doc.addParagraph(paragraph0);
}

/**
 * вставляет в документ ворд параграф
 *
 * @param {doc} doc документ обьект
 * @param {number} space пробелы до текста
 * @param {string} text сам текст
 * @param {string} text_underline текст под линией
 * @param {number} space_after пробелы после текста
 * @param {number} size_text размер шрифта
 */
function create_pargf(doc, space = 0, text = "", text_underline = ``, space_after = 0, size_text = 18) {
    const paragraph5 = new Paragraph();
    let space_add = ''
    i = 0
    while (i < space) {
        space_add += ' '
        i++;
    }
    let space_after_add = ''
    j = 0
    while (j < space_after) {
        space_after_add += ' '
        j++;
    }
    const institutionText5 = new TextRun(space_add + text + space_after_add)
    const institutionText51 = new TextRun(text_underline).size(size_text).underline();
    paragraph5.addRun(institutionText5);
    paragraph5.addRun(institutionText51);
    doc.addParagraph(paragraph5);

}

/**
 * вставляет в документ ворд таблицу из матрицы(массива)
 *
 * @param {doc} doc документ обьект
 * @param {string} matrix массив двухмерный, элементы станут таблицей
 */
function table_from_matrix(doc, matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]) {
    const table = doc.createTable(matrix.length, matrix[0].length);

    matrix.forEach((value, index_row) => {
        value.forEach((val_row, index_col) => {
            table.getCell(index_row, index_col).addContent(new Paragraph(val_row));
        })

    })


}

// создает колонтитул
function doc_footer(doc, num, all_page = '2') {
    let page_of_doc = new TextRun(`                     ${all_page}`)

    const doc1 = new Document();
    const table3 = doc1.createTable(2, 4);
    table3.getCell(0, 0).addContent(new Paragraph(' Свидетельство о регистрации .'))
    table3.getCell(0, 1).addContent(new Paragraph('  Номер протокола .'))
    table3.getCell(0, 2).addContent(new Paragraph('   Страница протокола .'))
    table3.getCell(0, 3).addContent(new Paragraph(' Всего страниц в протоколе .'))

    table3.getCell(1, 0).addContent(new Paragraph('         ЭЛ №045-2018  '))
    table3.getCell(1, 1).addContent(new Paragraph(`         ${num}     `))
    table3.getCell(1, 2).addContent(new Paragraph(new TextRun("                 ").pageNumber()))
    table3.getCell(1, 3).addContent(new Paragraph(page_of_doc))

    doc.Footer.createParagraph(table3)
}

// скрыть элемент
function element_hidden(elem_id) {
    element = document.getElementById(elem_id)
    element.hidden === false ? element.hidden = true : element.hidden = false;
}


function read_to_array(id='R_AB',num=19){
    const val_array=[]
    for (let i = 1; i <= num; i++){
        let r = document.getElementById(id+i).value
        val_array.push(r)
    }
    console.log(`read arr ${val_array}`)
    return val_array
}

function sel_val(id='copy_selectR') {
    let selind = document.getElementById(id).options.selectedIndex;
    let val_el = document.getElementById(id).options[selind].value;
    return val_el
}

function to_textarea(id_area,sel_id,num){
    let id_el=sel_val(sel_id).toString()
    const arr=read_to_array(id=id_el,num=num)
    let text=''
    arr.forEach(val=>{
text+=val.toString()+'\n'
    })
    document.getElementById(id_area).value=text
}

function view_percent(id1, id2, id3, id4) {
    let a = document.getElementById(id1).value
    let b = document.getElementById(id2).value
    let c = document.getElementById(id3).value
    let d = document.getElementById(id4)
    if (a && b && c) {
        return d.value = percent(a, b, c)
    }
    else {
        d.value = '0'
    }
}

function view_percent_all(el='R',num=19){
    for (let i = 1; i <= num; i++){
       let id1=el+'_AB'+i
       let id2=el+'_BC'+i
       let id3=el+'_AC'+i
       let id4=el+'_PR'+i
        view_percent(id1, id2, id3, id4)
    }
}

function textarea_to_element(id_area,sel_id,elem){
    let textarea = document.getElementById(id_area).value
    const arr=textarea.split('\n')
    console.log(`textarea_to_el ${arr}`)
    let id_el=sel_val(sel_id).toString()
    arr.forEach((val,index)=>{
        if ((document.getElementById(id_el+(index+1)))&&(val)){
            document.getElementById(id_el+(index+1)).value=val
        }else{console.log(`no element by id`)}    
    })
    view_percent_all(el=elem,num=19)
}

