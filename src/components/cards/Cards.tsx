import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './Crads.module.scss'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {addNewCardTC, getCardsTC, updateParamsAC} from "../../bll/cardsReducer";
import { useSearchParams} from 'react-router-dom'
import {BasicTable} from "./CardsTable";
import {useDebounce} from "../../common/hooks/debounceHook";


export type ParamsType = {
    cardAnswer?: string  // не обязательно
    cardQuestion?: string // не обязательно
    cardsPack_id: string //обязательно!!!
    min?: string   // не обязательно
    max?: string  // не обязательно
    sortCards?: string // не обязательно
    page?: string  // не обязательно
    pageCount?: string // не обязательно
}

function Cards() {
    const dispatch = useAppDispatch
    const params = useAppSelector(state => state.cards.params)

    const [questionSearch, setQuestionSearch] = useState('')
    const [answerSearch, setAnswerSearch] = useState('')
    const [gradeSearch, setGradeSearch] = useState(false)
    const debouncedQuestionSearch = useDebounce<string>(questionSearch, 1000)
    const debouncedAnswerSearch = useDebounce<string>(answerSearch, 1000)
    const debouncedGradeSearch = useDebounce<boolean>(gradeSearch, 1000)


    const cardsPack_id = '63319bd2ef99210257c3d013'

    let [searchParams, setSearchParams] = useSearchParams();
    const cardAnswer = searchParams.get('cardAnswer')
    const cardQuestion = searchParams.get('cardQuestion')
    const cardGrade = searchParams.get('sortCards')


    const addParamsQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionSearch(e.currentTarget.value)
        // dispatch(updateParamsAC({cardsPack_id: cardsPack_id , cardQuestion: e.currentTarget.value }))
        // dispatch(getCardsTC(cardsPack_id))
        if (e.currentTarget.value) {
            setSearchParams({cardQuestion: e.currentTarget.value, cardAnswer: answerSearch})
        } else {
            setSearchParams(answerSearch ? {cardAnswer: answerSearch} : {})
        }
    }

    const addParamsAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerSearch(e.currentTarget.value)
        // dispatch(updateParamsAC({cardsPack_id: cardsPack_id ,  cardAnswer: e.currentTarget.value }))
        // dispatch(getCardsTC(cardsPack_id))
        if (e.currentTarget.value) {
            setSearchParams({cardQuestion: questionSearch, cardAnswer: e.currentTarget.value})
        } else {

            setSearchParams(questionSearch ? {cardQuestion: questionSearch} : {})
        }
    }
    const addParamsGrade = () => {
        setGradeSearch(!gradeSearch)
        // gradeSearch
        //     ? dispatch(updateParamsAC({cardsPack_id: cardsPack_id, sortCards: '0grade'}))
        //     : dispatch(updateParamsAC({cardsPack_id: cardsPack_id, sortCards: '1grade'}))
        if (gradeSearch) {
            setSearchParams({cardQuestion: questionSearch, cardAnswer: answerSearch, sortCards: '1grade'})
        } else {
            setSearchParams({cardQuestion: questionSearch, cardAnswer: answerSearch, sortCards: '0grade'})
        }
    }


    const addNewCards = () => {
        dispatch(addNewCardTC(cardsPack_id))
    }

    useEffect(() => {
        const params: ParamsType = {
            cardsPack_id: cardsPack_id,
            cardQuestion: '',
            cardAnswer: '',
            sortCards: ''
        }

        if (cardQuestion) params.cardQuestion = cardQuestion
        if (cardAnswer) params.cardAnswer = cardAnswer
        if (cardGrade) params.sortCards = cardGrade

        dispatch(updateParamsAC(params))
        dispatch(getCardsTC(cardsPack_id))
    }, [debouncedQuestionSearch, debouncedAnswerSearch, debouncedGradeSearch])

    return (
        <div className={s.table}>
            <div>
                <input value={questionSearch}
                       onChange={addParamsQuestion}/>
                <input value={answerSearch}
                       onChange={addParamsAnswer}/>
            </div>
            <button onClick={addNewCards}>add new card</button>
            <BasicTable packId={cardsPack_id} addParamsGrade={addParamsGrade} grade={gradeSearch}/>
        </div>
    )
}

export default Cards
