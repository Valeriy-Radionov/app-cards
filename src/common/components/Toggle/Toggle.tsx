import React, {useState, MouseEvent} from 'react';
import style  from './Toggle.module.css'

type TogglePropsType = {
    value?: boolean
    onClick?: (value: boolean) => void
}

export const Toggle = (props: TogglePropsType) => {
    const [value, setValue] = useState(props.value ? props.value : false)

    const switchItem = (e: MouseEvent<HTMLDivElement>) => {
        const trigger = e.currentTarget.dataset.toggle
        if(trigger === 'first'){
            if((props.onClick && props.value) || props.onClick){
                props.onClick(true)
            }else if(!props.value && !props.value)
                setValue(true)
            else return
        }
        else{
            if((props.onClick && props.value) || props.onClick){
                props.onClick(false)
            }else if(!props.value && !props.value)
                setValue(false)
            else return
        }
    }

    const classNameFirstItem = `${(props.value ? props.value : value) ? style.activeFirstItem : style.firstItem}`
    const classNameSecondItem = `${!(props.value ? props.value : value) ? style.activeSecondItem : style.secondItem}`

    return (
        <div className={style.container}>
            <div onClick={(e) => switchItem(e)} data-toggle={'first'} className={`${style.item} ${classNameFirstItem}`}>My</div>
            <div onClick={switchItem} data-toggle={'second'} className={`${style.item} ${classNameSecondItem}`}>All</div>
        </div>
    );
};