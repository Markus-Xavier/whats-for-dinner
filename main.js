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

//RADIO BUTTONS
var sideRadioBtn = document.getElementById('side');
var mainDishRadioBtn = document.getElementById('main-dish');
var dessertRadioBtn = document.getElementById('dessert');
var entireMealRadioBtn = document.getElementById('entire-meal');

mealOptionForm.addEventListener('submit', checkCheckedButton);
clearBtn.addEventListener('click', clearSelection);
addARecipe.addEventListener('click', toggleRecipeForm);
customRecipeForm.addEventListener('submit', customRecipeHandler);

var activeButton;

function disableElement(element){
    element.disabled = true;
}

function enableElement(element){
    element.disabled = false;
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function hideElement(element){
    element.hidden = true;
}

function showElement(element){
    element.hidden = false;
}

function clearSelection() {
    destroyRecipeText();
    hideElement(shouldMakeText);
    hideElement(clearBtn);
    showElement(cookPotImg);
    activeButton.checked = false;
}

function getRandomRecipe(recipeType) {
    return recipeType[getRandomIndex(recipeType)];
}

function destroyRecipeText() {
    recipeText.removeChild(recipeText.firstChild)
}

function toggleRecipeForm() {
    footer.classList.toggle('hidden');
}

function generateRecipeText(recipeType, opt_customRecipeText='', opt_customRecipe=false){
    if(recipeText.firstChild){
        destroyRecipeText();
    } 
    hideElement(cookPotImg);
    showElement(shouldMakeText);
    showElement(clearBtn);
    var newDiv = document.createElement('div');
    if(opt_customRecipe){
        newDiv.innerText = opt_customRecipeText;
    } else if (recipeType === 'entire meal'){
        newDiv.innerText = `${getRandomRecipe(mainDish)} with a side of ${getRandomRecipe(side)} and ${getRandomRecipe(dessert)} for dessert!`;
    } else {
        newDiv.innerText = getRandomRecipe(recipeType) + '!';
    }
    recipeText.appendChild(newDiv);
}

function customRecipeHandler(event) {
    event.preventDefault();
    console.log(recipeTypeInput.value.toUpperCase(), recipeNameInput.value);
    if(recipeTypeInput.value.toUpperCase() === 'SIDE'){
        side.push(recipeNameInput.value);
    } else if (recipeTypeInput.value.toUpperCase() === 'MAIN DISH'){
        mainDish.push(recipeNameInput.value);
    } else if (recipeTypeInput.value.toUpperCase === 'DESSERT'){
        dessert.push(recipeNameInput.value);
    }
    generateRecipeText(recipeTypeInput.value.toLowerCase(), recipeNameInput.value, true);
    customRecipeForm.reset();
}

function checkCheckedButton(event){
    event.preventDefault();
    // hideElement(cookPotImg);
    // showElement(shouldMakeText);
    // showElement(clearBtn);

    if(activeButton === entireMealRadioBtn){
        recipeText.classList.remove('meal-text');
        recipeText.classList.add('recipe-text');
    }
    if(sideRadioBtn.checked){
        generateRecipeText(side);
        activeButton = sideRadioBtn;
    } else if(mainDishRadioBtn.checked){
        generateRecipeText(mainDish);
        activeButton = mainDishRadioBtn;
    } else if(dessertRadioBtn.checked){
        generateRecipeText(dessert);
        activeButton = dessertRadioBtn;
    }else if(entireMealRadioBtn.checked){
        generateRecipeText('entire meal');
        recipeText.classList.remove('recipe-text');
        recipeText.classList.add('meal-text');
        activeButton = entireMealRadioBtn;
    }
}


// function checkCheckedButton(event){
//     event.preventDefault();
//     for(var i = 0; i < radioButtons.length; i++){
//         if(radioButtons[i].checked){
//             if(radioButtons[i].id === 'side'){
//                 hideElement(cookPotImg);
//                 showElement(shouldMakeText);
//                 showElement(clearBtn);
//                 generateSingleRecipeText(side);
//                 activeButton = radioButtons[i];
//                 recipeText.classList.remove('meal-text');
//                 recipeText.classList.add('recipe-text');
//             } else if(radioButtons[i].id === 'main-dish'){
//                 hideElement(cookPotImg);
//                 showElement(shouldMakeText);
//                 showElement(clearBtn);
//                 generateSingleRecipeText(mainDish);
//                 activeButton = radioButtons[i];
//                 recipeText.classList.remove('meal-text');
//                 recipeText.classList.add('recipe-text');
//             } else if(radioButtons[i].id === 'dessert'){
//                 hideElement(cookPotImg);
//                 showElement(shouldMakeText);
//                 showElement(clearBtn);
//                 generateSingleRecipeText(dessert);
//                 recipeText.classList.remove('meal-text');
//                 recipeText.classList.add('recipe-text');
//                 activeButton = radioButtons[i];
//             } else if(radioButtons[i].id === 'entire-meal'){
//                 hideElement(cookPotImg);
//                 showElement(shouldMakeText);
//                 showElement(clearBtn);
//                 generateMealRecipeText();
//                 recipeText.classList.remove('recipe-text');
//                 recipeText.classList.add('meal-text');
//                 activeButton = radioButtons[i];
//             }
//         }
//     }
// }