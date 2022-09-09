const ERROR = "ERROR/ERROR-MESSAGE"

const initState = {

}
export const errorReducer = (state = initState, action: RegistrationActionsType): typeof initState => {
    switch (action.type) {
        case "ERROR/ERROR-MESSAGE": {
            return state
        }
        default: return state
    }
}

type RegistrationActionsType = ErrorACType

type ErrorACType = ReturnType<typeof errorAC>
export const errorAC = () => (
    {
        type: ERROR,
    } as const
)