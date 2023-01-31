import { ActionTypes } from "../types";
import {
  financeAppContractAddress,
  financeAppContract_Abi,
} from "../../utilies/Contract";
import Web3 from "web3";
// const web3Supply = new Web3("https://bsc-dataseed1.binance.org/")
const web3Supply = new Web3("https://data-seed-prebsc-2-s3.binance.org:8545/");

export const getpoolDetail = () => {
  return async (dispatch) => {
    try {
      let financeAppcontractOf = new web3Supply.eth.Contract(
        financeAppContract_Abi,
        financeAppContractAddress
      );
      let totalUsers = await financeAppcontractOf.methods.totalUser().call();
      dispatch({ type: ActionTypes.POOL_DETAIL, payload: totalUsers });
    } catch (e) {
      console.error(e);
    }
  };
};

export const getUserRank = (acc) => {
  return async (dispatch) => {
    try {
      const web3 = window.web3;
      let obj = {};
      let financeAppcontractOf = new web3.eth.Contract(
        financeAppContract_Abi,
        financeAppContractAddress
      );
      let { level } = await financeAppcontractOf.methods.userInfo(acc).call();
      console.log("level", level);
      let userRank = "";
      if (level == 0) {
        userRank = "";
      } else if (level == 1) {
        userRank = "None";
      } else if (level == 2) {
        userRank = "None";
      } else if (level == 3) {
        userRank = "None";
      } else if (level == 4) {
        userRank = "Diamond";
      } else if (level == 5) {
        userRank = "Double Diamond";
      }
      dispatch({ type: ActionTypes.USER_RANK, payload: userRank });
    } catch (error) {
      console.error(error);
    }
  };
};
