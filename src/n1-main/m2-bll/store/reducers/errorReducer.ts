const ERROR = "ERROR"

const initState = {

}
export const errorReducer = (state = initState, action: RegistrActionsType): typeof initState => {
    switch (action.type) {
        case "ERROR": {
            return state
        }
        default: return state
    }
}

type RegistrActionsType = ErrorACType

type ErrorACType = ReturnType<typeof errorAC>
export const errorAC = () => {
    return {
        type: ERROR,
    } as const
}