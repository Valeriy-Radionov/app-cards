const PROFILE = "PROFILE/PROFILE"

const initState = {

}
export const profileReducer = (state = initState, action: ProfileActionsType): typeof initState => {
    switch (action.type) {
        case "PROFILE/PROFILE": {
            return state
        }
        default: return state
    }
}

export type ProfileActionsType = ProfileACType

type ProfileACType = ReturnType<typeof profileAC>
export const profileAC = () => (
    {
        type: PROFILE,
    } as const
)