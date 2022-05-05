export const initialState = {
    notes: [],
    loading: false,
    error: false,
};

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return (state = {
                ...state,
                notes: action.payload.notes,
            });
        case 'LOADING_NOTES':
            return (state = {
                ...state,
                loading: action.payload.loading,
            });
        case 'ERROR_NOTES':
            return (state = {
                ...state,
                error: action.payload.error,
            });
        default:
            return state;
    }
};
