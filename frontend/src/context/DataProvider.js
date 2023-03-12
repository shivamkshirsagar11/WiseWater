import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer.js";

export const DataContext = createContext();

export function DataProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {props.children}
        </DataContext.Provider>
    );
}
