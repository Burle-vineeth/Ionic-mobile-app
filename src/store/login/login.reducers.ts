import { createReducer, on } from "@ngrx/store";
import { login, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { AppInitialState } from "../AppInitialState";
import { LoginState } from "./LoginState";
import { loginSuccess } from "./login.actions";
import { loginFail } from "./login.actions";

const initialState:LoginState = AppInitialState.login;

const reducer = createReducer(
    initialState,
    on(recoverPassword, 
        currentState => {
            return {
                ...currentState,
                error : null,
                isRecoveredPassword: false,
                isRecoveringPassword: true,
            };
        }
    ),
    on(recoverPasswordSuccess, 
        currentState => {
            return {
                ...currentState,
                error: null,
                isRecoveringPassword: false,
                isRecoveredPassword: true,
            };
        }
    ),
    on(recoverPasswordFail, 
        (currentState,action) => {
            return {
                ...currentState,
                error: action.error,
                isRecoveredPassword: false,
                isRecoveringPassword: false,
            };
        }
    ),
    on(login, currentState => {
        return {
            ...currentState,
            error: null,
            isLogedIn: false,
            isLoggingIn: true,
        }
    }),
    on(loginSuccess, currentState => {
        return {
            ...currentState,
            isLogedIn: true,
            isLoggingIn: false,
        }
    }),
    on(loginFail, (currentState,action) => {
        return {
            ...currentState,
            error: action.error,
            isLogedIn: false,
            isLoggingIn: false,
        }
    })
)

export function loginReducer(state:any, action: any) {
    return reducer(state,action);
}