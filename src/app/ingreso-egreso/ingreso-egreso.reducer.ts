import { Action, createReducer, on } from '@ngrx/store';
import { setItems, unsetItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducers';

export interface State {
    items: IngresoEgreso[]; 
}

export interface AppStateWithIngresoEgreso extends AppState{
    ie: State
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state,{items}) => ({ ...state, items: [...items]})),
    on(unsetItems, state => ({ ...state, items: []})),

);

export function ingresoEgresoReducer(state: State | undefined, action: Action) {
    return _ingresoEgresoReducer(state, action);
}