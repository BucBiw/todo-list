import { combineReducers } from "redux";

const loggedInReducer = (state = false, action) => {
    switch(action.type){
        case 'SIGNIN':
            state = true;
            return state;
        case 'SIGNOUT':
            state = false;
            return state;
        default:
            return state;
    }
}




export const allReducers = combineReducers({
    isLoggedIn: loggedInReducer
});

export default {loggedInReducer, allReducers};