const SET_PASSWORD = "PASSWORD/SET-PASSWORD"

const initState = {

}
export const passwordReducer = (state = initState, action: PasswordActionsType): typeof initState => {
    switch (action.type) {
        case "PASSWORD/SET-PASSWORD": {
            return state
        }
        default: return state
    }
}

export type PasswordActionsType = PasswordACType

type PasswordACType = ReturnType<typeof passwordAC>
export const passwordAC = () => (
    {
        type: SET_PASSWORD,
    } as const
)