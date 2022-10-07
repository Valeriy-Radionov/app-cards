import React, {useEffect} from 'react';
import s from './DoubleRangeBlock.module.css'
import {Slider} from "@mui/material";
import {useSearchParams} from "react-router-dom";

type DoubleRangeBlockPropsType = {
    addParamsMinMax: (min: string, max: string) => void
    minValue: number
    maxValue: number
}

export const DoubleRangeBlock = (props: DoubleRangeBlockPropsType) => {
    const [params, setParams] = useSearchParams()
    const [value, setValue] = React.useState<number[]>([0, 100]);

    function valuetext(value: number) {
        return `${value}`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        props.addParamsMinMax(value[0].toString(), value[1].toString())
    }

    useEffect(() => {
        const min = params.get('min')
        const max = params.get('max')
        setValue([Number(min) || props.minValue, Number(max) || props.maxValue])
    }, [props.minValue, props.maxValue])

    return (
        <div className={s.container}>
            <Slider
                min={props.minValue}
                max={props.maxValue}
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </div>
    );
};