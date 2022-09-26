import React, {ChangeEvent, useEffect, useState} from "react";
import style from './DoubleRange.module.css';

type SuperDoubleRangePropsType = {
    leftValue?: number;
    rightValue?: number;
    min?: number;
    max?: number;
    rangeGap?: number;
    step?: number;
    onChangeRange?: (left: number, right: number) => void;
    className?: string
};

export const DoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        leftValue = 0,
        rightValue = 100,
        min = 0,
        max = 100,
        rangeGap = 1,
        step = 1,
        onChangeRange,
        className,
    }) => {
    const [localLeftValue, setLocalLeftValue] = useState(leftValue);
    const [localRightValue, setLocalRightValue] = useState(rightValue);
    const [leftProgressStyle, setLeftProgressStyle] = useState('')
    const [rightProgressStyle, setRightProgressStyle] = useState('')

    if (min > max - 1) {
        throw new Error('The min must be less than the max by at least 1')
    }
    if (leftValue < min || leftValue >= max || rightValue <= min || rightValue > max) {
        throw new Error('The leftValue and the rightValue must be must be within the range of the min and max values')
    }

    const onChangeLeftValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;

        if (localRightValue - value < rangeGap) {
            setLocalLeftValue(localRightValue - rangeGap);
            onChangeRange && onChangeRange(localRightValue - rangeGap, localRightValue);
            return;
        }
        setLocalLeftValue(value);
        onChangeRange && onChangeRange(value, localRightValue);
    };

    const onChangeRightValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;

        if (value - localLeftValue < rangeGap) {
            setLocalRightValue(localLeftValue + rangeGap);
            onChangeRange && onChangeRange(localLeftValue, localLeftValue + rangeGap)
            return;
        }
        setLocalRightValue(value);
        onChangeRange && onChangeRange(localLeftValue, value);
    };

    useEffect(() => {
        setLeftProgressStyle((localLeftValue - min) * 100 / (max - min) + '%')
        setRightProgressStyle((max - localRightValue) * 100 / (max - min) + '%')
    }, [localLeftValue, localRightValue, max, min, rangeGap])

    let widthContainer = 0
    //достаёт свойство width у селектора container и записывает в widthContainer
    const containerEl = document.querySelector(`.${style.container}`)
    if (containerEl) {
        const containerStyle = getComputedStyle(containerEl)
        widthContainer = Number(containerStyle.getPropertyValue('width').split('px')[0])
    }
    //-----------------------------------------------------------------------------------
    //в root переменные css записывает значение widthContainer
    const root = document.querySelector(':root')
    if (root) {
        document.documentElement.style.setProperty('--width-slider', `${widthContainer - 14}px`)
        document.documentElement.style.setProperty('--width-range-input', `${widthContainer - 2}px`)
    }
    //-----------------------------------------------------------------------------------

    const styleProgress = {
        left: leftProgressStyle,
        right: rightProgressStyle
    }

    const classNameDoubleRange = `${style.container} ${className && className}`

    return (
        <div className={classNameDoubleRange}>
            <div className={style.slider}>
                <div className={style.progress} style={styleProgress}></div>
            </div>
            <div className={style.rangeInput}>
                <input className={style.rangeMin} type="range"
                       value={localLeftValue}
                       onChange={onChangeLeftValue}
                       min={min}
                       max={max}
                       step={step}
                />
                <input className={style.rangeMax} type="range"
                       value={localRightValue}
                       onChange={onChangeRightValue}
                       min={min}
                       max={max}
                       step={step}
                />
            </div>
        </div>
    );
};
