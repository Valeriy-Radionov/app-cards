import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const cardsApi = {
    getCards(params: ParamsGetCardsType) {
        return instance.get<ResponseCardsType>('/cards/card', {
            params
        })
    },
    addNewCard(card: PostCardType) {
        return instance.post<PostCardType, AxiosResponse<any>>('/cards/card', {
            card
        })
    },
    deleteCard(id: string) {
        return instance.delete<AxiosResponse>(`/cards/card?id=${id}`)
    },
    updateCard(card: PostCardType) {
        return instance.put<PostCardType, AxiosResponse>(`/cards/card`, {
            card
        })
    },
    updateGrade(updateGradeRequestData: UpdateGradeRequestType) {
        return instance.put<UpdateGradeRequestType, AxiosResponse<UpdateGradeResponseDataType>>(`/cards/grade`, updateGradeRequestData)
            .then(res => res.data.updatedGrade)
    }
}

export type ParamsGetCardsType = {
    cardAnswer?: string  // не обязательно
    cardQuestion?: string // не обязательно
    cardsPack_id: string //обязательно!!!
    min?: string   // не обязательно
    max?: string // не обязательно
    sortCards?: string // не обязательно
    page?: string  // не обязательно
    pageCount?: string// не обязательно
}

export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: string | number
    shots: string | number
    comments: string
    type: string
    rating: string | number
    more_id: string
    created: string
    updated: string
    __v: string | number
    questionImg: string
    answerImg: string
    answerVideo: string
    questionVideo: string
}

export type ResponseCardsType = {
    cards: CardType[]
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

export type PostCardType = {
    cardsPack_id?: string
    question?: string// если не отправить будет таким
    answer?: string // если не отправить будет таким
    grade?: string  // 0..5, не обязателен
    shots?: string // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
}
export type UpdateCardType = {
    _id: string
    question?: string
    answer?: string
    grade?: string
    shots?: string
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdateGradeRequestType = {
    grade: Grades | string
    card_id: string | null
}
export type UpdateGradeResponseDataType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: string | number
        shots: string | number
    }
}

export enum Grades {
    DidNotKnow = 1,
    Forgot = 2,
    ALotOfThought = 3,
    Confused = 4,
    KnewTheAnswer = 5
}