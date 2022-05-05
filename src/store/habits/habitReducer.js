export const initialState = {
    habits: [],
    loading: false,
    error: false,
};

export const habitReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HABITS':
            return (state = {
                ...state,
                habits: action.payload.habits,
            });
        case 'LOADING_HABITS':
            return (state = {
                ...state,
                loading: action.payload.loading,
            });
        case 'ERROR_HABITS':
            return (state = {
                ...state,
                error: action.payload.error,
            });
        default:
            return state;
    }
};
