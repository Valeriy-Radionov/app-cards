const REGISTRATION = "REGISTRATION/REGISTRATION"

const initState = {

}
export const registrationReducer = (state = initState, action: RegistrationActionsType): typeof initState => {
    switch (action.type) {
        case "REGISTRATION/REGISTRATION": {
            return state
        }
        default: return state
    }
}

type RegistrationActionsType = RegistrationACType

type RegistrationACType = ReturnType<typeof registrationAC>
export const registrationAC = () => (
    {
        type: REGISTRATION,
    } as const
)