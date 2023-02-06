import React, { useEffect, useState } from "react";
import "./Stack_p.css";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getpoolDetail, getUserRank } from "../../Redux/poolInfo/action";
import RankIcon from "../Assets/icons.png";
import { BsFillStopwatchFill } from "react-icons/bs";
import {
  financeAppContractAddress,
  financeAppContract_Abi,
} from "../../utilies/Contract";
function Stack_p() {
  let acc = useSelector((state) => state.connect?.connection);
  let { totalUsers } = useSelector((state) => state.poolInfo);
  let { userRank } = useSelector((state) => state.userRank);
  const [boosterTime, setBoosterTime] = useState(0);
  const [rewardTime, setRewardTime] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getpoolDetail());
  }, []);
  const getRank = async () => {
    if (acc == "No Wallet") {
      console.log("No Wallet");
    } else if (acc == "Wrong Network") {
      console.log("Wrong Wallet");
    } else if (acc == "Connect Wallet") {
      console.log("Connect Wallet");
    } else {
      dispatch(getUserRank(acc));
    }
  };
  const getBoosterTime = async () => {
    try {
      if (acc == "No Wallet") {
        console.log("No Wallet");
      } else if (acc == "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        console.log("Connect Wallet");
      } else {
        const web3 = window.web3;
        let financeAppcontractOf = new web3.eth.Contract(
          financeAppContract_Abi,
          financeAppContractAddress
        );
        let booster = await financeAppcontractOf.methods
          .getTimeDiffer(acc)
          .call();
        let boostert = await financeAppcontractOf.methods.boosterDay().call();
        let reward = await financeAppcontractOf.methods
          .getOrderLength(acc)
          .call();
        reward = await financeAppcontractOf.methods
          .getROI(acc, reward - 1)
          .call();
        setRewardTime(reward[0]);
        if (booster < boostert) {
          setBoosterTime(boostert - booster);
        } else {
          setBoosterTime(0);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getRank();
  }, [acc]);

  useEffect(() => {
    setInterval(() => {
      getBoosterTime();
    }, 30000);
    getBoosterTime();
  }, [acc]);
  return (
    <div className="main_stack_p_bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card stacking_p_card">
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <FaUserAlt className="icon_color fs-3"></FaUserAlt>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 mb-2 stack_part stack_responsive">
                        Participants
                      </h3>
                      <p className="mt-3 text-white stack_p_responsive  stack_part1">
                        {totalUsers}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <img
                        src={RankIcon}
                        width={"40px"}
                        className="icon_color fs-3"
                        alt=""
                      ></img>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 stack_responsive  stack_part mb-2">
                        User Rank
                      </h3>
                      <p className="mt-3 text-white stack_p_responsive stack_part1">
                        {userRank ? userRank : "No Rank"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <BsFillStopwatchFill className="icon_color fs-3"></BsFillStopwatchFill>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 stack_responsive stack_part2 mb-2">
                        Booster Remaining Time
                      </h3>
                      <p className="stack_p stack_p_responsive stack_part3">
                        {boosterTime}
                        {/* Platform Running Time: {depositTime} days */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      <BsFillStopwatchFill className="icon_color fs-3"></BsFillStopwatchFill>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 stack_responsive mb-2 stack_part4">
                        Cycle Reward Remaining Time
                      </h3>
                      <p className="stack_p stack_p_responsive">
                        {rewardTime}
                        {/* Platform Running Time: {depositTime} days */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row mt-4">
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <BsStars className="icon_color fs-3"></BsStars>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 mb-2">Double Diamond Pool
                      </h3>
                      <p className="mt-3 text-white text-start">${Number(doubleDiamond).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <RiMessage3Fill className="icon_color fs-3"></RiMessage3Fill>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 mb-2">Top Pool</h3>
                      <p className="mt-3 text-white text-start">${Number(topPool).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stack_p;
