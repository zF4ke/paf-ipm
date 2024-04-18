// save recipe to localStorage favorites
const saveButton = document.querySelector('#save-button');
const cartButton = document.querySelector('#cart-button');

saveButton.addEventListener('click', toggleSaveButton);
cartButton.addEventListener('click', addToCart);

// on page load check if recipe is saved and change button color
document.addEventListener('DOMContentLoaded', function() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeName = document.getElementById('recipe-name').textContent.replace(/\n/g, '').trim();
    const recipeIndex = recipes.findIndex(recipe => recipe.name === recipeName);
    const svg = saveButton.getElementsByTagName('svg')[0];

    if (recipeIndex !== -1) {
        svg.style.fill = 'white';
    }
});

function toggleSaveButton() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeName = document.getElementById('recipe-name').textContent.replace(/\n/g, '').trim();
    const recipeIndex = recipes.findIndex(recipe => recipe.name === recipeName);
    const svg = saveButton.getElementsByTagName('svg')[0];

    console.log(recipeIndex);

    if (recipeIndex !== -1) {
        svg.style.fill = 'none';
        unsaveRecipe(recipeName);
    } else {
        svg.style.fill = 'white';
        createRecipe();
    }

    // print favourites recipes
    const favourites = JSON.parse(localStorage.getItem('recipes')) || [];
    console.log(favourites);
}

function createRecipe() {
    let url = window.location.href;
    // get everything after recipe/
    url = url.substring(url.lastIndexOf('recipe/') + 7);
    console.log(url);

    let recipe = {
        // get div content without line breaks
        name: document.querySelector('#recipe-name').textContent.replace(/\n/g, '').trim(),
        image: document.querySelector('#recipe-image').src,
        timePortions: document.querySelector('#recipe-time-portions').textContent.replace(/\n/g, '').trim(),
        description: document.querySelector('#recipe-description').textContent.replace(/\n/g, '').trim(),
        url: url.trim()
    };

    saveRecipe(recipe);
}

function saveRecipe(recipe) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function unsaveRecipe(recipeName) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes = recipes.filter(recipe => recipe.name !== recipeName);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let item = {
        name: document.querySelector('#recipe-name').textContent.replace(/\n/g, '').trim(),
        ingredients: [
            {
                name: "Cenoura",
                quantity: "3",
                price: "€ 0.20"
            },
            {
                name: "Ovos",
                quantity: "4",
                price: "€ 0.10"
            },
            {
                name: "Açúcar",
                quantity: "1",
                price: "€ 0.50"
            },
            {
                name: "Farinha",
                quantity: "1",
                price: "€ 0.40"
            },
            {
                name: "Fermento",
                quantity: "1",
                price: "€ 1.20"
            },
            {
                name: "Óleo",
                quantity: "1",
                price: "€ 0.60"
            },
            {
                name: "Chocolate",
                quantity: "1",
                price: "€ 1.30"
            }
        ]
    };

    if (!cart.find(cartItem => cartItem.name === item.name))
        cart.push(item);

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(cart);

    window.location.href = '../../cart/index.html';
}