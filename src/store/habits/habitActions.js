export const setHabitsAction = (type, habits, dispatch) => {
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
                error: true,
            },
        });
    }
};
