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