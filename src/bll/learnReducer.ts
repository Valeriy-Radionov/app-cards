import {cardsApi, CardType, UpdateGradeRequestType} from "../api/cards/cards-api";
import {AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/errors-utils";
import {setAppStatusAC} from "./appReducer";
import {ParamsType} from "../components/cards/Cards";

enum LEARN_ACTIONS {
    GET_ALL_CARDS = 'LEARN_ACTIONS/GET_ALL_CARDS',
    UPDATE_GRADE = 'LEARN_ACTIONS/UPDATE_GRADE',
    UPDATE_PARAMS = 'LEARNS_ACTIONS/UPDATE_PARAMS'
}

const initialState = {
    cards: [] as Array<CardType>,
    params: {
        cardsPack_id: ''
    },
}


export const learnReducer = (state: LearnStateType = initialState, action: LearnActionType): LearnStateType => {
    switch (action.type) {
        case LEARN_ACTIONS.GET_ALL_CARDS:
            return {...state, cards: action.cards}
        case LEARN_ACTIONS.UPDATE_GRADE: {
            return {
                ...state,
                cards: state.cards.map(el => el._id === action.card_id ? {...el, grade: action.grade} : el)
            }
        }
        case LEARN_ACTIONS.UPDATE_PARAMS:
            return {...state, params: {...state.params, ...action.params}}
        default:
            return state
    }
}
//AC's
export const setAllCardsAC = (cards: Array<CardType>) =>
    ({type: LEARN_ACTIONS.GET_ALL_CARDS, cards} as const)
export const updateGradeAC = (grade: string | number, card_id: string) =>
    ({type: LEARN_ACTIONS.UPDATE_GRADE, grade, card_id} as const)
export const updateParamsAC = (params: ParamsType) =>
    ({type: LEARN_ACTIONS.UPDATE_PARAMS, params} as const)

//TC's
export const getAllCards = (): AppThunk => async (dispatch, getState) => {
    const {params} = getState().learn
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await cardsApi.getCards({...params})
        dispatch(setAllCardsAC(res.data.cards))
        dispatch(setAppStatusAC("succeeded"))
        console.log(res.data.cards)
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
            console.log(res)
            dispatch(updateGradeAC(res.data.grade, res.data.card_id))
        })
        .catch(e => handleServerNetworkError(e, dispatch))
}

//types
export type LearnStateType = typeof initialState
export type LearnActionType =
    | ReturnType<typeof setAllCardsAC>
    | ReturnType<typeof updateGradeAC>
    | ReturnType<typeof updateParamsAC>