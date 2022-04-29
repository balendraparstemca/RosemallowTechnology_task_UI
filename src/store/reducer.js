import * as ACTION_TYPES from './action_type'

const initialState = {
    user: {status:'created'},
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.CREATE_ACCOUNT:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default UserReducer;