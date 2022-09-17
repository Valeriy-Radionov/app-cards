

const PROFILE = "PROFILE/PROFILE"

export type ProfileStateType = {
    id: string,
    email: string,
    name: string,
    publicCardPacksCount: number,
    avatar?: string
}

const initialProfileState = {
    id: '',
    email: '',
    name: '',
    publicCardPacksCount: 0,
    avatar:'https://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/User-Administrator-Blue-icon.png'
}
export const profileReducer = (state:ProfileStateType = initialProfileState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case "PROFILE/PROFILE": {
            return {...state,}
        }
        default: return state
    }
}

export type ProfileActionsType = SetProfileACType

type SetProfileACType = ReturnType<typeof setProfileAC>
export const setProfileAC = (profile:ProfileStateType) => (
    {
        type: PROFILE,
        payload: {
            profile
        }
    } as const
)