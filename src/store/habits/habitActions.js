export const setHabitsAction = (type, habits, dispatch) => {
    dispatch({ type: 'LOADING_HABITS', payload: { loading: true } });

    try {
        dispatch({
            type,
            payload: {
                habits,
                loading: false,
            },
        });
    } catch (err) {
        dispatch({
            type: 'ERROR_HABITS',
            payload: {
                err,
            },
        });
    }
};
