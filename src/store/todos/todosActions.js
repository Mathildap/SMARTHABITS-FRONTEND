export const setTodosAction = (type, todos, dispatch) => {
    try {
        dispatch({
            type,
            payload: {
                todos,
                loading: false,
            },
        });
    } catch (err) {
        dispatch({
            type: 'ERROR_TODOS',
            payload: {
                error: true,
            },
        });
    }
};
