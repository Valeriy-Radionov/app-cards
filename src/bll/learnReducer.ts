import {cardsApi, CardType, UpdateGradeRequestType} from "../api/cards/cards-api";
import {AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/errors-utils";
import {setAppStatusAC} from "./appReducer";
import {ParamsType} from "../components/cards/Cards";
import {getCard} from "../utils/randomGetCard";

enum LEARN_ACTIONS {
    GET_ALL_CARDS = 'LEARN_ACTIONS/GET_ALL_CARDS',
    UPDATE_GRADE = 'LEARN_ACTIONS/UPDATE_GRADE',
    UPDATE_PARAMS = 'LEARN_ACTIONS/UPDATE_PARAMS',
    CHANGE_CURRENT_CARD = 'LEARN_ACTIONS/CHANGE_CURRENT_CARD',
    TOGGLE_IS_INITIALIZED_PAGE = 'LEARN_ACTIONS/TOGGLE_IS_INITIALIZED_PAGE'
}

const initialState = {
    cards: [] as Array<CardType>,
    params: {
        cardsPack_id: ''
    },
    currentCard: null as CardType | null,
    isInitializedPage: false
}

export const learnReducer = (state: LearnStateType = initialState, action: LearnActionType): LearnStateType => {
    switch (action.type) {
        case LEARN_ACTIONS.GET_ALL_CARDS:
            return {...state, cards: action.cards}
        case LEARN_ACTIONS.UPDATE_GRADE: {
            return {
                ...state,
                cards: state.cards.map(el => el._id === action.payload.card_id
                    ? {...el, ...action.payload}
                    : el)
            }
        }
        case LEARN_ACTIONS.UPDATE_PARAMS:
            return {...state, params: {...state.params, ...action.params}}
        case LEARN_ACTIONS.CHANGE_CURRENT_CARD:
            return {...state, currentCard: action.newCard}
        case LEARN_ACTIONS.TOGGLE_IS_INITIALIZED_PAGE:
            return {...state, isInitializedPage: action.value}
        default:
            return state
    }
}
//AC's
export const setAllCardsAC = (cards: Array<CardType>) =>
    ({type: LEARN_ACTIONS.GET_ALL_CARDS, cards} as const)
export const updateCardAC = (grade: number | string, shots: string | number, card_id: string) =>
    ({type: LEARN_ACTIONS.UPDATE_GRADE, payload: {grade, shots, card_id}} as const)
export const updateParamsAC = (params: ParamsType) =>
    ({type: LEARN_ACTIONS.UPDATE_PARAMS, params} as const)
export const changeCurrentCardAC = (newCard: CardType) =>
    ({type: LEARN_ACTIONS.CHANGE_CURRENT_CARD, newCard} as const)
export const toggleIsInitializedPageAC = (value: boolean) =>
    ({type: LEARN_ACTIONS.TOGGLE_IS_INITIALIZED_PAGE, value} as const)


//TC's
export const getAllCards = (): AppThunk => async (dispatch, getState) => {
    const {params} = getState().learn
    dispatch(setAppStatusAC("loading"))
    dispatch(toggleIsInitializedPageAC(false))
    try {
        const res = await cardsApi.getCards({...params})
        console.log(res.data.cards)
        dispatch(setAllCardsAC(res.data.cards))
        dispatch(changeCurrentCardAC(getCard(res.data.cards)))
        dispatch(setAppStatusAC("succeeded"))
        dispatch(toggleIsInitializedPageAC(true))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}
export const updateGrade = (updateGradeRequestData: UpdateGradeRequestType): AppThunk => dispatch => {
    cardsApi.updateGrade(updateGradeRequestData)
        .then(res => {
            dispatch(updateCardAC(res.grade, res.shots, res.card_id))
        })
        .catch(e => handleServerNetworkError(e, dispatch))
}

//types
export type LearnStateType = typeof initialState
export type LearnActionType =
    | ReturnType<typeof setAllCardsAC>
    | ReturnType<typeof updateCardAC>
    | ReturnType<typeof updateParamsAC>
    | ReturnType<typeof changeCurrentCardAC>
    | ReturnType<typeof toggleIsInitializedPageAC>