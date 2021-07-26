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
var logInForm = document.getElementById('log-in-form');
var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');
var signInPage = document.getElementById('sign-in-page');
var mainPage = document.getElementById('main-page');
var currentUserText = document.getElementById('current-user');

var storageHandler = new StorageHandler();

var optionsEnum = {
    DESSERT: 'dessert',
    ENTIRE_MEAL: 'entire-meal',
    MAIN_DISH: 'main-dish',
    SIDE: 'side'
};

//RADIO BUTTONS
var sideRadioBtn = document.getElementById(optionsEnum.SIDE);
var mainDishRadioBtn = document.getElementById(optionsEnum.MAIN_DISH);
var dessertRadioBtn = document.getElementById(optionsEnum.DESSERT);
var entireMealRadioBtn = document.getElementById(optionsEnum.ENTIRE_MEAL);

mealOptionForm.addEventListener('submit', checkRadioButtons);
clearBtn.addEventListener('click', clearSelection);
addARecipe.addEventListener('click', toggleRecipeForm);
customRecipeForm.addEventListener('submit', customRecipeHandler);
saveRecipeButton.addEventListener('click', saveRecipeHandler);
logInForm.addEventListener('submit', logInHandler);
window.addEventListener('load', function(){
    storageHandler.initializeStorage('dinnerUsers', JSON.stringify([]));
    storageHandler.initializeStorage('dinnerActiveUser', '');
});

var currentUser;
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

function getRandomRecipe(recipeType){
    var food = {
        side: '',
        mainDish: '',
        dessert: ''
    };

    switch (recipeType) {
        case optionsEnum.SIDE:
            food.side = side[getRandomIndex(side)];
            break;

        case optionsEnum.MAIN_DISH:
            food.mainDish = mainDish[getRandomIndex(mainDish)];
            break;

        case optionsEnum.DESSERT:
            food.dessert = dessert[getRandomIndex(dessert)];
            break;

        case optionsEnum.ENTIRE_MEAL:
            food.side = side[getRandomIndex(side)];
            food.mainDish = mainDish[getRandomIndex(mainDish)];
            food.dessert = dessert[getRandomIndex(dessert)];
            break;

        default:
            break;
    }
    return food;
}

function destroyRecipeText(){
    recipeText.removeChild(recipeText.firstChild);
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
    getCheckedRadioButton().checked = false;
}

function getCheckedRadioButton(){
    return document.querySelector('input[name="options"]:checked');
}

function generateRecipeText(recipeType, opt_customRecipeText=''){
    if(recipeText.firstChild){
        destroyRecipeText();
    }

    if(recipeType !== optionsEnum.ENTIRE_MEAL){
        recipeText.classList.remove('meal-text');
        recipeText.classList.add('recipe-text');
    } else {
        recipeText.classList.add('meal-text');
        recipeText.classList.remove('recipe-text');
    }

    hideElement(cookPotImg);
    showElement(shouldMakeText);
    showElement(clearBtn);
    showElement(saveRecipeButton);

    var randomizedRecipe = getRandomRecipe(recipeType);
    var newDiv = document.createElement('div');
    if(opt_customRecipeText.length){
        newDiv.innerText = opt_customRecipeText;
        randomizedRecipe[findRecipeWithValue(randomizedRecipe)] = opt_customRecipeText;
    } else if (recipeType === optionsEnum.ENTIRE_MEAL){
        newDiv.innerText = `${randomizedRecipe.mainDish} with a side of ${randomizedRecipe.side} and ${randomizedRecipe.dessert} for dessert!`; 
    } else {
        newDiv.innerText = randomizedRecipe[findRecipeWithValue(randomizedRecipe)] + '!';
    }
    currentRecipe = randomizedRecipe;
    recipeText.appendChild(newDiv);
    console.log(currentRecipe);
}

function findRecipeWithValue(recipe){
    var recipeKeys = Object.keys(recipe);
    for(var i = 0; i < recipeKeys.length; i++){
        if(recipe[recipeKeys[i]].length){
            return recipeKeys[i];
        }
    }
}

function customRecipeHandler(event){
    event.preventDefault();
    var recipeType = recipeTypeInput.value;

    switch(recipeType){
        case optionsEnum.SIDE:
            side.push(recipeNameInput.value);
            sideRadioBtn.checked = true;
            break;

        case optionsEnum.MAIN_DISH:
            mainDish.push(recipeNameInput.value);
            mainDishRadioBtn.checked = true;
            break;

        case optionsEnum.DESSERT:
            dessert.push(recipeNameInput.value);
            dessertRadioBtn.checked = true;
            break;

        default:
            break;
    }

    generateRecipeText(recipeTypeInput.value.toLowerCase(), recipeNameInput.value);
    customRecipeForm.reset();
}

function checkRadioButtons(event){
    event.preventDefault();
    var activeRadio = getCheckedRadioButton();
    if(activeRadio){
        generateRecipeText(activeRadio.id);
    }
}

function saveRecipeHandler() {
    var activeRadio = getCheckedRadioButton();
    if(activeRadio){
        switch (activeRadio.id) {
            case optionsEnum.ENTIRE_MEAL:
                savedRecipes.entireMeal.push(currentRecipe);
                break;

            case optionsEnum.SIDE:
                savedRecipes.sides.push(currentRecipe.side);
                break;

            case optionsEnum.MAIN_DISH:
                savedRecipes.main.push(currentRecipe.main);
                break;

            case optionsEnum.DESSERT:
                savedRecipes.dessert.push(currentRecipe.dessert);
                break;

            default:
                break;
        }
    }
}


function logInHandler(event) {
    event.preventDefault();

    var usernameValue = usernameInput.value;
    var passwordValue = passwordInput.value;

    if(event.submitter.id === 'sign-up-button'){
        var newUser = new User(
            usernameValue,
            passwordValue,
            currentRecipe,
            storageHandler
        );

        newUser.saveUser('dinnerUsers');
        logInForm.reset();
    } else {
        var userData = storageHandler.checkStorageArrayForItem('dinnerUsers', usernameValue, 'username');
        if(userData && userData.password === passwordValue){
            currentUser = new User(
                userData.username,
                userData.password,
                currentRecipe,
                storageHandler
            )
            signInPage.classList.add('hidden');
            mainPage.classList.remove('hidden');
            currentUserText.innerText = `, ${userData.username}`;
        } else {
            alert('Username or Password incorrect!')
        }
    }

}
