import {AppThunk} from "./store";
import {cardsApi, CardType, PostCardType, ResponseCardsType} from "../api/cards/cards-api";
import {handleServerNetworkError} from "../utils/errors-utils";
import {ParamsType} from "../components/cards/Cards";
import {RequestStatusType, setAppStatusAC} from "./appReducer";

const initialState: CardsType = {
    cards: [
        {
            _id: "632f99bcef99210257c3d010",
            cardsPack_id: "632f9975ef99210257c3d00f",
            user_id: "63272e99d38dbc8a0103935d",
            answer: "no answer",
            question: "no question",
            grade: 0,
            shots: 0,
            questionImg: "url or base 64",
            answerImg: "url or base 64",
            answerVideo: "url or base 64",
            questionVideo: "url or base 64",
            comments: "",
            type: "card",
            rating: 0,
            more_id: "63272e99d38dbc8a0103935d",
            created: "2022-09-24T23:58:52.218Z",
            updated: "2022-09-24T23:58:52.218Z",
            __v: 0,
            entityStatusCard: "idle"
        }
    ],
    params: {
        cardsPack_id: ''
    },
    packUserId: "63272e99d38dbc8a0103935d",
    packName: "no Name",
    packPrivate: false,
    packDeckCover: "url or base64",
    packCreated: "2022-09-24T23:57:41.264Z",
    packUpdated: "2022-09-25T00:19:51.341Z",
    page: '1',
    pageCount: '4',
    cardsTotalCount: '2',
    minGrade: '0',
    maxGrade: '6',
    token: "cbc791d0-3ce3-11ed-a20f-91911aef6e0d",
    tokenDeathTime: '1664723259245'
}
export type FullCardType = CardType & {
    entityStatusCard: RequestStatusType
}

export type CardsType = {
    cards: FullCardType[]
    params: ParamsType
    packUserId: string
    packName: string
    packPrivate: boolean
    packDeckCover: string
    packCreated: string
    packUpdated: string
    page: string
    pageCount: string
    cardsTotalCount: string
    minGrade: string
    maxGrade: string
    token: string
    tokenDeathTime: string
}

export const cardReducer = (state: CardsType = initialState, action: CardsActionsType): CardsType => {
    switch (action.type) {
        case "CARDS/GET_CARDS": {
            return {
                ...state,
                ...action.payload.cards,
                cards: action.payload.cards.cards.map(card => ({...card, entityStatusCard: "idle"}))
            }
        }
        case "CARDS/UPDATE_PARAMS": {
            return {
                ...state,
                params: {
                    ...state.params,
                    ...action.payload.params
                }
            }
        }
        case "CARDS/UPDATE_PAGE_PAGINATE": {
            const page = action.payload.page.toString()
            return {
                ...state,
                params: {
                    ...state.params,
                    page
                }
            }
        }
        case "CARDS/UPDATE_PAGE_COUNT_PAGINATE": {
            const pageCount = action.payload.count.toString()
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

// Types
export type CardsActionsType = getCardsACType
    | updateParamsACType
    | updatePagePaginateACType
    | updatePageCountPaginateACType
type getCardsACType = ReturnType<typeof getCardsAC>
type updateParamsACType = ReturnType<typeof updateParamsAC>
type updatePagePaginateACType = ReturnType<typeof updatePagePaginateAC>
type updatePageCountPaginateACType = ReturnType<typeof updatePageCountPaginateAC>

// ACs
export const getCardsAC = (cards: ResponseCardsType) => {
    return {
        type: 'CARDS/GET_CARDS',
        payload: {
            cards
        }
    } as const
}
export const updateParamsAC = (params: ParamsType) => {
    return {
        type: 'CARDS/UPDATE_PARAMS',
        payload: {
            params
        }
    } as const
}
export const updatePagePaginateAC = (page: number) => {
    return {
        type: 'CARDS/UPDATE_PAGE_PAGINATE',
        payload: {
            page
        }
    } as const
}
export const updatePageCountPaginateAC = (count: number) => {
    return {
        type: 'CARDS/UPDATE_PAGE_COUNT_PAGINATE',
        payload: {
            count
        }
    } as const
}


// TCs
export const getCardsTC = (): AppThunk => async (dispatch, getState) => {
    const {params} = getState().cards
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await cardsApi.getCards({...params})
        dispatch(getCardsAC(res.data))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
    finally {
        dispatch(setAppStatusAC("idle"))
    }
}
export const deleteCardsTC = (cardId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await cardsApi.deleteCard(cardId)
        dispatch(getCardsTC())
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
    finally {
        dispatch(setAppStatusAC("idle"))
    }
}
export const addNewCardTC = (id: string): AppThunk => async (dispatch) => {
    const card: PostCardType = {
        cardsPack_id: id,
        question: "map",
        answer: "no answer",
        grade: '0',
        shots: '0',
        answerImg: "url or base 64",
        questionImg: "url or base 64",
        questionVideo: "url or base 64",
        answerVideo: "url or base 64"

    }
    dispatch(setAppStatusAC("loading"))
    try {
        await cardsApi.addNewCard(card)
        dispatch(getCardsTC())
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
    finally {
        dispatch(setAppStatusAC("idle"))
    }
}