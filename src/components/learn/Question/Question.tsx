import React from 'react'
import SuperButton from "../../../common/components/c2-SuperButton 2/SuperButton";
import {CardType} from "../../../api/cards/cards-api";
import s from './Question.module.css'


type QuestionPropsType = {
    card:CardType | null,
    onAnswerClickHandler: () => void ,
    gotCradsInDeck:boolean

}

export const Question:React.FC<QuestionPropsType> = (props) => {
    return (
        <div >
            <div >
                {props.gotCradsInDeck
                    ?<div>
                    <h2 className={s.h2}>Question: </h2>
                    <span>{props.card &&props.card.question}</span>
                    </div>
                    :
                    <span>No cards</span>
                }
            </div>
            <div>
                {props.card && `Number of answer attempts: ${props.card.shots}`}
            </div>

            {/*<div>{props.card && props.card.question ? `Question: ${props.card.question}` : 'No cards in this pack'}</div>*/}
            {/*<div> {props.card && `Number of answer attempts: ${props.card.shots}`}</div>*/}
            <SuperButton onClick={props.onAnswerClickHandler} disabled={!props.gotCradsInDeck}>ANSWER</SuperButton>
        </div>
    )
}