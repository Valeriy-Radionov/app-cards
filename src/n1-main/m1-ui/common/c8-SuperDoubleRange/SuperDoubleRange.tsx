import React from 'react'
// import {Box, Slider} from "@mui/material";
//
// type SuperDoubleRangePropsType = {
//     onChangeRange?: (value: number | number[]) => void
//     value?: number | number[]
//     min: number
//     max: number
//     // min, max, step, disable, ...
// }
//
// function valuetext(value: number) {
//     return `${value}°C`;
// }
//
// const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
//     {
//         onChangeRange, value, min, max
//
//         // min, max, step, disable, ...
//     }
// ) => {
//     // сделать самому, можно подключать библиотеки
//     const [valueSl, setValue] = React.useState<number[]>([0, 100]);
//
//     const handleChange = (event: Event, newValue: number | number[]) => {
//         onChangeRange && onChangeRange(newValue)
//         // onChangeRange && onChangeRange(+event.currentTarget.value)
//         setValue(newValue as number[]);
//     };
//
//     return (
//         <Box sx={{width: 300}}>
//             <Slider
//                 getAriaLabel={() => 'Temperature range'}
//                 value={value}
//                 onChange={handleChange}
//                 valueLabelDisplay="auto"
//                 getAriaValueText={valuetext}
//                 disableSwap={true}
//                 min={min}
//                 max={max}
//             />
//         </Box>
//     )
// }
//
// export default SuperDoubleRange
