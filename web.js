let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let dicount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;


// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +dicount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}
// create product
let dataPro;
if (localStorage.Product != null) {
    dataPro = JSON.parse(localStorage.Product);
} else {
    dataPro = [];
}
submit.onclick = function () {
    let Dataobj = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        dicount: dicount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }


        if (mood == 'create') {
            if (Dataobj.count > 1) {
                for (let i = 0; i < Dataobj.count; i++) {
                    dataPro.push(Dataobj);
                }
            } else {
                dataPro.push(Dataobj);
            }
        } else {
            dataPro[tmp] = Dataobj;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
    }
    
    // save localstorage
    localStorage.setItem('Product', JSON.stringify(dataPro));
    console.log(dataPro);
    DataClear();
    ShowData();
}

// clear inputs
function DataClear() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    dicount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read
function ShowData() {

    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].dicount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="UpdateData(${i})" id="update">update</button></td>
            <td><button onclick="DeleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('table').innerHTML = table;
    let btndelete = document.getElementById('deleteall');
    // count
    if (dataPro.length > 0) {
        btndelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
    } else {
        btndelete.innerHTML = '';
    }
}
ShowData();

// delete
function DeleteData(i) {
    dataPro.splice(i, 1);
    localStorage.Product = JSON.stringify(dataPro);
    ShowData();
}
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    ShowData();
}
// update
function UpdateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    dicount.value = dataPro[i].dicount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}
// search
let searchMood = 'title';

function getsearchMood(id) {
    
    let search = document.getElementById("search");
    if (id == 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus()
    search.value = '';
    ShowData();
}

function searchData(value) {

    let table = '';
    if (searchMood == 'title')
    {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].dicount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="UpdateData(${i})" id="update">update</button></td>
            <td><button onclick="DeleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].dicount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="UpdateData(${i})" id="update">update</button></td>
            <td><button onclick="DeleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
            }
        }
    }
    document.getElementById('table').innerHTML = table;

}

// clean data
