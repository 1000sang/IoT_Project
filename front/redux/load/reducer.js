import produce from 'immer';
import actions from './actions';

const initState = {
    loadUserLoading: false,
    isLoadedUser: false,
    loadUserError: false,
    loadDataLoading: false,
    isLoadedData: false,
    loadDataError: false,
}

export default function userReducer(state = initState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case actions.LOAD_USER_REQUEST:
                draft.loadUserLoading = true
                draft.isLoadedUser = false
                draft.loadUserError = false
                break;
            case actions.LOAD_USER_SUCSSESS:
                draft.loadUserLoading = false
                draft.isLoadedUser = true
                draft.loadUserError = false
                break;
            case actions.LOAD_USER_FAILURE:
                draft.loadUserLoading = false
                draft.isLoadedUser = false
                draft.loadUserError = action.data
                break;
            case actions.LOAD_DATA_REQUEST:
                draft.loadDataLoading = true
                draft.isLoadedData = false
                draft.loadDataError = false
                break;
            case actions.LOAD_DATA_SUCSSESS:
                draft.loadDataLoading = false
                draft.isLoadedData = true
                draft.loadDataError = false
                break;
            case actions.LOAD_DATA_FAILURE:
                draft.loadDataLoading = false
                draft.isLoadedData = false
                draft.loadDataError = action.data
                break;
            default:
                break;
        }
    });
}
