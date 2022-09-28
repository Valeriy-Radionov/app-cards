import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {addNewPackTC, deletePacksTC, setUsersPacksTC, updatePacksPagePaginateAC} from "../../bll/packsReducer";
import {useSearchParams} from "react-router-dom";
import {ParamsGetPacksType} from "../../api/packs/packs-api";
import {useDebounce} from "../../common/hooks/debounceHook";
import {updatePageCountPaginateAC, updateParamsAC} from "../../bll/cardsReducer";
import s from "../cards/Crads.module.scss";
import {LinkArrow} from "../../common/Link/LinkArrow";
import {EmptyCards} from "../cards/EmptyCards";
import {PacksTableContainer} from "./PacksTableContainer";
import {PacksTableBody} from "./TableBody/PacksTableBody";

export type PackPropsType = {}
export const Packs: React.FC<PackPropsType> = (props) => {
    const packId = "633069736caad3673917ba5f"
    const packs = useAppSelector(state => state.packs)
    const userID = useAppSelector(state => state.profile.user?._id)
    // const packUserId = useAppSelector(state => state.packs.cardPacks._id)
    const dispatch = useAppDispatch
    //hooks
    const [searchParams, setSearchParams] = useSearchParams();
    // const [gradeSearch, setGradeSearch] = useState(false)
    const [paramsSearch, setParamsSearch] = useState<ParamsGetPacksType>({
        packs_Id: packId,
        packName: "",
        user_id: "",
        page: "1",
        pageCount: "10",
        min: "string",
        max: "string",
        sortPacks: "string",
    })
    const debouncedParamsSearch = useDebounce<ParamsGetPacksType>(paramsSearch, 1000)

    useEffect(() => {
        dispatch(updateParamsAC(getPackQueryParams(packId)))
        userID && dispatch(setUsersPacksTC(userID))
    }, [debouncedParamsSearch])

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
    // functions filter
    const addParamsName = (e: ChangeEvent<HTMLInputElement>) => {
        setParamsSearch({
            ...paramsSearch,
            packName: e.currentTarget.value
        })
        checkParamsForQuery({...paramsSearch, "packName": e.currentTarget.value});
    }

    // const addParamsGrade = () => {
    //     setGradeSearch(!gradeSearch)
    //     if (!gradeSearch) {
    //         setParamsSearch({...paramsSearch, sortPacks: '1grade'})
    //         checkParamsForQuery({...paramsSearch, sortPacks: '1grade'})
    //     } else {
    //         setParamsSearch({...paramsSearch, sortPacks: '0grade'})
    //         checkParamsForQuery({...paramsSearch, sortPacks: '0grade'})
    //     }
    // }

    // functions paginate
    const handleChangePage = (event: unknown, newPage: number) => {
        const page = newPage + 1

        checkParamsForQuery({...paramsSearch, page})
        setParamsSearch({...paramsSearch, page: page.toString()})

        dispatch(updatePacksPagePaginateAC(page))
    }
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pageCount = parseInt(event.target.value, 10)

        checkParamsForQuery({...paramsSearch, pageCount: pageCount})
        setParamsSearch({...paramsSearch, pageCount: pageCount.toString()})

        dispatch(updatePageCountPaginateAC(pageCount))
    };

    const addNewPacks = () => {
        userID && dispatch(addNewPackTC(userID))
    }
    const deletePack = (packId: string) => {
        dispatch(deletePacksTC(packId))
    }

    const getPackQueryParams = (packId: string) => {
        const params: any = {
            packs_Id: packId,
            packName: "",
            user_id: "",
            page: "1",
            pageCount: "10",
            min: "string",
            max: "string",
            sortPacks: "string",
        }

        searchParams.forEach((value, key) => {
            if (key) {
                params[key] = value
            }
        })
        return params
    }
    return (
        <div className={s.container}>
            <div className={s.content}>
                <LinkArrow className={s.link} to={'/profile'} name={'Back to Packs List'}/>
                <div>
                    <input value={paramsSearch.packName}
                           onChange={addParamsName}/>

                </div>
                {packs.cardPacks.length
                    ? <div>
                        {userID ? <button onClick={addNewPacks}>add new card</button> : null}
                        <PacksTableContainer
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            statePacks={packs}
                        >
                            <PacksTableBody items={packs.cardPacks} deleteItem={deletePack} isWho={'packs'}/>
                        </PacksTableContainer>
                    </div>
                    : <EmptyCards/>
                }
            </div>
        </div>
    )
}