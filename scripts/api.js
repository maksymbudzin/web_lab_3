const GEMSTONE_URL = 'http://localhost:3000/gemstones';

function fetchData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let i;
            for (i = 0; i < data.length; i++) {
                gemstones.push(data[i]);
            }
            displayGemstones(gemstones);
        });
}


async function create() {
    if (validateFormRequirements(createGemstoneName.value, createGemstoneWeight.value, createGemstonePrice.value) == false) {
        return;
    }
    if (validateWeightAndPrice(createGemstoneWeight.value, createGemstonePrice.value) == false) {
        return;
    }
    const jsonGemstone = createJSON(createGemstoneName.value, createGemstoneWeight.value, createGemstonePrice.value);
    await post(jsonGemstone);
    visualiseSortedGemstones();
    return jsonGemstone;
}

async function post(newGemstone) {
    let response = await fetch(GEMSTONE_URL, {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newGemstone)
    }).then(response => response.json())
        .then(data => gemstones.push(data))
    return response;
}

async function deleteGem(id) {
    let response = await fetch(GEMSTONE_URL + '/' + id, {
        method: 'DELETE',

    })
    return response;
}

async function editGem(id, editedGemstone) {
    fetch(GEMSTONE_URL + '/' + id, {
        method: 'PUT',

        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(editedGemstone)
    })
}

function createJSON(name, weight, price) {
    let createdGemstone = {
        "name": name,
        "weight_in_carats": parseFloat(weight),
        "price_in_usd_dollars": parseFloat(price)
    }
    return createdGemstone;
}

fetchData(GEMSTONE_URL);

