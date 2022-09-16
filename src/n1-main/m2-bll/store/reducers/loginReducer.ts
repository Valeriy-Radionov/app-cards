const LOGIN = "LOGIN/LOGIN"

const initState = {
}
export const loginReducer = (state = initState, action: LoginActionsType): typeof initState => {
    switch (action.type) {
        case "LOGIN/LOGIN": {
            return state
        }
        default: return state
    }
}

export type LoginActionsType = LoginACType

type LoginACType = ReturnType<typeof loginAC>
export const loginAC = () => (
    {
        type: LOGIN,
    } as const
)