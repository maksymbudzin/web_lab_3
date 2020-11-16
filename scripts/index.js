const gemstoneList = document.getElementById('gemstones-list');//
const searchBar = document.getElementById('find-gemstone');//
const clearButton = document.getElementById('clear-search-bar');//

const createGemstoneID = document.getElementById('create_id');
const createGemstoneName = document.getElementById('create_name');
const createGemstoneWeight = document.getElementById('create_weightInCarats');
const createGemstonePrice = document.getElementById('create_priceInUSD');
const buttonCreateGemstone = document.getElementById('create_gemstone_open_button');
const create_gemstone_section = document.getElementById('create_gemstone');
const close_cross = document.getElementById('cross');


let editActive = false;

let gemstones = [];

let currentGemstones = gemstones

searchBar.addEventListener('keyup', filterGemstones)

buttonCreateGemstone.addEventListener('click', () => {
    create_gemstone_section.classList.add('show');
})

close_cross.addEventListener('click', () => {
    create_gemstone_section.classList.remove('show');
})


function filterGemstones(searchString) {
    const searchFilterString = searchString.target.value.toLowerCase();
    const filteredGemstones = gemstones.filter(gemstone => {
        return gemstone.name.toLowerCase().includes(searchFilterString);
    });
    currentGemstones = filteredGemstones;
    sortedGemstones();
}

clearButton.addEventListener('click', () => {
    searchBar.value = '';
    currentGemstones = gemstones;
    sortedGemstones();
})

// Функція яка рахує ціну елементів
function calculatePrice() {
    var priceSum = 0;
    var totalPriceLabel = document.getElementById('total-price');
    currentGemstones.forEach(gemstone => priceSum += gemstone.price_in_usd_dollars);
    totalPriceLabel.textContent = 'Total price: ' + priceSum + '$';
}

// Сортування елементів по вазі
function sortedGemstones() {
    var sortType = document.getElementById('sort-select').value;
    if (sortType == 'none') {
        displayGemstones(currentGemstones);
        return;
    } else if (sortType == 'weight') {
        currentGemstones.sort(compareByWeight);
    }
    displayGemstones(currentGemstones);
}


function compareByWeight(firstGemstone, secondGemstone) {
    return firstGemstone.weight_in_carats - secondGemstone.weight_in_carats;
}


// Функія яка показує елементи
const displayGemstones = (gemstonesToShow) => {
    const htmlString = gemstonesToShow.map((gemstone) => {
        return `
        <li class="gemstone">
            <div>            
                <h2 class="gem_id">${gemstone.id}</h2>
                <h2>${gemstone.name}</h2>
                <h3 class="weightInCarats">${gemstone.weight_in_carats}</h3>
                <h3 class="priceInUSD">${gemstone.price_in_usd_dollars}</h3>
            </div>
            <form class="form__edit_gemstone" id="form__edit_gemstone">
                    <input id="edit_name" name="name" type="text" placeholder="Name">
                    <input id="edit_weightInCarats" name="weightInCarats" type="number" step=0.1 placeholder="Weight">
                    <input id="edit_priceInUSD" name="priceInUSD" type="number" step=100 placeholder="Price">
            </form>
            <div class= "control-buttons">
                <button class="edit-button" id="edit-button" onclick="editItem(this)">Edit</button>
                <button class="delete-button" id="delete-button" onclick="deleteItem(this)">Delete</button>
            </div>
        </li>
        `
    }).join('');

    //дозволяє отримати вміст елемента у вигляді строки
    gemstoneList.innerHTML = htmlString;
}

function deleteItem(item) {
    const list_to_delete = item.parentNode.parentNode;
    let gemstoneId = parseInt(list_to_delete.childNodes[1].childNodes[1].innerHTML);
    let indexToDeleteFromAll = gemstones.findIndex(obj => obj.id == gemstoneId);
    gemstones.splice(indexToDeleteFromAll, 1);
    let indexToDeleteFromCurrent = currentGemstones.findIndex(obj => obj.id == gemstoneId);
    if (indexToDeleteFromCurrent != -1) {
        currentGemstones.splice(indexToDeleteFromCurrent, 1);
    }
    deleteGem(gemstoneId);
    sortedGemstones();
    return list_to_delete;
}

