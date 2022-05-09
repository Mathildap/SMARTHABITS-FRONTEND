export const setNotesAction = (type, notes, dispatch) => {
    dispatch({ type: 'LOADING_NOTES', payload: { loading: true } });

    try {
        dispatch({
            type,
            payload: {
                notes,
                loading: false,
            },
        });
    } catch (err) {
        dispatch({
            type: 'ERROR_NOTES',
            payload: {
                err,
            },
        });
    }
};
