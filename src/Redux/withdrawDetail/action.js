import { ActionTypes } from "../types";
import {
  financeAppContractAddress,
  financeAppContract_Abi,
} from "../../utilies/Contract";
export const withdrawInfo = (acc) => {
  return async (dispatch) => {
    try {
      const web3 = window.web3;
      let financeAppcontractOf = new web3.eth.Contract(
        financeAppContract_Abi,
        financeAppContractAddress
      );
      let obj = {};
      let reward_info = await financeAppcontractOf.methods
        .rewardInfo(acc)
        .call();
      let user_info = await financeAppcontractOf.methods.userInfo(acc).call();
      let roi = await financeAppcontractOf.methods.getROIRewards(acc).call();
      let all_val =
        // parseInt(web3.utils.fromWei(reward_info.roi)) +
        parseInt(web3.utils.fromWei(reward_info.directs)) +
        parseInt(web3.utils.fromWei(reward_info.diamond)) +
        parseInt(web3.utils.fromWei(reward_info.doubleDiamond)) +
        parseInt(web3.utils.fromWei(reward_info.directPool)) +
        parseInt(web3.utils.fromWei(reward_info.level1ROIIncome)) +
        parseInt(web3.utils.fromWei(reward_info.level4ROIIncome)) +
        parseInt(web3.utils.fromWei(reward_info.level5ROIIncome)) +
        parseInt(web3.utils.fromWei(roi));

      obj["all_val"] = all_val;
      // obj['totalDeposit'] = Number(web3.utils.fromWei(user_info?.totalDeposit)).toFixed(2);
      // obj['top'] = Number(web3.utils.fromWei(reward_info?.top)).toFixed(2);
      // obj["statics"] = Number(web3.utils.fromWei(reward_info?.roi)).toFixed(
      //   2
      // );
      obj["capitals"] = Number(
        web3.utils.fromWei(reward_info?.directs)
      ).toFixed(2);
      obj["diamond"] = Number(web3.utils.fromWei(reward_info?.diamond)).toFixed(
        2
      );
      obj["doubleDiamond"] = Number(
        web3.utils.fromWei(reward_info?.doubleDiamond)
      ).toFixed(2);
      obj["directPool"] = Number(
        web3.utils.fromWei(reward_info?.directPool)
      ).toFixed(2);
      obj["roi"] = Number(web3.utils.fromWei(roi)).toFixed(2);
      obj["level1ROIIncome"] = Number(
        web3.utils.fromWei(reward_info?.level1ROIIncome)
      ).toFixed(2);
      obj["level4ROIIncome"] = Number(
        web3.utils.fromWei(reward_info?.level4ROIIncome)
      ).toFixed(2);
      obj["level5ROIIncome"] = Number(
        web3.utils.fromWei(reward_info?.level5ROIIncome)
      ).toFixed(2);
      obj["split"] = Number(web3.utils.fromWei(reward_info?.split)).toFixed(2);

      dispatch({ type: ActionTypes.WITHDRAW_INFO, payload: obj });
    } catch (error) {}
  };
};
