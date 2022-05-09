export const initialState = {
    habits: [],
    loading: false,
    error: null,
};

export const habitReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HABITS':
            return (state = {
                ...state,
                habits: action.payload.habits,
                loading: action.payload.loading,
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
