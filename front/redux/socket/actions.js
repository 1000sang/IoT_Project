const actions = {
    SOCKET_CONNECT_REQUEST: 'SOCKET_CONNECT_REQUEST',
    SOCKET_CONNECT_SUCSSESS: 'SOCKET_CONNECT_SUCSSESS',
    SOCKET_CONNECT_FAILURE: 'SOCKET_CONNECT_FAILURE',
    GET_TEMP_DATA: 'GET_TEMP_DATA',
    GET_HUM_DATA: 'GET_HUM_DATA',

    getTempData: (tempData) => ({
        type: actions.GET_TEMP_DATA,
        payload: tempData
    }),
    getHumData: (humData) => ({
        type: actions.GET_HUM_DATA,
        payload: humData
    }),
};
export default actions;
