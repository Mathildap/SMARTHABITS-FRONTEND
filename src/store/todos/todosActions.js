export const setTodosAction = (type, todos, dispatch) => {
    dispatch({ type: 'LOADING_TODOS', payload: { loading: true } });

    try {
        dispatch({
            type,
            payload: {
                todos,
                loading: false,
            },
        });
    } catch (error) {
        dispatch({
            type: 'ERROR_TODOS',
            payload: {
                error,
            },
        });
    }
};
