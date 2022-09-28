import {instance} from "./auth/auth-api";
import {AxiosResponse} from "axios";

export const packsApi = {

    getPacks(userId?: string, page?: number, pageCount?: number, minCardsCount?: number, maxCardsCount?: number, sortUpDown?: sortUpDown, sortField?: sortField, block?: boolean) {
        return instance.get<Users>("cards/pack", {
            params: {
                user_id: userId,
                page: page,
                pageCount: pageCount,
                min: minCardsCount,
                max: maxCardsCount,
                sortPacks: `${sortUpDown}${sortField}`,
                block: block
            }
        })
    },

    sortBy(sortType: sortUpDown = "0", sortField: sortField = "created") {
        return instance.get<Users>(`cards/pack?sortPacks=${sortType}${sortField}`)
    },

    addPack(newPack: addPackDataType) {
        return instance.post<addPackDataType, AxiosResponse<Users>>("cards/pack", newPack)
    },

    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`,)
    },

    updatePack(newPack: updatePackDataType) {
        return instance.put<updatePackDataType, AxiosResponse<Users>>("cards/pack", newPack)
    }
}
//types
export type Users = {
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

export type addPackDataType = {
    cardsPack: {
        name: string,
        private: boolean,
        deckCover: string
    }
}

export type updatePackDataType = {
    cardsPack: {
        _id: string
        name: string,
        deckCover: string
    }
}
// sort types

type sortUpDown = "0" | "1"
type sortField = "user_id" | "user_name" | "name" | "grade" | "cardsCount" | "rating" | "created" | "updated"
