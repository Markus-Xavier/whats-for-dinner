class User{
    constructor(username, password, currentRecipe , storageHandler) {
        this.username = username;
        this.password = password;
        this.savedRecipes = [];
        this.currentRecipe = currentRecipe;
        this.storageHandler = storageHandler;
    }

    saveRecipe(){
        this.savedRecipes.push(this.currentRecipe);
    }

    saveUser(saveLocation){
        var userData = {
            username: this.username,
            password: this.password,
            savedRecipes: this.savedRecipes,
            currentRecipe: this.currentRecipe,
            storageHandler: this.storageHandler
        }
        this.storageHandler.storeToExistingArray(saveLocation, JSON.stringify(userData));
    }
}
