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
        user_name: "Valera Radionov",
        private: false,
        name: "UUUUUUUUUUU",
        path: "/def",
        grade: 0,
        shots: 0,
        cardsCount: 0,
        type: "packs",
        rating: 0,
        created: new Date("2022-09-25T14:48:26.990Z"),
        updated: new Date("2022-09-25T15:16:57.523Z"),
        more_id: "632502cb94b7970fb4f08698",
        __v: 0,
        deckCover: ""
    }],
    params: {
        user_id: "",
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
        // не пишите чужие экшены к себе в reducer они срабатывают и генерят ошибку, сразу меняйте имя!!!!!
        // case "CARDS/UPDATE_PAGE_COUNT_PAGINATE": {
        //     const pageCount = action.count.toString()
        //     return {
        //         ...state,
        //         params: {
        //             ...state.params,
        //             pageCount
        //         }
        //     }
        // }
        default:
            return state
    }
}

export type PacksActionType = setPacksACType | updateParamsPacksAC
    | updatePacksPagePaginateACType | updatePacksPageCountPaginateType
//actions
type setPacksACType = ReturnType<typeof setUsersPacksAC>
export const setUsersPacksAC = (userPacks: ResponsePacksType) => ({
    type: GET_USERS_PACKS,
    userPacks
} as const)

type updateParamsPacksAC = ReturnType<typeof updateParamsAC>
export const updateParamsAC = (params: ParamsGetPacksType) => ({
    type: UPDATE_PACKS_PARAMS,
    params
} as const)

type updatePacksPagePaginateACType = ReturnType<typeof updatePacksPagePaginateAC>
export const updatePacksPagePaginateAC = (page: number) => ({
    type: UPDATE_PACKS_PAGE_PAGINATE,
    page
} as const)

type updatePacksPageCountPaginateType = ReturnType<typeof updatePacksPageCountPaginate>
export const updatePacksPageCountPaginate = (count: number) => ({
    type: 'CARDS/UPDATE_PAGE_COUNT_PAGINATE',
    count
} as const)
//thunks
export const setUsersPacksTC = (userId: string): AppThunk => {
    return async (dispatch, getState) => {
        const {params} = getState().packs
        dispatch(setAppStatusAC("loading"))
        try {
            const response = await packsApi.getPacks({...params, user_id: userId})
            dispatch(setUsersPacksAC(response.data))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export const deletePacksTC = (packId: string): AppThunk => {
    return async (dispatch, getState) => {
        const {user_id} = getState().packs.params
        dispatch(setAppStatusAC("loading"))
        try {
            const response = await packsApi.deletePack(packId)
            user_id && dispatch(setUsersPacksTC(user_id))
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
        dispatch(setUsersPacksTC(userId))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}