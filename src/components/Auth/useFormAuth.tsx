import { useReducer } from "react";

const formReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'decrement':
            return { count: state.count - 1 }
        case 'increment':
            return { count: state.count + 1 }
        default:
            return state;
    }
}