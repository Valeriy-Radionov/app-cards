const RECOVERY = "RECOVERY/RECOVERY"

const initState = {

}
export const recoveryReducer = (state = initState, action: RecoveryActionsType): typeof initState => {
    switch (action.type) {
        case "RECOVERY/RECOVERY": {
            return state
        }
        default: return state
    }
}

export type RecoveryActionsType = RecoveryACType

type RecoveryACType = ReturnType<typeof recoveryAC>
export const recoveryAC = () => (
    {
        type: RECOVERY,
    } as const
)