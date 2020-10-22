import {
    addStone,
    Stone
} from './stone.js';

const sortButton = document.getElementById('sort-button');
const priceButton = document.getElementById('price-button');
const addToolButton = document.getElementById('add-item-button');
const searchButton = document.getElementById('search-button');
const itemsContainer = document.getElementById('main__container');
const itemsList = [];
var counter = 0;

sortButton.addEventListener('click', (event) => {
    event.preventDefault();
    sortButton.classList.toggle('active');
    document.getElementById('sort-button-inner').classList.toggle('active');
    itemsList.sort((a, b) =>
        b.price - a.price
    );
    updateDOM(itemsList);
});

priceButton.addEventListener('click', (event) => {
    event.preventDefault();
    var totalPrice = itemsList.reduce((counter, item) => (counter += item.price), 0);
    document.getElementById('total-expenses').innerText = totalPrice + '$';
});

addToolButton.addEventListener('click', (event) => {
    event.preventDefault();
    var id = counter;
    counter += 1;
    var name = `Emerald ${id}`;
    var carat_number = '12 carat';
    var price = Math.floor(Math.random() * 1000);
    var item = new Stone(id, name, carat_number, price);
    itemsList.push(item);
    addStone({
        id,
        name,
        carat_number,
        price
    });
    sortButton.classList.remove('active');
    document.getElementById('sort-button-inner').classList.remove('active');
});

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    var text = document.getElementById("search-text").value;
    var pattern = new RegExp(text);
    var filteredItems = itemsList.filter(item => pattern.test(item.name) || pattern.test(item.text));
    updateDOM(filteredItems);
});


function updateDOM(givenList) {
    var elements = itemsContainer.querySelectorAll('.main__item');
    for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
    for (var i = 0; i < givenList.length; i++) {
        var id = givenList.id;
        var name = givenList[i].name;
        var carat_number = givenList[i].carat_number;
        var price = givenList[i].price;
        addStone({
            id,
            name,
            carat_number,
            price
        });
    }
};