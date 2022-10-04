import React from 'react';
import s from './Empty.module.scss'
import AddCartModal from "../cards/cardModals/addCardModal/AddCartModal";
import {AddPackModal} from "../packs/PackModal/addPackModal/AddPackModal";

type EmptyCardsPropsType = {
    packCard: 'packs' | 'cards'
    isMy: boolean
    name: string
}

export const EmptyPage: React.FC<EmptyCardsPropsType> = ({packCard, isMy, name}) => {
    return (
        <div className={s.block}>
            <span>There are no cards in this pack that satisfy the search</span>
            {isMy
                ? packCard === 'cards' ? <AddCartModal addEditModal={'add'}/> : <AddPackModal />
                : null
            }

        </div>
    );
};

