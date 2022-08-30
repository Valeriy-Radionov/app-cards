const PROFILE = "PROFILE"

const initState = {

}
export const profileReducer = (state = initState, action: ProfileActionsType): typeof initState => {
    switch (action.type) {
        case "PROFILE": {
            return state
        }
        default: return state
    }
}

type ProfileActionsType = ProfileACType

type ProfileACType = ReturnType<typeof profileAC>
export const profileAC = () => {
    return {
        type: PROFILE,
    } as const
}