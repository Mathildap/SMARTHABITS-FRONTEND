export const setNotesAction = (type, notes, dispatch) => {
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
                error: true,
            },
        });
    }
};
