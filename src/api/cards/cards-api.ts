import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const cardsApi = {
    getCards(params: ParamsGetCardsType){
        return instance.get<ResponseCardsType<CardType[]>>('/cards/card', {
            params
        })
    },
    addNewCard(card: PostCardType){
        return instance.post<PostCardType, AxiosResponse<any>>('/cards/card', {
            card
        })
    },
    deleteCard(id: string){
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCard(card: PostCardType){
        return instance.put(`/cards/card`, {
            card
        })
    },
}

export type ParamsGetCardsType = {
    cardAnswer?: string  // не обязательно
    cardQuestion?: string // не обязательно
    cardsPack_id: string //обязательно!!!
    min?: string | number  // не обязательно
    max?: string | number // не обязательно
    sortCards?: string // не обязательно
    page?: string | number // не обязательно
    pageCount?: string | number// не обязательно
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
}

export type ResponseCardsType<D = []> = {
    cards: D
    "packUserId": string
    "packName": string
    "packPrivate": boolean
    "packDeckCover": string
    "packCreated": string
    "packUpdated": string
    "page": string | number
    "pageCount": string | number
    "cardsTotalCount": string | number
    "minGrade": string | number
    "maxGrade": string | number
    "token": string
    "tokenDeathTime": string | number
}

export type PostCardType = {
    card: {
        cardsPack_id: "5eb543f6bea3ad21480f1ee7"
        question?: "no question" // если не отправить будет таким
        answer?: "no answer" // если не отправить будет таким
        grade?: 0 // 0..5, не обязателен
        shots?: 0 // не обязателен
        answerImg?: "url or base 64" // не обязателен
        questionImg?: "url or base 64" // не обязателен
        questionVideo?: "url or base 64" // не обязателен
        answerVideo?: "url or base 64" // не обязателен
    }
}