function editItem(item) {
    const nodeList = item.parentNode.parentNode.childNodes;
    const editBar = nodeList[3];
    const infoBar = nodeList[1];
    let gemstoneId = parseInt(infoBar.childNodes[1].innerHTML);
    let gemstoneName = infoBar.childNodes[3].innerHTML;
    let gemstoneWeight = parseFloat(infoBar.childNodes[5].innerHTML);
    let gemstonePrice = parseFloat(infoBar.childNodes[7].innerHTML);
    const editedGemstoneName = nodeList[3][0];
    const editedGemstoneWeight = nodeList[3][1];
    const editedGemstonePrice = nodeList[3][2];

    let indexToEdit = gemstones.findIndex(obj => obj.id == gemstoneId);
    if (editActive == false) {
        openEditBar(editBar, infoBar);
        editActive = true;
    } else if (editActive == true) {
        closeEditBar(editBar, infoBar);
        if (checkWeightAndPrice(editedGemstoneWeight.value, editedGemstonePrice.value) == false) {
            editedGemstoneWeight.value = '';
            editedGemstonePrice.value = '';
            editActive = false;
            return;
        }
        let finalName = gemstoneName;
        let finalWeight = gemstoneWeight;
        let finalPrice = gemstonePrice;
        if (editedGemstoneName.value == "" && editedGemstoneWeight.value == "" && editedGemstonePrice.value == "") {
            editActive = false;
            sortedGemstones();
            return
        }
        if (editedGemstoneName.value != "") {
            gemstones[indexToEdit]["name"] = editedGemstoneName.value;
            finalName = editedGemstoneName.value;
        } else {
            gemstones[indexToEdit]["name"] = gemstoneName;
        }
        if (editedGemstoneWeight.value != "") {
            gemstones[indexToEdit]["weight_in_carats"] = parseFloat(editedGemstoneWeight.value);
            finalWeight = parseFloat(editedGemstoneWeight.value);
        } else {
            gemstones[indexToEdit]["weight_in_carats"] = gemstoneWeight;
        }
        if (editedGemstonePrice.value != "") {
            gemstones[indexToEdit]["price_in_usd_dollars"] = parseFloat(editedGemstonePrice.value);
            finalPrice = parseFloat(editedGemstonePrice.value);
        } else {
            gemstones[indexToEdit]["price_in_usd_dollars"] = gemstonePrice;
        }

        if (searchBar.value != '' && editedGemstoneName.value != '' && editedGemstoneName.value.includes(searchBar.value) == false) {
            let indexToDeleteFromCurrent = currentGemstones.findIndex(obj => obj.id == gemstoneId);
            currentGemstones.splice(indexToDeleteFromCurrent, 1);
        }

        const jsonGemstone = createJSON(finalName, finalWeight, finalPrice)
        editGem(gemstoneId, jsonGemstone)
        editActive = false;
        sortedGemstones();
    }
}

function openEditBar(editBar, infoBar) {
    editBar.classList.add('open');
    editBar.classList.remove('hide');
    infoBar.classList.add('hide');
    infoBar.classList.remove('open');
}

function closeEditBar(editBar, infoBar) {
    editBar.classList.add('hide');
    editBar.classList.remove('open');
    infoBar.classList.add('open');
    infoBar.classList.remove('hide');
}




function checkWeightAndPrice(weight, price) {
    if (parseFloat(weight) <= 0) {
        alert('weight cannot be less then zero');
        return false;
    }
    if (parseFloat(price) <= 0) {
        alert('price cannot be less then zero');
        return false;
    }
    return true;
}

function checkFormRequirements(name, weight, price) {
    if (name == '') {
        alert('name field is requiered')
        return false;
    }
    if (weight == '') {
        alert('weight field is requiered');
        return false;
    }
    if (price == 0) {
        alert('price  field is requiered');
        return false;
    }
    return true;
}