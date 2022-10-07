import {instance} from "../auth/auth-api";
import {AxiosResponse} from "axios";

export const packsApi = {

    getPacks(params: ParamsGetPacksType) {
        return instance.get<ResponsePacksType>("cards/pack", {
            params
        })
    },

    addPack(cardsPack: PostPackDataType) {
        return instance.post<PostPackDataType, AxiosResponse<ResponsePacksType>>("cards/pack", {cardsPack})
    },

    deletePack(id: string) {
        return instance.delete<AxiosResponse>(`cards/pack?id=${id}`)
    },

    updatePack(cardsPack: updatePackDataType) {
        return instance.put<updatePackDataType, AxiosResponse<ResponsePacksType>>("cards/pack", {cardsPack})
    }
}
//types
export type ResponsePacksType = {
    cardPacks: CardPackType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
}

export type CardPackType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    cardsCount: number;
    type: string;
    rating: number;
    created: Date;
    updated: Date;
    more_id: string;
    __v: number;
    deckCover?: string;
}
export type ParamsGetPacksType = {
    user_id?: string,
    packName?: string,
    packs_Id?: string
    page?: string,
    pageCount?: string,
    min?: string,
    max?: string,
    sortPacks?: string,
}
export type PostPackDataType = {
    name?: string,
    private?: boolean,
    deckCover?: string
}

export type updatePackDataType = {
    _id: string
    name: string,
    private?: boolean,
    deckCover?: string
}
