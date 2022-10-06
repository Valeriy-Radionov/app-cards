import React from 'react'
import {CardType} from "../../../api/cards/cards-api";
import s from './Question.module.css'


type QuestionPropsType = {
    card: CardType | null,
    gotCardsInDeck: boolean
}

export const Question: React.FC<QuestionPropsType> = (props) => {
    return (
        <div className={s.main}>
            <div className={s.container}>
                <div className={s.block}>
                    {props.gotCardsInDeck
                        ? <div className={s.question}>
                            <span>Question: </span>
                            <span className={s.questionBody}>{props.card && props.card.question}</span>
                        </div>
                        :
                        <span>No cards</span>
                    }
                </div>
            </div>
            <div className={s.attempts}>
                {props.card && `Number of answer attempts: ${props.card.shots}`}
            </div>

        </div>
    )
}