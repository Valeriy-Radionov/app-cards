const initialState = {}

export const appReducer = (state = initialState, action: AppActionType): typeof initialState => {
    switch (action.type) {
        default:
            return state
    }
}

export type AppActionType = any
