import {createContext, useContext, useReducer} from "react";
import testAction from "@/core/testAction";


const initialState = {
    firstName: "Nikola",
    email: "ndjermanovic@singidunum.ac.rs",
}

//  1. Korak - Kreiranje konteksta => globalnog stanja
const testContext  = createContext();

//  2. Korak - Kreiranje reducera  => funkcije koja ce promeniti stanje u contextu
const testReducer = (state, action) => {
    switch (action.type) {
        case testAction.CHANGE_EMAIL:        // ovo vucemo iz core/testAction.js kao konstantu
            return {...state, email: action.payload};
        case testAction.CHANGE_FIRST_NAME:
            return {...state, firstName: action.payload};
        default:
            return state;
    }
}

//  3. Korak - Kreiranje provajdera za nase parcijalne komponente
const TestProvider = ({children}) => {
    const [state, dispatch] = useReducer(testReducer, initialState);

    const value = {state, dispatch};

    return (
        <testContext.Provider value={value}>
            {children}
        </testContext.Provider>
    );
}
// 4. Korak - Kreirati funkciju za koriscenje context-a
const useTestActions = () => {
    const context = useContext(testContext);

    if (context === undefined) {
        throw new Error('testActions must be use within TestProvider');
    }

    return context;
}

export { TestProvider, useTestActions };