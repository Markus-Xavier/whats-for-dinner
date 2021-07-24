var mealOptionForm = document.getElementById('meal-option-form');
var radioButtons = document.getElementsByName('options');
var cookPotImg = document.getElementById('cook-pot');
var recipeText = document.getElementById('recipe-text-location');
var shouldMakeText = document.getElementById('should-make-text');
var letsCookBtn = document.getElementById('lets-cook-btn');
var clearBtn = document.getElementById('clear-btn');
var addARecipe = document.getElementById('add-a-recipe');
var footer = document.querySelector('footer');
var customRecipeForm = document.getElementById('custom-recipe-form');
var recipeTypeInput = document.getElementById('recipe-type-input');
var recipeNameInput = document.getElementById('recipe-name-input');
var saveRecipeButton = document.getElementById('save-recipe-button');

//RADIO BUTTONS
var sideRadioBtn = document.getElementById('side');
var mainDishRadioBtn = document.getElementById('main-dish');
var dessertRadioBtn = document.getElementById('dessert');
var entireMealRadioBtn = document.getElementById('entire-meal');

mealOptionForm.addEventListener('submit', checkRadioButtons);
clearBtn.addEventListener('click', clearSelection);
addARecipe.addEventListener('click', toggleRecipeForm);
customRecipeForm.addEventListener('submit', customRecipeHandler);
saveRecipeButton.addEventListener('click', saveRecipeHandler);

var activeButton;
var currentRecipe;
var savedRecipes = {
        sides: [],
        main: [],
        dessert: [],
        entireMeal: []
    };

function disableElement(element){
    element.disabled = true;
}

function enableElement(element){
    element.disabled = false;
}

function getRandomIndex(array){
    return Math.floor(Math.random() * array.length);
}

function hideElement(element){
    element.hidden = true;
}

function showElement(element){
    element.hidden = false;
}

function getRandomRecipe(){
    var randomSide = side[getRandomIndex(side)];
    var randomMainDish = mainDish[getRandomIndex(mainDish)];
    var randomDessert = dessert[getRandomIndex(dessert)];
    return {
        side: randomSide,
        main: randomMainDish,
        dessert: randomDessert
    }
}

function destroyRecipeText(){
    recipeText.removeChild(recipeText.firstChild)
}

function toggleRecipeForm(){
    footer.classList.toggle('hidden');
}

function clearSelection(){
    destroyRecipeText();
    hideElement(shouldMakeText);
    hideElement(clearBtn);
    hideElement(saveRecipeButton);
    showElement(cookPotImg);
    activeButton.checked = false;
}

function generateRecipeText(recipeType, opt_customRecipeText='', opt_customRecipe=false){
    if(recipeText.firstChild){
        destroyRecipeText();
    }

    if(recipeType === 'main dish'){
        recipeType = 'main';
    }
    hideElement(cookPotImg);
    showElement(shouldMakeText);
    showElement(clearBtn);
    showElement(saveRecipeButton);

    var randomizedRecipe = getRandomRecipe();
    var newDiv = document.createElement('div');
    if(opt_customRecipe){
        newDiv.innerText = opt_customRecipeText;
        randomizedRecipe[recipeType] = opt_customRecipeText;
    } else if (recipeType === 'entire meal'){
        newDiv.innerText = `${randomizedRecipe.main} with a side of ${randomizedRecipe.side} and ${randomizedRecipe.dessert} for dessert!`; 
    } else {
        newDiv.innerText = randomizedRecipe[recipeType] + '!';
    }
    currentRecipe = randomizedRecipe;
    recipeText.appendChild(newDiv);
    console.log(currentRecipe);
}

function customRecipeHandler(event){
    event.preventDefault();
    var recipeType = recipeTypeInput.value.toUpperCase();
    if(recipeType === 'SIDE'){
        side.push(recipeNameInput.value);
        activeButton = sideRadioBtn;
        sideRadioBtn.checked = true;
    } else if (recipeType === 'MAIN DISH'){
        mainDish.push(recipeNameInput.value);
        activeButton = mainDishRadioBtn;
        mainDishRadioBtn.checked = true;
    } else if (recipeType === 'DESSERT'){
        dessert.push(recipeNameInput.value);
        activeButton = dessertRadioBtn;
        dessertRadioBtn.checked = true;
    } else {
        alert('Use the right things');
        return;
    }
    generateRecipeText(recipeTypeInput.value.toLowerCase(), recipeNameInput.value, true);
    customRecipeForm.reset();
}

function checkRadioButtons(event){
    event.preventDefault();
    if(activeButton === entireMealRadioBtn){
        recipeText.classList.remove('meal-text');
        recipeText.classList.add('recipe-text');
    }
    if(sideRadioBtn.checked){
        generateRecipeText('side');
        activeButton = sideRadioBtn;
    } else if(mainDishRadioBtn.checked){
        generateRecipeText('main');
        activeButton = mainDishRadioBtn;
    } else if(dessertRadioBtn.checked){
        generateRecipeText('dessert');
        activeButton = dessertRadioBtn;
    } else if(entireMealRadioBtn.checked){
        generateRecipeText('entire meal');
        recipeText.classList.remove('recipe-text');
        recipeText.classList.add('meal-text');
        activeButton = entireMealRadioBtn;
    }
}

function saveRecipeHandler() {
    switch (activeButton.id) {
        case 'entire-meal':
            savedRecipes.entireMeal.push(currentRecipe);
            break;
        
        case 'side':
            savedRecipes.sides.push(currentRecipe.side);
            break;
    
        case 'main-dish':
            savedRecipes.main.push(currentRecipe.main);
            break;

        case 'dessert':
            savedRecipes.dessert.push(currentRecipe.dessert);
            break;

        default:
            break;
    }
    console.log(savedRecipes);
}