import React from 'react';
import {NavLink} from "react-router-dom";
import arrow from "../../../assets/image/Vector 1.svg";

type LinkArrowPropsType = {
    className: string
    to: string
    name: string
    callback?: () => void
}

export const LinkArrow: React.FC<LinkArrowPropsType> = ({className, to, name,callback}) => {
    return (
        <div className={className}>
            <NavLink to={to} onClick={callback}>
                <img src={arrow} alt=""/>
                {name}
            </NavLink>
        </div>
    );
};

