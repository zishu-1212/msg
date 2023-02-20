import React, { useEffect, useState } from "react";
import {
  financeAppContractAddress,
  financeAppContract_Abi,
} from "../../utilies/Contract";
import RepetationComponent from "../My_team/RepetationComponent";
import "./Deposit_details.css";
import Moment from "react-moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function Deposit_details() {
  const [orderamount, setOrderAmount] = useState("");
  const [directs, setDirects] = useState({});
  const [unixTime, setUnixTime] = useState("");
  const [flag, setFlag] = useState(false);
  let acc = useSelector((state) => state.connect?.connection);
  const getDetail = async () => {
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
        let direct = await financeAppcontractOf.methods
          .checkDirects(acc)
          .call();
        setDirects(direct);
        let getOrderLength = await financeAppcontractOf.methods
          .getOrderLength(acc)
          .call();
        if (getOrderLength > 0) {
          getOrderLength = getOrderLength - 1;

          let orderInfos = await financeAppcontractOf.methods
            .orderInfos(acc, getOrderLength)
            .call();
          setUnixTime(orderInfos.start);
          let amount = web3.utils.fromWei(orderInfos.amount);
          setOrderAmount(amount);
          setFlag(true);
        } else {
          toast.info("Deposit 1st");
        }
      }
    } catch (e) {
      console.log("Transaction Failed");
    }
  };
  useEffect(() => {
    getDetail();
  }, [acc]);

  return (
    <div className="dddd">
      <h3 className="text-white mt-5 mb-3">Deposit Details</h3>
      <RepetationComponent />
      <div className="deposit_main">
        <div className="colm inner_div">
          <div className="deposit_second">
            <p>Deposit details</p>
          </div>
          <div className="deposi_second">
            <div>
              <span>Amount</span>
              {flag && <p>{orderamount}</p>}
            </div>
            <div>
              <span>Deposit Date</span>
              {flag && (
                <p>
                  <Moment format="DD/MM/YYYY hh:mm:ss" unix>
                    {unixTime}
                  </Moment>
                </p>
              )}
            </div>
            <div>
              <span>500 USD Directs</span>
              <br />
              <span>{directs["1"]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deposit_details;
