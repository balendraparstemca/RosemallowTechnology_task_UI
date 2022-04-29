import * as ACTION_TYPES from './action_type';
export const set_profile = (user) => {
    return {
      type: ACTION_TYPES.CREATE_ACCOUNT,
      payload: user
    }
  }