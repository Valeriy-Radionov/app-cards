import React from 'react';
import s from './Empty.module.scss'

type EmptyCardsPropsType = {
    addNewItem: () => void
    isMy: boolean
}

export const EmptyCards: React.FC<EmptyCardsPropsType> = ({addNewItem, isMy}) => {
    return (
        <div className={s.block}>
            <span>There are no cards in this pack that satisfy the search</span>
            {isMy
                ? <button onClick={addNewItem} className={s.addCard}>Add new card</button>
                : null
            }

        </div>
    );
};

