const LOGIN = "LOGIN"

const initState = {
}
export const loginReducer = (state = initState, action: LoginActionsType): typeof initState => {
    switch (action.type) {
        case "LOGIN": {
            return state
        }
        default: return state
    }
}

type LoginActionsType = LoginACType

type LoginACType = ReturnType<typeof loginAC>
export const loginAC = () => {
    return {
        type: LOGIN,
    } as const
}