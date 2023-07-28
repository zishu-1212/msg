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

import { toast } from "react-toastify";
import Web3 from "web3";
// const web3Supply = new Web3("https://bsc-dataseed1.binance.org/")
const web3Supply = new Web3("https://polygon-testnet.public.blastapi.io");
function Stack_p() {
  let acc = useSelector((state) => state.connect?.connection);
  let { totalUsers } = useSelector((state) => state.poolInfo);
  // console.log("totalUsers",totalUsers);
  let { userRank } = useSelector((state) => state.userRank);

  const [boosterTime, setBoosterTime] = useState(0);
  const [rewardTime, setRewardTime] = useState("0");
  const [tean, setTean] = useState("0");
  const [depositTerm, setDepositTerm] = useState("None Rank");
  const [curCycle, setCurCycle] = useState("0");
  const [curDay, setCurDay] = useState("0");
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
  const getUser = async () => {
    try {
      const web3 = window.Web3;
      let financeAppcontractOf = new web3Supply.eth.Contract(
        financeAppContract_Abi,
        financeAppContractAddress
      );
      let totalUsers = await financeAppcontractOf.methods
        .getUserInfos(acc)
        .call();
      setTean(totalUsers[0].teamNum);
    } catch (e) {
      console.error(e);
    }
  }; // const getBoosterTime = async () => {
  //   try {
  //     console.log(acc, "acc");
  //     if (acc == "No Wallet") {
  //       console.log("No Wallet");
  //     } else if (acc == "Wrong Network") {
  //       console.log("Wrong Wallet");
  //     } else if (acc == "Connect Wallet") {
  //       console.log("Connect Wallet");
  //     } else {
  //       const web3 = window.web3;
  //       let financeAppcontractOf = new web3.eth.Contract(
  //         financeAppContract_Abi,
  //         financeAppContractAddress
  //       );

  //       let boostert = await financeAppcontractOf.methods.boosterDay().call();
  //       const length = await financeAppcontractOf.methods
  //         .getOrderLength(acc)
  //         .call();
  //       // let boosterFlag = false;
  //       let boosterFlag = await financeAppcontractOf.methods
  //         .getBoosterTeamDeposit(acc)
  //         .call();
  //       if (booster < 10 && length >= 1) {
  //         setBoosterTime(10 - booster);
  //         console.log("booster", booster);

  //         // let boosterMsg;
  //         // let boosterEndTime = boostert - booster;
  //         // if (boosterEndTime <= 0) {
  //         //   if (boosterFlag) {
  //         //     boosterMsg = "Booster Qualified";
  //         //     setBoosterTime(boosterMsg);
  //         //   } else {
  //         //     boosterMsg = "Booster not Qualified";
  //         //     setBoosterTime(boosterMsg);
  //         //   }
  //         // }
  //       } else {
  //         let boosterMsg;
  //         if (boosterFlag) {
  //           boosterMsg = "Booster Qualified";
  //           setBoosterTime(boosterMsg);
  //         } else {
  //           boosterMsg = "Booster not Qualified";
  //           setBoosterTime(boosterMsg);
  //         }
  //       }

  //       let reward = await financeAppcontractOf.methods
  //         .getROI(acc, length - 1)
  //         .call();
  //       if (reward[2] <= 50) {
  //         reward = reward[1] - reward[2];
  //       } else {
  //         reward = "Cycles are completed";
  //       }

  //       setRewardTime(reward);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const rank = async () => {
    try {
      const web3 = window.web3;
      let obj = {};
      let financeAppcontractOf = new web3.eth.Contract(
        financeAppContract_Abi,
        financeAppContractAddress
      );
      let level = await financeAppcontractOf.methods.getUserInfos(acc).call();
      const deposit = level[0].maxDeposit / 1000000;
      // console.log("deposit", deposit);
      let userRank = "";

      // Define the conditions for each rank based on the given information
      if (deposit >= 25 && deposit <= 1950) {
        userRank = "BEGINER";
      } else if (deposit >= 1000) {
        userRank = "PROMOTER";
      } else if (deposit >= 2000) {
        userRank = "DIAMOND";
      } else if (deposit >= 3000) {
        userRank = "GLOBAL DIAMOND";
      } else {
        userRank = "No Rank"; // If the level does not fall into any of the defined ranges
      }

      // Here, you can do further processing based on the userRank or perform actions based on the rank.
      setDepositTerm(userRank);
      // console.log("User Rank:", userRank);
      return userRank;
    } catch (error) {
      console.error("");
    }
  };

  const current = async () => {
    try {
      const web3 = window.Web3;
      let financeAppcontractOf = new web3Supply.eth.Contract(
        financeAppContract_Abi,
        financeAppContractAddress
      );
      let CurCycle = await financeAppcontractOf.methods.getCurCycle().call();
      // console.log("CurCycle",CurCycle);
      setCurCycle(CurCycle);
    } catch (e) {
      console.error(e);
    }
  };
  const currentDay = async () => {
    try {
      const web3 = window.Web3;
      let financeAppcontractOf = new web3Supply.eth.Contract(
        financeAppContract_Abi,
        financeAppContractAddress
      );
      let CurDay = await financeAppcontractOf.methods.getCurDay().call();
      // console.log("CurDay",CurDay);
      setCurDay(CurDay);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      rank();
      currentDay();
      current();
      getUser();
    }, 2000); // 2000ms = 2s

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [acc, rank, currentDay,getUser ,current]);

  useEffect(() => {
    setInterval(() => {
    
      current();
      getRank();
    }, 30000);
  }, [acc , rank]);
  // useEffect(() => {
  //   getBoosterTime();
  // }, [acc]);
  return (
    <div className="main_stack_p_bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card stacking_p_card">
              <div className="row">
                <div className="col-lg-6 col-md-12 mt-3">
                  <div className="inner_stack_p">
                    <div className="mt-3">
                      <FaUserAlt className="icon_color fs-3"></FaUserAlt>
                    </div>
                    <div className="mt-3">
                      <h3 className="text-center text_card">Participants</h3>
                      <p className="mt-3 text-center text_card">{tean}</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 mt-3">
                  <div className="inner_stack_p">
                    <div className="mt-3">
                      <img
                        src={RankIcon}
                        width={"30px"}
                        className="img-fluid"
                        alt=""
                      ></img>
                    </div>
                    <div className="mt-3">
                      <h3 className="text-center text_card">User Rank</h3>
                      <p className=" mt-3 text-center text_card">
                        {depositTerm}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mt-3">
                  <div className="inner_stack_p">
                    <div className="mt-3">
                      <BsFillStopwatchFill className="icon_color fs-3"></BsFillStopwatchFill>
                    </div>
                    <div className="mt-3">
                      <h3 className="text-center text_card">Current Day</h3>
                      <p className="mt-3 text-center text_card">
                        <span className="text_card">{curDay}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mt-3">
                  <div className="inner_stack_p">
                    <div className="mt-3">
                      <BsFillStopwatchFill className="icon_color fs-3"></BsFillStopwatchFill>
                    </div>
                    <div className="mt-3">
                      <h3 className="text-center text_card">Current Cycle </h3>
                      <p className="mt-3 text-center text_card">{curCycle}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <FaUserAlt className="icon_color fs-3"></FaUserAlt>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 mb-2 stack_part ">
                        Participants
                      </h3>
                      <p className="mt-3 text-white  stack_part1">
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
                      <h3 className="stack_p_h3  stack_part mb-2">User Rank</h3>
                      <p className="mt-3 text-white  stack_part1">
                        {userRank ? userRank : "No Rank"}
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
                      <h3 className="  stack_p_h3  stack_part ">
                        Booster Time
                      </h3>
                      <p className="mt-3 text-white text-center stack_part1">
                        {boosterTime && (
                          <span className="stack_p stack_part1">
                            {boosterTime}
                          </span>
                        )}
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
                      <h3 className="stack_p_h3  stack_part mb-2">
                        Cycle Time
                      </h3>
                      <p className="mt-3 text-white  stack_part1">
                        {rewardTime}
                      </p>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      <BsFillStopwatchFill className="icon_color fs-3"></BsFillStopwatchFill>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 mb-2 stack_part">
                        Cycle Time
                      </h3>
                      <p className="stack_p stack_p_responsive stack_part1">
                        {rewardTime}
                     
                      </p>
                    </div>
                  </div>
                </div> */}
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
