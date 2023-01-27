import { ActionTypes } from "../types";

const INITIAL_STATE = {
  totalUsers: 0,
};

const poolInfoReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ActionTypes.POOL_DETAIL:
      return {
        ...state,
        totalUsers: payload,
      };
    default:
      return state;
  }
};
export default poolInfoReducer;

let rankState = {
  userRank: "",
};
export const userRank = (state = rankState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_RANK:
      return {
        ...state,
        userRank: payload,
      };
    default:
      return state;
  }
};
