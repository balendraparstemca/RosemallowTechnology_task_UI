import * as ACTION_TYPES from './action_type';
import userService from './userService';

export const createAccount = (obj) => (dispatch) => {

  return userService.createAccount(obj).then(
    (response) => {

      if (response.status === 'success') {

        dispatch({
          type: ACTION_TYPES.CREATE_ACCOUNT,
          payload: { status: "success",msg:"user account created" }
        });
      }
      else {

        dispatch({
          type: ACTION_TYPES.CREATE_ACCOUNT,
          payload: { status: "fail",msg:"user account failed"  }
        });
      }

      return Promise.resolve();
    },
    (error) => {

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: ACTION_TYPES.CREATE_ACCOUNT,
        payload: { status: "fail", msg: message }
      });

      return Promise.reject();
    }
  );

}