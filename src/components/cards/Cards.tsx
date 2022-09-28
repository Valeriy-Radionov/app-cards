import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './Crads.module.scss'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {
    addNewCardTC, deleteCardsTC,
    getCardsTC,
    updatePageCountPaginateAC,
    updatePagePaginateAC,
    updateParamsAC
} from "../../bll/cardsReducer";
import { useSearchParams} from 'react-router-dom'
import {BasicTable} from "../table/CardsTable";
import {useDebounce} from "../../common/hooks/debounceHook";
import {MapTableBody} from "../table/TableBody";
import {EmptyCards} from "./EmptyCards";
import {LinkArrow} from "../../common/Link/LinkArrow";


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
    const cardsPack_id = '63319bd2ef99210257c3d013'
    const dispatch = useAppDispatch
    const userID = useAppSelector(state => state.profile.user?._id)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const cards = useAppSelector(state => state.cards)

    // URLSearchParams
    const [searchParams, setSearchParams] = useSearchParams();
    const [gradeSearch, setGradeSearch] = useState(false)
    const [paramsSearch, setParamsSearch] = useState<ParamsType>({
        cardsPack_id,
        cardAnswer: '',
        cardQuestion: '',
        min: '',
        max: '',
        sortCards: '',
        page: '1',
        pageCount: '10'
    })
    const debouncedParamsSearch = useDebounce<ParamsType>(paramsSearch, 1000)
    //

    const checkParamsForQuery = (params: any) => {
        const nameParams = Object.keys(params);
        let resultSearchParams = {};
        nameParams.forEach(name => {
            if (params[name]) {
                resultSearchParams = {...resultSearchParams, [name]: params[name]}
            }
        })
        setSearchParams(resultSearchParams);
    }

    // functions add filter
    const addParamsQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setParamsSearch({
            ...paramsSearch,
            cardQuestion: e.currentTarget.value
        })
        checkParamsForQuery({...paramsSearch, "cardQuestion": e.currentTarget.value});
    }
    const addParamsAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setParamsSearch({
            ...paramsSearch,
            cardAnswer: e.currentTarget.value
        })
        checkParamsForQuery({...paramsSearch, "cardAnswer": e.currentTarget.value})

    }
    const addParamsGrade = () => {
        setGradeSearch(!gradeSearch)
        if (!gradeSearch) {
            setParamsSearch({...paramsSearch, sortCards: '1grade'})
            checkParamsForQuery({...paramsSearch, sortCards: '1grade'})
        } else {
            setParamsSearch({...paramsSearch, sortCards: '0grade'})
            checkParamsForQuery({...paramsSearch, sortCards: '0grade'})
        }
    }
    //

    // functions paginate
    const handleChangePage = (event: unknown, newPage: number) => {
        const page = newPage + 1

        checkParamsForQuery({...paramsSearch, page})
        setParamsSearch({...paramsSearch, page: page.toString()})

        dispatch(updatePagePaginateAC(page))
    }
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pageCount = parseInt(event.target.value, 10)

        checkParamsForQuery({...paramsSearch, pageCount: pageCount})
        setParamsSearch({...paramsSearch, pageCount: pageCount.toString()})

        dispatch(updatePageCountPaginateAC(pageCount))
    };
    //

    //control card
    const addNewCards = () => {
        dispatch(addNewCardTC(cardsPack_id))
    }
    const deleteCard = (id: string) => {
        dispatch(deleteCardsTC(id))
    }
    //


    const getQueryParams = (id: string) => {
        const params: any = {
            cardsPack_id: id,
            cardAnswer: '',
            cardQuestion: '',
            min: '',
            max: '',
            sortCards: '',
            page: '1',
            pageCount: '10'
        }

        searchParams.forEach((value, key) => {
            if (key) {
                params[key] = value
            }
        })
        return params
    }

    useEffect(() => {
        // if(JSON.stringify(getQueryParams(cardsPack_id)) !== JSON.stringify(paramsSearch)) {
        //     //     setParamsSearch(getQueryParams(cardsPack_id))
        //     //     dispatch(updateParamsAC(getQueryParams(cardsPack_id)))
        //     //     dispatch(getCardsTC(cardsPack_id))
        //     // }

        dispatch(updateParamsAC(getQueryParams(cardsPack_id)))
        dispatch(getCardsTC(cardsPack_id))
    }, [debouncedParamsSearch])

    return (
        <div className={s.container}>
            <div className={s.content}>
                <LinkArrow className={s.link} to={'/profile'} name={'Back to Packs List'}/>
                <div>
                    <input value={paramsSearch.cardQuestion}
                           onChange={addParamsQuestion}/>
                    <input value={paramsSearch.cardAnswer}
                           onChange={addParamsAnswer}/>
                </div>
                {cards.cards.length
                    ? <div>
                        {userID == packUserId ? <button onClick={addNewCards}>add new card</button> : null}
                        <BasicTable
                            addParamsGrade={addParamsGrade}
                            grade={gradeSearch}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            stateItems={cards}
                        >
                            <MapTableBody items={cards.cards} deleteItem={deleteCard} isWho={'cards'}/>
                        </BasicTable>
                    </div>
                    : <EmptyCards/>
                }
            </div>
        </div>
    )
}

export default Cards
