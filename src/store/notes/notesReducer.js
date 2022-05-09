export const initialState = {
    notes: [],
    loading: false,
    error: null,
};

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_NOTES':
            return {
                ...state,
                loading: action.payload.loading,
            };
        case 'SET_NOTES':
            return {
                ...state,
                notes: action.payload.notes,
                loading: action.payload.loading,
            };

        case 'ERROR_NOTES':
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
};
