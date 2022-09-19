import React, {useEffect} from 'react';
import {recoveryAC} from "../../../bll/recoveryReducer";
import {useAppDispatch} from "../../../bll/store";

export const EmailSentPage = () => {
    const dispatch = useAppDispatch

    useEffect(() => {
        console.log('effect')
        return () => {
            dispatch(recoveryAC(false))
        }
    })
    return (
        <div>
            Email Sent

        </div>
    );
};