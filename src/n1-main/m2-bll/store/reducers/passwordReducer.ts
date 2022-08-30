const SET_PASSWORD = "SET-PASSWORD"

const initState = {

}
export const passwordReducer = (state = initState, action: PasswordActionsType): typeof initState => {
    switch (action.type) {
        case "SET-PASSWORD": {
            return state
        }
        default: return state
    }
}

type PasswordActionsType = PasswordACType

type PasswordACType = ReturnType<typeof passwordAC>
export const passwordAC = () => {
    return {
        type: SET_PASSWORD,
    } as const
}