import React from 'react';
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../common/c6-SuperRadio/SuperRadio";
import SuperRange from "../../common/c7-SuperRange/SuperRange";
import style from "./SuperComponents.module.css"
import SuperButton from "../../common/c2-SuperButton 2/SuperButton";
//import SuperInputText from "../../common/c1-SuperInputText 2/SuperInputText";
export const SuperComponents = () => {
    return (
        <div className={style.container}>
            {/*<SuperInputText/>*/}
            <SuperButton>Button</SuperButton>
            <SuperCheckbox/>
            <SuperEditableSpan/>
            <SuperSelect options={["a", "b", "c"]}/>
            <SuperRadio options={["a", "b", "c"]}/>
            <SuperRange/>
        </div>
    );
};

