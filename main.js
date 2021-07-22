var mealOptionForm = document.getElementById('meal-option-form');
var radioButtons = document.getElementsByName('options');
var cookPotImg = document.getElementById('cook-pot');
var recipeText = document.getElementById('recipe-text-location');
var shouldMakeText = document.getElementById('should-make-text');
var letsCookBtn = document.getElementById('lets-cook-btn');
var clearBtn = document.getElementById('clear-btn');

mealOptionForm.addEventListener('submit', checkCheckedButton);
clearBtn.addEventListener('click', clearSelection);

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

function generateSingleRecipeText(recipeType){
    if(recipeText.firstChild){
        console.log('Recipe txt first child');
        destroyRecipeText();
    } 
        var newDiv = document.createElement('div');
        newDiv.innerText = getRandomRecipe(recipeType) + '!';
        recipeText.appendChild(newDiv);
}

function generateMealRecipeText() {
    console.log(recipeText.firstChild);
    if(recipeText.firstChild){
        recipeText.removeChild(recipeText.firstChild);
    } 
        var newDiv = document.createElement('div');
        newDiv.innerText = `${getRandomRecipe(mainDish)} with a side of ${getRandomRecipe(side)} and ${getRandomRecipe(dessert)} for dessert!`;
        recipeText.appendChild(newDiv);
}

function checkCheckedButton(event){
    event.preventDefault();
    for(var i = 0; i < radioButtons.length; i++){
        if(radioButtons[i].checked){
            if(radioButtons[i].id === 'side'){
                hideElement(cookPotImg);
                showElement(shouldMakeText);
                showElement(clearBtn);
                generateSingleRecipeText(side);
                activeButton = radioButtons[i];
                recipeText.classList.remove('meal-text');
                recipeText.classList.add('recipe-text');
            } else if(radioButtons[i].id === 'main-dish'){
                hideElement(cookPotImg);
                showElement(shouldMakeText);
                showElement(clearBtn);
                generateSingleRecipeText(mainDish);
                activeButton = radioButtons[i];
                recipeText.classList.remove('meal-text');
                recipeText.classList.add('recipe-text');
            } else if(radioButtons[i].id === 'dessert'){
                hideElement(cookPotImg);
                showElement(shouldMakeText);
                showElement(clearBtn);
                generateSingleRecipeText(dessert);
                recipeText.classList.remove('meal-text');
                recipeText.classList.add('recipe-text');
                activeButton = radioButtons[i];
            } else if(radioButtons[i].id === 'entire-meal'){
                hideElement(cookPotImg);
                showElement(shouldMakeText);
                showElement(clearBtn);
                generateMealRecipeText();
                recipeText.classList.remove('recipe-text');
                recipeText.classList.add('meal-text');
                activeButton = radioButtons[i];
            }
        }
    }
}