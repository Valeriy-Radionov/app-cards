import React from 'react';

type ActionsCardTablePropsType = {
    deleteItem: (id: string) => void
    id: string
}
export const ActionsCardTable: React.FC<ActionsCardTablePropsType> = ({deleteItem,id}) => {
    return (
        <div>
            <button onClick={() => deleteItem(id)}>delete</button>

        </div>
    );
};

