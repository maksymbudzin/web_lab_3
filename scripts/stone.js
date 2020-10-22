export class Stone {
    constructor(id, name, carat_number, price) {
        this.id = id;
        this.name = name;
        this.carat_number = carat_number;
        this.price = price;
    }
}

const stoneTemplate = ({
                          id,
                          name,
                          carat_number,
                          price
                      }) => `<div class="main__item" id="${id}">
            <span class="main__item-header">${name}</span>
            <div class="main__item-text">${carat_number}</div>
            <div class="main__item-footer">
                <div class="main__item-price">
                    <h4>Price:</h4>
                    <h4>${price}$</h4>
                </div>
                <div class="main__item-buttons-container">
                    <button class="main__item-button-edit">Edit</button>
                    <button class="main__item-button-remove">Remove</button>
                </div>
            </div>
        </div>`;

export const addStone = ({
                            id,
                            name,
                            carat_number,
                            price
                        }) => {
    var stoneContainer = document.getElementById('main__container');
    stoneContainer.insertAdjacentHTML('beforeend', stoneTemplate({
        id,
        name,
        carat_number,
        price
    }));
};