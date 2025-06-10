import {createContext, useContext, useReducer} from "react";
import testAction from "@/core/testAction";
import listAction from "@/core/listAction";

    // Inicijalno stanje, pre nego sto smo ga promenili
const initialState = {
    type: null,
    row: {},
    reload: false,
}

    //Pravimo novi context, kutiju za globalno stanje i metode
const listActionContext  = createContext();


    // Reducer => switch-case;
        // sadrzi logiku kako se state menja u zavisnosti od akcije
const listActionReducer = (state, action) => {
    switch (action.type) {
        case listAction.RELOAD:        // ovo vucemo iz core/listAction.js kao konstantu
            return {...initialState, reload: true};
        case listAction.UPDATE:
            return {...state, row: action.payload, type: listAction.UPDATE};
        case listAction.DELETE:
            return {...state, row: action.payload, type: listAction.DELETE};
        case listAction.CREATE:
            return {...state, row: {}, type: listAction.CREATE};
        case listAction.RESET:
            return initialState;

        default:
            return state;
    }
}
    // Kao dependencyInjection => omogucava komponentama da pristupe glob. stanju
const ListActionProvider = ({children}) => {
    const [state, dispatch] = useReducer(listActionReducer, initialState);

    const value = {state, dispatch};

    return (
        <listActionContext.Provider value={value}>
            {children}
        </listActionContext.Provider>
    );
}

    // Ovo stavis u neku komponentu da bi koristio ovaj context
const useListActions = () => {
    const context = useContext(listActionContext);

    if (context === undefined) {
        throw new Error('listActions must be use within listActionProvider');
    }

    return context;
}

export { ListActionProvider, useListActions };