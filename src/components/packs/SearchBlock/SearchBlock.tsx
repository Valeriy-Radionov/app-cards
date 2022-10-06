import React, {ChangeEvent} from 'react';
import {InputSearch} from "../../../common/components/InputSearch/InputSearch";
import {Toggle} from "../../../common/components/Toggle/Toggle";
import s from './SearchBlock.module.css'
import {DoubleRangeBlock} from "./DoubleRangeBlock/DoubleRangeBlock";

type SettingsBlockPropsType = {
    paramsSearch: URLSearchParams
    addParamsName: (e: ChangeEvent<HTMLInputElement>) => void
    addParamsUserId: (filter: 'my' | 'all') => void
    addParamsMinMax: (min: string, max: string) => void
    user_id: string
}

export const SearchBlock = (props: SettingsBlockPropsType) => {


    const toggleClick = (value: boolean) => {
        value && props.addParamsUserId('my')
        !value && props.addParamsUserId('all')
    }

    return (
        <div className={s.container}>
            <div className={s.item}>
                <span>Search</span>
                <InputSearch value={props.paramsSearch.get("packName") || ""} onChange={e => props.addParamsName(e)}/>
            </div>
            <div className={s.item}>
                <span>Show cards pack</span>
                <Toggle value={!!props.user_id} onClick={toggleClick}/>
            </div>
            <div className={s.item}>
                <span>Number of cards</span>
                <DoubleRangeBlock addParamsMinMax={props.addParamsMinMax}/>
            </div>
        </div>
    );
};
