import { legacy_createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "@redux-devtools/extension"
import thunk from "redux-thunk"
import reducers from "./reducers"

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
}
  
function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage()

const  store = legacy_createStore(reducers, persistedState, composeWithDevTools(applyMiddleware(thunk)))

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store