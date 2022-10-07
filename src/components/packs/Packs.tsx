import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getUsersPacksTC, updatePacksPageCountPaginate, updatePacksParamsAC} from "../../bll/packsReducer";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ParamsGetPacksType} from "../../api/packs/packs-api";
import {useDebounce} from "../../assets/hooks/debounceHook";
import s from "../cards/Crads.module.scss";
import {LinkArrow} from "../../common/components/Link/LinkArrow";
import {EmptyPage} from "../emptyPage/EmptyPage";
import {PacksTableContainer} from "./PacksTableContainer";
import {PacksTableBody} from "./TableBody/PacksTableBody";
import {SearchBlock} from "./SearchBlock/SearchBlock";
import {AddPackModal} from "./PackModal/addEditPackModal/AddPackModal";
import {checkParamsForQuery, getQueryParams} from '../../assets/utils/workingWithParameters';
import {updatePagePaginateAC} from "../../bll/cardsReducer";

export const Packs = () => {
    //data
    const packs = useAppSelector(state => state.packs)
    const userID = useAppSelector(state => state.profile.user?._id)
    const dispatch = useAppDispatch

    //hooks
    const [searchParams, setSearchParams] = useSearchParams()
    const [sort, setSort] = useState(false)
    const [paramsSearch, setParamsSearch] = useState<ParamsGetPacksType>({
        packName: "",
        user_id: "",
        page: "1",
        pageCount: "10",
        min: "",
        max: "",
        sortPacks: "",
    })
    // const [paramsSearchWithoutDebounce, setParamsSearchWithoutDebounce] = useState({user_id: ""})
    // const [firstRender, setFirstRender] = useState(true)


    const navigate = useNavigate()
    const debouncedParamsSearch = useDebounce<ParamsGetPacksType>(paramsSearch, 700)

    // functions search filter
    const addParamsName = (e: ChangeEvent<HTMLInputElement>) => {
        setParamsSearch({
            ...paramsSearch,
            packName: e.currentTarget.value
        })
        checkParamsForQuery({...getQueryParams(searchParams), "packName": e.currentTarget.value}, setSearchParams);
    }

    const addParamsUserId = (filter: 'my' | 'all') => {
        if (userID) {
            setParamsSearch({
                ...paramsSearch,
                user_id: filter === 'my' ? userID : ''
            })
            checkParamsForQuery({
                ...getQueryParams(searchParams),
                "user_id": filter === 'my' ? userID : ''
            }, setSearchParams);
        }
    }
    const addParamsMinMax = (min: string, max: string) => {
        setParamsSearch({
            ...paramsSearch,
            min,
            max
        })
        checkParamsForQuery({
            ...getQueryParams(searchParams),
            "min": min, "max": max
        }, setSearchParams)
    }
    const addParamsOfSorting = () => {
        setSort(!sort)
        if (!sort) {
            setParamsSearch({...paramsSearch, sortPacks: '1created'})
            checkParamsForQuery({...getQueryParams(searchParams), sortPacks: '1created'}, setSearchParams)
        } else {
            setParamsSearch({...paramsSearch, sortPacks: '0created'})
            checkParamsForQuery({...getQueryParams(searchParams), sortPacks: '0created'}, setSearchParams)
        }
    }

    // functions paginate
    const handleChangePage = (event: unknown, newPage: number) => {
        const page = newPage + 1
        const actualPage = page.toString()

        checkParamsForQuery({...getQueryParams(searchParams), page: actualPage}, setSearchParams)
        setParamsSearch({...paramsSearch, page: page.toString()})

        dispatch(updatePagePaginateAC(page))
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pageCount = parseInt(event.target.value, 10)
        const actualPageCount = pageCount.toString()
        checkParamsForQuery({...getQueryParams(searchParams), pageCount: actualPageCount}, setSearchParams)
        setParamsSearch({...paramsSearch, pageCount: pageCount.toString()})

        dispatch(updatePacksPageCountPaginate(pageCount))
    };

    const learnPack = (cardsPack_id: string) => {
        navigate(`/learn/${cardsPack_id}`)
    }

    useEffect(() => {
        checkParamsForQuery(getQueryParams(searchParams), setSearchParams)
    }, [])

    useEffect(() => {
        dispatch(updatePacksParamsAC(getQueryParams(searchParams)))
        dispatch(getUsersPacksTC())
    }, [debouncedParamsSearch])

    // useEffect(() => {
    //     if (firstRender) {
    //         setFirstRender(false)
    //     } else {
    //         dispatch(updatePacksParamsAC(getQueryParams(searchParams)))
    //         dispatch(getUsersPacksTC())
    //     }
    // }, [paramsSearchWithoutDebounce])

    return (
        <div className={s.container}>
            <div className={s.content}>
                <LinkArrow className={s.link} to={'/profile'} name={'Back to Profile'}/>
                <SearchBlock maxValue={packs.maxCardsCount} minValue={packs.minCardsCount}
                             paramsSearch={searchParams}
                             user_id={searchParams.get("user_id") || ""}
                             addParamsName={addParamsName}
                             addParamsUserId={addParamsUserId}
                             addParamsMinMax={addParamsMinMax}
                />
                {packs.cardPacks.length
                    ? <div>
                        <AddPackModal isAddEditPack={"add"}/>
                        <PacksTableContainer
                            sorting={sort}
                            addParamsUpdate={addParamsOfSorting}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            statePacks={packs}
                        >
                            <PacksTableBody learnPack={learnPack}
                                            updatePack={() => {
                                            }}
                                            items={packs.cardPacks}/>
                        </PacksTableContainer>
                    </div>
                    : <EmptyPage isMy={true} name={'Add new pack'} packCard={'packs'}/>
                }
            </div>
        </div>
    )
}