import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './Crads.module.scss'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {
    addNewCardTC,
    deleteCardsTC,
    getCardsTC,
    updatePageCountPaginateAC,
    updatePagePaginateAC,
    updateParamsAC
} from "../../bll/cardsReducer";
import {useSearchParams} from 'react-router-dom'
import {BasicTable} from "../table/CardsTable";
import {useDebounce} from "../../common/hooks/debounceHook";
import {MapTableBody} from "../table/TableBody";
import {EmptyPage} from "./EmptyPage";
import {LinkArrow} from "../../common/Link/LinkArrow";
import {InputSearch} from "../../common/inputSearch/InputSearch";
import actions from '../../common/image/actions.svg'


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
    const cardsPack_id = '632f9975ef99210257c3d00f'
    const dispatch = useAppDispatch
    const userID = useAppSelector(state => state.profile.user?._id)
    const cards = useAppSelector(state => state.cards)

    const isMyCards = cards.packUserId === userID

    // URLSearchParams
    const [searchParams, setSearchParams] = useSearchParams();
    const [gradeSearch, setGradeSearch] = useState(false)
    const [paramsSearch, setParamsSearch] = useState<ParamsType>({
        cardsPack_id,
        page: '1',
        pageCount: '10'
    })
    const debouncedParamsSearch = useDebounce<ParamsType>(paramsSearch, 1000)
    //

    const checkParamsForQuery = (params: any) => {
        const nameParams = Object.keys(params);
        let resultSearchParams:ParamsType = {
            cardsPack_id:''
        };
        nameParams.forEach(name => {
            if (params[name]) {
                resultSearchParams = {...resultSearchParams, [name]: params[name]}
            }
        })
        setSearchParams(resultSearchParams);
        return resultSearchParams
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
        checkParamsForQuery(getQueryParams(cardsPack_id))
    }, [])

    useEffect(() => {
        dispatch(updateParamsAC(getQueryParams(cardsPack_id)))
        dispatch(getCardsTC())
    }, [debouncedParamsSearch])

    return (
        <div className={s.container}>
            <div className={s.content}>
                <LinkArrow className={s.link} to={'/packs'} name={'Back to Packs List'}/>
                <div className={s.packName}>
                    <span>{cards.packName}</span>
                    {isMyCards
                        ? <button><img src={actions} alt='actions'/></button>
                        : null
                    }
                </div>
                <div className={s.searchBlock}>
                    <div className={s.searchItem}>
                        <InputSearch name={'Search question'}
                                     inputId={'search-question'}
                                     label={'Provide your question'}
                                     sx={{width: '100%', background: '#FFFFFF'}}
                                     value={paramsSearch.cardQuestion}
                                     onChange={addParamsQuestion}
                                     defaultValue={searchParams.get('cardQuestion')}
                        />
                    </div>
                    <div className={s.searchItem2}>
                        <InputSearch name={'Search answer'}
                                     inputId={'search-answer'}
                                     label={'Provide your answer'}
                                     sx={{width: '100%', background: '#FFFFFF'}}
                                     value={paramsSearch.cardAnswer}
                                     onChange={addParamsAnswer}
                                     defaultValue={searchParams.get('cardAnswer')}
                        />
                    </div>
                </div>
                {cards.cards.length
                    ? <div className={s.blockTable}>
                        {isMyCards ?
                            <button onClick={addNewCards} className={s.addCard}>Add new card</button> : null
                        }
                        <BasicTable
                            addParamsGrade={addParamsGrade}
                            grade={gradeSearch}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            stateItems={cards}
                        >
                            <MapTableBody items={cards.cards} deleteItem={deleteCard} isMy={isMyCards}/>
                        </BasicTable>
                    </div>
                    : <EmptyPage addNewItem={addNewCards} isMy={isMyCards} name={'Add new card'}/>
                }
            </div>
        </div>
    )
}

export default Cards
