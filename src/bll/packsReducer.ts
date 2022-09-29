import {CardPackType, packsApi, ParamsGetPacksType, PostPackDataType, ResponsePacksType} from "../api/packs/packs-api";
import {AppThunk} from "./store";
import {setAppStatusAC} from "./appReducer";
import {handleServerNetworkError} from "../utils/errors-utils";

const GET_USERS_PACKS = "PACKS/GET_USERS_PACKS"
const UPDATE_PACKS_PARAMS = "PACKS/UPDATE_PACKS_PARAMS"
const UPDATE_PACKS_PAGE_PAGINATE = "PACKS/UPDATE_PACKS_PAGE_PAGINATE"
const UPDATE_PACKS_PAGE_COUNT_PAGINATE = "PACKS/UPDATE_PACKS_PAGE_COUNT_PAGINATE"
export type PacksType = {
    cardPacks: CardPackType[]
    params: ParamsGetPacksType
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
}
const initialState: PacksType = {
    cardPacks: [{
        _id: "63306a3a6caad3673917ba62",
        user_id: "632502cb94b7970fb4f08698",
        user_name: "Loading",
        private: false,
        name: "Loading",
        path: "/def",
        grade: 0,
        shots: 0,
        cardsCount: 0,
        type: "packs",
        rating: 0,
        created: new Date(""),
        updated: new Date(""),
        more_id: "632502cb94b7970fb4f08698",
        __v: 0,
        deckCover: ""
    }],
    params: {
        user_id: "",
        packName: "",
        packs_Id: "",
        page: "1",
        pageCount: "10",
        min: "0",
        max: "0",
        sortPacks: "",
        block: false
    },
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 4,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: "b78479d0-3f41-11ed-b364-85da2b8d0dd3",
    tokenDeathTime: 1664389500269
}

export const packsReducer = (state = initialState, action: PacksActionType): PacksType => {
    switch (action.type) {
        case "PACKS/GET_USERS_PACKS": {
            return {...state, ...action.userPacks}
        }
        case "PACKS/UPDATE_PACKS_PARAMS": {
            return {...state, params: {...state.params, ...action.params}}
        }
        case "PACKS/UPDATE_PACKS_PAGE_PAGINATE": {
            const page = action.page.toString()
            return {...state, params: {...state.params, page}}
        }
        case "PACKS/UPDATE_PACKS_PAGE_COUNT_PAGINATE": {
            const pageCount = action.count.toString()
            return {
                ...state,
                params: {
                    ...state.params,
                    pageCount
                }
            }
        }
        default:
            return state
    }
}

export type PacksActionType = setPacksACType | updateParamsPacksAC
    | updatePacksPagePaginateACType | updatePacksPageCountPaginateType

type setPacksACType = ReturnType<typeof setUsersPacksAC>
type updateParamsPacksAC = ReturnType<typeof updatePacksParamsAC>
type updatePacksPagePaginateACType = ReturnType<typeof updatePacksPagePaginateAC>
type updatePacksPageCountPaginateType = ReturnType<typeof updatePacksPageCountPaginate>

//actions
export const setUsersPacksAC = (userPacks: ResponsePacksType) => ({
    type: GET_USERS_PACKS,
    userPacks
} as const)

export const updatePacksParamsAC = (params: ParamsGetPacksType) => {
    return {
        type: UPDATE_PACKS_PARAMS,
        params
    } as const
}

export const updatePacksPagePaginateAC = (page: number) => ({
    type: UPDATE_PACKS_PAGE_PAGINATE,
    page
} as const)

export const updatePacksPageCountPaginate = (count: number) => ({
    type: UPDATE_PACKS_PAGE_COUNT_PAGINATE,
    count
} as const)

//thunks
export const getUsersPacksTC = (userId?: string): AppThunk => {
    return async (dispatch, getState) => {
        const {params} = getState().packs
        dispatch(setAppStatusAC("loading"))
        try {
            const response = await packsApi.getPacks({...params})
            dispatch(setUsersPacksAC(response.data))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export const deletePacksTC = (userId: string): AppThunk => {
    return async (dispatch, getState) => {
        const {packs_Id} = getState().packs.params
        dispatch(setAppStatusAC("loading"))
        try {
            const response = await packsApi.deletePack(userId)
            dispatch(getUsersPacksTC(packs_Id))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export const addNewPackTC = (userId: string): AppThunk => async (dispatch) => {
    const pack: PostPackDataType = {
        name: "NEW PACKS CREATED",
        private: false
    }
    dispatch(setAppStatusAC("loading"))
    try {
        await packsApi.addPack(pack)
        dispatch(getUsersPacksTC(userId))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}