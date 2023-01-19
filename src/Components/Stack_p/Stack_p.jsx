import React, { useEffect, useState } from "react";
import "./Stack_p.css";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import {useSelector, useDispatch}  from "react-redux";
import {getpoolDetail, getUserRank} from '../../Redux/poolInfo/action';
function Stack_p() {
  let acc = useSelector((state) => state.connect?.connection);
  let {totalUsers} = useSelector((state) => state.poolInfo);
  let {userRank} = useSelector((state) => state.userRank);
  console.log("userRank", userRank);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getpoolDetail())
  },[]);
  const getRank = () => {
    if (acc == "No Wallet") {
      console.log("No Wallet");
      } else if (acc == "Wrong Network") {
      console.log("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
      console.log("Connect Wallet");
      }else{
        dispatch(getUserRank(acc))
      }
  }
  useEffect(()=>{
    getRank()
  }, [acc])

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
                      <h3 className="stack_p_h3 mb-2">Participants</h3>
                      <p className="mt-3 text-white text-start">{totalUsers}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <AiOutlineShoppingCart className="icon_color fs-3"></AiOutlineShoppingCart>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 mb-2">User Rank</h3>
                      <p className="mt-3 text-white text-start">{userRank ? userRank : "No Rank"}</p>
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
