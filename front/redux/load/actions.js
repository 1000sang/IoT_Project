const actions = {
    LOAD_USER_REQUEST: 'LOAD_USER_REQUEST',
    LOAD_USER_SUCSSESS: 'LOAD_USER_SUCSSESS',
    LOAD_USER_FAILURE: 'LOAD_USER_FAILURE',
    LOAD_DATA_REQUEST: 'LOAD_DATA_REQUEST',
    LOAD_DATA_SUCSSESS: 'LOAD_DATA_SUCSSESS',
    LOAD_DATA_FAILURE: 'LOAD_DATA_FAILURE',

    loadUser: () => ({
        type: actions.LOAD_USER_REQUEST
    }),
    loadUserSucssess: (userData) => ({
        type: actions.LOAD_USER_SUCSSESS,
        payload: userData
    }),
    loadData: () => ({
        type: actions.LOAD_DATA_REQUEST
    })
};
export default actions;
