import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './Crads.module.scss'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getCardsTC, updatePageCountPaginateAC, updatePagePaginateAC, updateParamsAC} from "../../bll/cardsReducer";
import {useLocation, useSearchParams} from 'react-router-dom'
import {BasicTable} from "./table/CardsTable";
import {useDebounce} from "../../assets/hooks/debounceHook";
import {TableBodyCart} from "./table/TableBody";
import {EmptyPage} from "../emptyPage/EmptyPage";
import {LinkArrow} from "../../common/components/Link/LinkArrow";
import {InputSearch} from "../../common/components/inputSearchDouble/InputSearch";
import actions from '../../assets/image/actions.svg'
import AddCartModal from "./cardModals/addCardModal/AddCartModal";
import {checkParamsForQuery, getQueryParams} from '../../assets/utils/workingWithParameters'


export type ParamsType = {
    cardAnswer?: string  // не обязательно
    cardQuestion?: string // не обязательно
    cardsPack_id?: string //обязательно!!!
    min?: string   // не обязательно
    max?: string  // не обязательно
    sortCards?: string // не обязательно
    page?: string  // не обязательно
    pageCount?: string // не обязательно
}

function Cards() {
    let id = useLocation().pathname.slice(7)
    const dispatch = useAppDispatch
    const userID = useAppSelector(state => state.profile.user?._id)
    const cards = useAppSelector(state => state.cards)
    const appStatus = useAppSelector(state => state.app.status)
    const updateStatusApp = appStatus === 'loading'
    const isMyCards = cards.packUserId === userID
    const paramsPack = useAppSelector(state => state.packs.params)
    let queryParamsPacks = new URLSearchParams(paramsPack).toString()

    // URLSearchParams
    const [searchParams, setSearchParams] = useSearchParams();
    const [gradeSearch, setGradeSearch] = useState(false)
    const [paramsSearch, setParamsSearch] = useState<ParamsType>({})
    //

    //functions working to query params
    const updateParamsBackPackLink = (id?: string) => {
        dispatch(updateParamsAC({cardQuestion: '', cardAnswer: '', cardsPack_id: id || ''}))
    }

    // functions add filter
    const addParamsQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setParamsSearch({
            ...paramsSearch,
            cardQuestion: e.currentTarget.value
        })
        checkParamsForQuery({
            ...getQueryParams(searchParams, id),
            "cardQuestion": e.currentTarget.value
        }, setSearchParams);
    }

    const addParamsAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setParamsSearch({
            ...paramsSearch,
            cardAnswer: e.currentTarget.value
        })
        checkParamsForQuery({...getQueryParams(searchParams, id), "cardAnswer": e.currentTarget.value}, setSearchParams)

    }

    const addParamsGrade = () => {
        setGradeSearch(!gradeSearch)
        if (!gradeSearch) {
            setParamsSearch({...paramsSearch, sortCards: '1grade'})
            checkParamsForQuery({...getQueryParams(searchParams, id), sortCards: '1grade'}, setSearchParams)
        } else {
            setParamsSearch({...paramsSearch, sortCards: '0grade'})
            checkParamsForQuery({...getQueryParams(searchParams, id), sortCards: '0grade'}, setSearchParams)
        }
    }
    //

    // functions paginate
    const handleChangePage = (event: unknown, newPage: number) => {
        const page = newPage + 1
        const actualPage = page.toString()

        checkParamsForQuery({...getQueryParams(searchParams, id), page: actualPage}, setSearchParams)
        setParamsSearch({...paramsSearch, page: page.toString()})

        dispatch(updatePagePaginateAC(page))
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(event.target.value, 10)
        const pageCount = count.toString()

        checkParamsForQuery({...getQueryParams(searchParams, id), pageCount}, setSearchParams)
        setParamsSearch({...paramsSearch, pageCount: pageCount.toString()})

        dispatch(updatePageCountPaginateAC(count))
    };
    //


    const debouncedParamsSearch = useDebounce<ParamsType>(paramsSearch, 1000)

    useEffect(() => {
        checkParamsForQuery(getQueryParams(searchParams, id), setSearchParams)
    }, [])

    useEffect(() => {
        updateParamsBackPackLink()
        dispatch(updateParamsAC(getQueryParams(searchParams, id)))
        dispatch(getCardsTC())
    }, [debouncedParamsSearch])

    return (
        <div className={s.container}>
            <div className={s.content}>
                <LinkArrow className={s.link} to={`/packs?${queryParamsPacks}`} name={'Back to Packs List'}
                           callback={updateParamsBackPackLink}/>
                <div className={s.packName}>
                    <span>{cards.packName}</span>
                    {isMyCards
                        ? <button disabled={updateStatusApp} style={updateStatusApp ? {opacity: '0.5'} : {}}><img
                            src={actions} alt='actions'/></button>
                        : null
                    }
                </div>
                <div className={s.searchBlock}>
                    <div className={s.searchItem}>
                        <InputSearch name={'Search question'}
                                     inputId={'search-question'}
                                     label={'Provide your question'}
                                     sx={{width: '100%', background: '#FFFFFF'}}
                                     value={searchParams.get('cardQuestion') || ''}
                                     onChange={addParamsQuestion}
                        />
                    </div>
                    <div className={s.searchItem2}>
                        <InputSearch name={'Search answer'}
                                     inputId={'search-answer'}
                                     label={'Provide your answer'}
                                     sx={{width: '100%', background: '#FFFFFF'}}
                                     value={searchParams.get('cardAnswer') || ''}
                                     onChange={addParamsAnswer}
                        />
                    </div>
                </div>
                {cards.cards.length
                    ? <div className={s.blockTable}>
                        {isMyCards
                            ? <AddCartModal addEditModal={'add'}/>
                            : null
                        }
                        <BasicTable
                            addParamsGrade={addParamsGrade}
                            grade={gradeSearch}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            stateItems={cards}
                            disabledPaginate={updateStatusApp}
                        >
                            <TableBodyCart items={cards.cards} isMy={isMyCards}/>
                        </BasicTable>
                    </div>
                    : <EmptyPage isMy={isMyCards} name={'Add new card'} packCard={'cards'}/>
                }
            </div>
        </div>
    )
}

export default Cards
