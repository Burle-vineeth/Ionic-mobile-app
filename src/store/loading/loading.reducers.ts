import { createReducer, on } from "@ngrx/store";
import { hide, show } from "./loading.actions";
import { LoadingState } from "./LoadingState";
import { AppInitialState } from "../AppInitialState";

const initialState : LoadingState = AppInitialState.loading;

const reducer:any = createReducer(
    initialState, 
    on(show, () => {
        return { show: true};
    }), on (hide, () => {
        return { show: false};
    })
);

export function loadingReducer(state:LoadingState, action:any) {
    return reducer(state, action);
}