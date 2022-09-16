const ERROR = "ERROR/ERROR-MESSAGE"

const initState = {

}
export const errorReducer = (state = initState, action: ErrorActionsType): typeof initState => {
    switch (action.type) {
        case "ERROR/ERROR-MESSAGE": {
            return state
        }
        default: return state
    }
}

export type ErrorActionsType = ErrorACType

type ErrorACType = ReturnType<typeof errorAC>
export const errorAC = () => (
    {
        type: ERROR,
    } as const
)