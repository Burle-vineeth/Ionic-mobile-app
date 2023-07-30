import { AppState } from "./AppState";

export const AppInitialState: AppState = {
    loading: {
        show: false,
    },
    login : {
        error: null,
        isLogedIn: false,
        isLoggingIn: false,
        isRecoveredPassword: false,
        isRecoveringPassword: false,
    },
}