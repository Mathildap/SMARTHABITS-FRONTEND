export const initialState = {
    todos: [],
    loading: false,
    error: null,
};

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_TODOS':
            return {
                ...state,
                loading: action.payload.loading,
            };
        case 'SET_TODOS':
            return {
                ...state,
                todos: action.payload.todos,
                loading: action.payload.loading,
            };
        case 'ERROR_TODOS':
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
};
