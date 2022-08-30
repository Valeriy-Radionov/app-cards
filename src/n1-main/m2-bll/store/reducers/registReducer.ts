const REGISTR = "REGISTR"

const initState = {

}
export const registrReducer = (state = initState, action: RegistrActionsType): typeof initState => {
    switch (action.type) {
        case "REGISTR": {
            return state
        }
        default: return state
    }
}

type RegistrActionsType = RegistrACType

type RegistrACType = ReturnType<typeof registrAC>
export const registrAC = () => {
    return {
        type: REGISTR,
    } as const
}