import UpdateUserDialog from "@/elements/User/Dialogs/UpdateUserDialog";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";

const AllUserDialogs = ({}) => {
    const {state} = useListActions();


    return (
        <>
            <UpdateUserDialog isOpen={state.type === listAction.UPDATE}/>
        </>
    );
}

export default AllUserDialogs;