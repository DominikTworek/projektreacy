import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI, MESSAGE, CLEAR_MESSAGE} from "../types";

const initialState = {
    loading: false,
    errors: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            };
        case MESSAGE:
            return {
                ...state,
                loading: false,
                message: null
            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                loading: false,
                message: null
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}