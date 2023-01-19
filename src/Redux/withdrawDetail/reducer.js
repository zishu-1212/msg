import { ActionTypes } from "../types";

const INITIAL_STATE = {
  withdrawDetail: {},
};

const withdrawInfoReduce = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case ActionTypes.WITHDRAW_INFO:
      return {
        ...state,
        withdrawDetail: payload,
      };
    default:
      return state;
  }
};
export default withdrawInfoReduce;
