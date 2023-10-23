import { useEffect } from "react";
type ContextProps = {
    user: any;
    isFetching: boolean;
    error: boolean;
};
const initialState: ContextProps = {
    user: JSON.parse(localStorage.getItem("user") as string) || null,
    isFetching: false,
    error: false,
};


function addReducer(state = initialState, action: any) {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true,
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};
export default addReducer;