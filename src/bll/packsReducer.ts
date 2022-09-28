import {CardPackType, packsApi, Users} from "../api/packs-api";
import {AppThunk} from "./store";
import {setAppStatusAC} from "./appReducer";
import {handleServerNetworkError} from "../utils/errors-utils";

const GET_USERS_PACKS = "PACKS/GET_USERS_PACKS"
const SORTING_PACK = "SORTING_PACK"

const initialState: Users = {
    cardPacks: [],
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 20,
    token: "",
    tokenDeathTime: 0
}

export const packsReducer = (state = initialState, action: PacksActionType): Users => {
    switch (action.type) {
        case "PACKS/GET_USERS_PACKS": {
            return {...state, cardPacks: action.userPacks}
        }
        case "SORTING_PACK": {
            return state
        }
        default:
            return state
    }
}

export type PacksActionType = setPacksACType | sortingPacksACType
//actions
type setPacksACType = ReturnType<typeof setUsersPacksAC>
export const setUsersPacksAC = (userPacks: CardPackType[]) => ({
    type: GET_USERS_PACKS,
    userPacks
} as const)

type sortingPacksACType = ReturnType<typeof sortingPacksAC>
export const sortingPacksAC = () => ({
    type: SORTING_PACK
} as const)

//thunks
export const setUsersPacksTC = (userId?: string): AppThunk => {
    return async (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        try {
            const response = await packsApi.getPacks(userId)
            dispatch(setUsersPacksAC(response.data.cardPacks))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export const sortingPacksTC = (): AppThunk => {
    return async (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        try {
            const response = await packsApi.sortBy()

            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }
}