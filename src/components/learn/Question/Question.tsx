import React from 'react'
import {CardType} from "../../../api/cards/cards-api";
import s from './Question.module.css'


type QuestionPropsType = {
    card: CardType | null,
    cardsAvailability: boolean
}

export const Question: React.FC<QuestionPropsType> = (props) => {
    return (
        <>
            {props.cardsAvailability
                ? <div className={s.question}>
                    <span style={{fontWeight: 600}}>Question: </span>
                    <span>{props.card && props.card.question}</span>
                </div>
                :
                <span>No cards</span>
            }
            <div className={s.attempts}>
                {props.card && `Number of answer attempts: ${props.card.shots}`}
            </div>
        </>
    )
}