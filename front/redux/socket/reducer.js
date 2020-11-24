import produce from 'immer';
import actions from './actions';

const initState = {
    tempData: '데이터 받는 중',
    humData: '데이터 받는 중',
}

export default function userReducer(state = initState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case actions.GET_TEMP_DATA:
                draft.tempData = action.payload;
                break;
            case actions.GET_HUM_DATA:
                draft.humData = action.payload;
                break;
            default:
                break;
        }
    });
}
