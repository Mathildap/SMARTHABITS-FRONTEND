const initialState = {
    user: '',
    loading: false,
    error: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_USER':
            return (state = {
                ...state,
                loading: action.payload.loading,
            });
        case 'SET_USER':
            return (state = {
                ...state,
                user: action.payload.user,
            });
        case 'ERROR_USER':
            return (state = {
                ...state,
                error: action.payload.error,
            });
        default:
            return state;
    }
};
