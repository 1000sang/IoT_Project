import produce from 'immer';
import actions from './actions';

const initState = {
    signUpLoading: false,
    isSignedUp: false,
    signUpError: false,
}

export default function userReducer(state = initState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case actions.SIGN_UP_REQUEST:
                draft.signUpLoading = true
                draft.isSignedUp = false
                draft.signUpError = false
                break;
            case actions.SIGN_UP_SUCCESS:
                draft.signUpLoading = false
                draft.isSignedUp = true
                draft.signUpError = false
                break;
            case actions.SIGN_UP_FAILURE:
                draft.signUpLoading = false
                draft.isSignedUp = false
                draft.signUpError = action.data
            default:
                break;
        }
    });
}
