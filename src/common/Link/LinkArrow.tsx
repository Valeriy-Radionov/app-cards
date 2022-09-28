import React from 'react';
import {NavLink} from "react-router-dom";
import arrow from "../image/Vector 1.svg";

type LinkArrowPropsType = {
    className: string
    to: string
    name: string
}

export const LinkArrow: React.FC<LinkArrowPropsType> = ({className, to, name}) => {
    return (
        <div className={className}>
            <NavLink to={to}>
                <img src={arrow} alt=""/>
                {name}
            </NavLink>
        </div>
    );
};

