import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import "../../assets/style/mixins.scss";
import {
    addNewPackTC,
    deletePacksTC,
    getUsersPacksTC,
    updatePacksPageCountPaginate,
    updatePacksPagePaginateAC,
    updatePacksParamsAC
} from "../../bll/packsReducer";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ParamsGetPacksType} from "../../api/packs/packs-api";
import {useDebounce} from "../../assets/hooks/debounceHook";
import s from "../cards/Crads.module.scss";
import {LinkArrow} from "../../common/components/Link/LinkArrow";
import {EmptyPage} from "../emptyPage/EmptyPage";
import {PacksTableContainer} from "./PacksTableContainer";
import {PacksTableBody} from "./TableBody/PacksTableBody";
import {SearchBlock} from "./SearchBlock/SearchBlock";
import {AddPackModal} from "./PackModal/addPackModal/AddPackModal";
import stylePacks from "./Packs.module.scss";
import {ModalWindow} from "../../common/components/modalWindows/ModalWindow";
import {getAllCards, setCurrentPackName, updateGrade, updateParamsAC} from "../../bll/learnReducer";

export type PackPropsType = {}
export const Packs: React.FC<PackPropsType> = (props) => {

    const packId = "633069736caad3673917ba5f"
    const packs = useAppSelector(state => state.packs)
    const userID = useAppSelector(state => state.profile.user?._id)
    const dispatch = useAppDispatch

    //hooks
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState(false)
    const [paramsSearch, setParamsSearch] = useState<ParamsGetPacksType>({
        packs_Id: packId,
        packName: "",
        user_id: "",
        page: "1",
        pageCount: "10",
        min: "",
        max: "",
        sortPacks: "",
    })
    const navigate = useNavigate()
    const debouncedParamsSearch = useDebounce<ParamsGetPacksType>(paramsSearch, 700)
    useEffect(() => {
        dispatch(updatePacksParamsAC(getPackQueryParams(packId)))
        dispatch(getUsersPacksTC())
    }, [debouncedParamsSearch])

    const [titlePack, setTitlePack] = useState<string>("")
    const [privatePack, setPrivatePack] = useState<boolean>(false)

    const checkParamsForQuery = (params: any) => {
        const nameParams = Object.keys(params);
        let resultSearchParams = {};
        nameParams.forEach(name => {
            if (params[name]) {
                console.log(params[name])
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
    const addParamsUserId = (filter: 'my' | 'all') => {
        setParamsSearch({
            ...paramsSearch,
            user_id: filter === 'my' ? userID : ''
        })
        checkParamsForQuery({...paramsSearch, "user_id": filter === 'my' ? userID : ''});
    }
    const addParamsOfSorting = () => {
        setSort(!sort)
        if (!sort) {
            setParamsSearch({...paramsSearch, sortPacks: '1created'})
            checkParamsForQuery({...paramsSearch, sortPacks: '1created'})
        } else {
            setParamsSearch({...paramsSearch, sortPacks: '0created'})
            checkParamsForQuery({...paramsSearch, sortPacks: '0created'})
        }
    }
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

        dispatch(updatePacksPageCountPaginate(pageCount))
    };

    const addNewPacks = () => {
        userID && dispatch(addNewPackTC(userID!, titlePack, privatePack))
        setTitlePack("")
    }
    const deletePack = (userId: string) => {
        dispatch(deletePacksTC(userId))
    }
    const learnPack = (cardsPack_id: string, packName: string) => {
        dispatch(setCurrentPackName(packName))
        navigate(`/learn/${cardsPack_id}`)
    }

    const getPackQueryParams = (packId: string) => {
        const params: any = {
            packs_Id: packId,
            packName: "",
            user_id: "",
            page: "1",
            pageCount: "10",
            min: "",
            max: "",
            sortPacks: "0updated",
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
                <LinkArrow className={s.link} to={'/profile'} name={'Back to Profile'}/>
                <SearchBlock
                    paramsSearch={paramsSearch}
                    user_id={getPackQueryParams(packId).user_id}
                    addParamsName={addParamsName}
                    addParamsUserId={addParamsUserId}
                />
                {packs.cardPacks.length
                    ? <div>
                        <ModalWindow styleButton={stylePacks.btnPack} nameButton={"Add new pack"}
                                     title={"Add new pack"} stylePackHandler={addNewPacks} nameButtonAction={"Save"}
                                     nameButtonCancel={"Cancel"} typeAction={"save"}>
                            <AddPackModal titlePack={titlePack} setState={setTitlePack}
                                          setPrivatePack={setPrivatePack}/>
                        </ModalWindow>
                        <PacksTableContainer
                            sorting={sort}
                            addParamsUpdate={addParamsOfSorting}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            statePacks={packs}
                        >
                            <PacksTableBody
                                deletePack={deletePack}
                                learnPack={learnPack}
                                updatePack={() => {}}
                                items={packs.cardPacks}/>
                        </PacksTableContainer>
                    </div>
                    : <EmptyPage addNewItem={addNewPacks} isMy={true} name={'Add new pack'}/>
                }
            </div>
        </div>
    )
}