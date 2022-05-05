export const initialState = {
    todos: [],
    loading: false,
    error: false,
};

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return (state = {
                ...state,
                todos: action.payload.todos,
            });
        case 'LOADING_TODOS':
            return (state = {
                ...state,
                loading: action.payload.loading,
            });
        case 'ERROR_TODOS':
            return (state = {
                ...state,
                error: action.payload.error,
            });
        default:
            return state;
    }
};
