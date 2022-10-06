import React, {useEffect, useState} from 'react'
import s from './Learn.module.scss'
import SuperButton from "../../common/components/c2-SuperButton 2/SuperButton";
import {LinkArrow} from "../../common/components/Link/LinkArrow";
import {Grades} from '../../api/cards/cards-api'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {useParams} from "react-router-dom";
import {changeCurrentCardAC, getAllCards, updateGrade, updateParamsAC} from "../../bll/learnReducer";
import {Question} from "./Question/Question";
import {Answer} from "./Answer/Answer";
import {getCard} from "../../assets/utils/randomGetCard";


export const Learn = () => {


    const [questionMode, setQuestionMode] = useState(true)


    const dispatch = useAppDispatch
    const packName = useAppSelector(state => state.learn.currentPackName)
    const cards = useAppSelector(state => state.learn.cards)
    const card = useAppSelector(state => state.learn.currentCard)
    const card_id = useAppSelector(state => state.learn.currentCard && state.learn.currentCard._id)
    const isInitializedPage = useAppSelector(state => state.learn.isInitializedPage)
    const {id} = useParams()
    const gotCardsInDeck = cards.length > 0
    console.log(cards.length > 0)

    useEffect(() => {
        dispatch(updateParamsAC({cardsPack_id: id}))
        dispatch(getAllCards())
    }, [])


    const [grades, setGrades] = useState<Grades | string>(Grades.DidNotKnow)

    const gradesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGrades(e.target.value)
    }
    const onNextClickHandler = () => {
        let data = {
            grade: grades,
            card_id: card_id
        }
        dispatch(updateGrade(data))
        dispatch(changeCurrentCardAC(getCard(cards)))
        setQuestionMode(true)
    }

    const onAnswerClickHandler = () => {
        setQuestionMode(false)
    }


    return (

        <div className={s.container}>
            <div className={s.title}>
                <LinkArrow className={s.link} to={'/packs'} name={'Back to Packs List'}/>
                <h1>Learn "{packName}"</h1>
                <div className={s.block}>
                    {isInitializedPage &&
                        <>
                            {questionMode
                                ?
                                <>
                                    <Question
                                        card={card}
                                        gotCardsInDeck={gotCardsInDeck}
                                    />
                                    <SuperButton className={s.button}
                                                 onClick={onAnswerClickHandler}
                                                 disabled={!gotCardsInDeck}>ANSWER</SuperButton>
                                </>
                                :
                                <>
                                    <Question card={card} gotCardsInDeck={gotCardsInDeck}/>
                                    <Answer
                                        card_id={card_id}
                                        cards={cards}
                                        card={card}
                                        grades={grades}
                                        gradesHandler={gradesHandler}
                                    />
                                    <SuperButton className={s.button}
                                                 onClick={onNextClickHandler}>Next</SuperButton>
                                </>}

                        </>}
                </div>
            </div>
        </div>


    )
}