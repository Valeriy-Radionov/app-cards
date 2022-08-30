const RECOVERY = "RECOVERY"

const initState = {

}
export const recoveryReducer = (state = initState, action: RecoveryActionsType): typeof initState => {
    switch (action.type) {
        case "RECOVERY": {
            return state
        }
        default: return state
    }
}

type RecoveryActionsType = RecoveryACType

type RecoveryACType = ReturnType<typeof recoveryAC>
export const recoveryAC = () => {
    return {
        type: RECOVERY,
    } as const
}