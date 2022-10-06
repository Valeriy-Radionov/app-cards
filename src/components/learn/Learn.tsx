import React, {useEffect, useState} from 'react'
import s from './Learn.module.scss'
import SuperButton from "../../common/components/c2-SuperButton 2/SuperButton";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {LinkArrow} from "../../common/components/Link/LinkArrow";
import {Grades} from '../../api/cards/cards-api'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {useParams} from "react-router-dom";
import { getAllCards, updateGrade, updateParamsAC} from "../../bll/learnReducer";

import {Question} from "./Question/Question";
import {Answer} from "./Answer/Answer";


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
                                <Question card={card} gotCardsInDeck={gotCardsInDeck} />
                                <Answer
                                card_id = {card_id}
                                cards={cards}
                                card={card}
                                setQuestionMode={setQuestionMode}
                                />
                                   </> }

                        </>}
                </div>
            </div>
        </div>


    )
}