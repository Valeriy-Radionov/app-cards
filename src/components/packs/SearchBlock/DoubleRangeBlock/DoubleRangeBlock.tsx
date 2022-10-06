import React, {MouseEvent, useEffect, useState} from 'react';
import {SquareWithRangeValue} from "../../../../common/components/SquareWithRangeValue/SquareWithRangeValue";
import {DoubleRange} from "../../../../common/components/DoubleRange/DoubleRange";
import s from './DoubleRangeBlock.module.css'

type DoubleRangeBlockPropsType = {
    addParamsMinMax: (min: string, max: string) => void
}

export const DoubleRangeBlock = (props: DoubleRangeBlockPropsType) => {
    const [leftValue, setLeftValue] = useState(0)
    const [rightValue, setRightValue] = useState(100)
    const [mouseUpEvent, setMouseUpEvent] = useState<object>()

    const onChangeCallback = (leftValue: number, rightValue: number) => {
        setLeftValue(leftValue)
        setRightValue(rightValue)
    }
    const onMouseUpCallback = (e: MouseEvent<HTMLInputElement>) => {
        setMouseUpEvent(e)
    }

    useEffect(() => {
        props.addParamsMinMax('' + leftValue, '' + rightValue)
    }, [mouseUpEvent])
    return (
        <div className={s.container}>
            <SquareWithRangeValue value={leftValue}/>
            <DoubleRange onMouseUp={onMouseUpCallback} onChangeRange={onChangeCallback}/>
            <SquareWithRangeValue value={rightValue}/>
        </div>
    );
};