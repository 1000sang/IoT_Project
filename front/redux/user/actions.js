const actions = {
    SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',

    signup: (data) => ({
        type: actions.SIGN_UP_REQUEST,
        data: data
    }),
};
export default actions;
