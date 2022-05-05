export const setUserAction = (type, user, dispatch) => {
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

    dispatch({
        type: 'ERROR_USER',
        payload: {
            error: true,
        },
    });
    dispatch({
        type: 'LOADING_USER',
        payload: {
            loading: false,
        },
    });
};
