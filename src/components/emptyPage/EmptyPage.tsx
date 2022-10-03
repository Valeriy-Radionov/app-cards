import React from 'react';
import s from './Empty.module.scss'

type EmptyCardsPropsType = {
    addNewItem: () => void
    isMy: boolean
    name: string
}

export const EmptyPage: React.FC<EmptyCardsPropsType> = ({addNewItem, isMy,name}) => {
    return (
        <div className={s.block}>
            <span>There are no cards in this pack that satisfy the search</span>
            {isMy
                ? <button onClick={addNewItem} className={s.addCard}>{name}</button>
                : null
            }

        </div>
    );
};

