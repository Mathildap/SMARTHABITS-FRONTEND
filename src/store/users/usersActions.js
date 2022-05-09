export const setUserAction = (type, user, dispatch) => {
    if (user === 'error') {
        dispatch({
            type: 'ERROR_USER',
            payload: {
                error: true,
            },
        });
        return;
    }

    try {
        dispatch({
            type,
            payload: { user },
        });
    } catch (err) {
        dispatch({
            type: 'ERROR_USER',
            payload: {
                error: true,
            },
        });
    }
};
