import Router from 'next/router';
import produce from 'immer';
import actions from './actions';

const initState = {
  idToken: null,
  err: null,
};

export default function authReducer(state = initState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case actions.LOGIN_REQUEST_SUCCESS:
        draft.idToken = action.payload;
        draft.err = null;
        break;
      case actions.LOGIN_REQUEST_FAILURE:
        draft.idToken = null;
        draft.err = action.payload;
        break;
      case actions.LOGOUT_REQUEST_FAILURE:
      case actions.LOGOUT_REQUEST_SUCCESS:
        // Router.replace('/');
        return initState;
      default:
        return state;
    }
  })
}
