import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unsetItems = createAction('[IngresoEgreso Component] Unset Items');
export const setItems = createAction('[IngresoEgreso Component] Set Items',
                                    props<{items: IngresoEgreso[]}>());