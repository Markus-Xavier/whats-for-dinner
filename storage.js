class StorageHandler{
    constructor(){}

    storeItemToNewKey(key, storageItem){
        localStorage.setItem(key, storageItem)
    }

    initializeStorage(key, storageItem){
        if(!localStorage.getItem(key)){
            localStorage.setItem(key, storageItem);
        }
    }

    storeToExistingArray(localStorageKey, stringifiedContent){
        var gettingLocalStorage = localStorage.getItem(localStorageKey);
        var existingArray = JSON.parse(gettingLocalStorage);
        existingArray.push(stringifiedContent);
        localStorage.setItem(localStorageKey, JSON.stringify(existingArray));
    }

    checkStorageArrayForItem(localStorageKey, itemToCheck, opt_objectKey =''){
        var parsedLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));
        var parsedObjects = [];

        for(var i = 0; i < parsedLocalStorage.length; i++){
            parsedObjects.push(JSON.parse(parsedLocalStorage[i]));
        }

        for(var i = 0; i < parsedObjects.length; i++){
            if(parsedObjects[i][opt_objectKey] === itemToCheck){
                return parsedObjects[i];
            }
        }
    }
}