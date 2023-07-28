import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loadWeb3 } from "../../apis/api";
import {
  financeAppContractAddress,
  financeAppContract_Abi,
} from "../../utilies/Contract";
import "./My_team.css";
import RepetationComponent from "./RepetationComponent";
import img1 from "./tm1.png";
import img2 from "./tm2.png";
import img3 from "./tm3.png";
import img4 from "./tm4.png";
import { useSelector } from "react-redux";
function My_team() {
  let acc = useSelector((state) => state.connect?.connection);
  const [userinfos, setUserInfos] = useState("");
  const [downline, setDownline] = useState("");
  const [team, setTeamDeposite] = useState("");
  const [otherTeam, setOtherTeam] = useState("");
  const [TotalTeam, setTotalTeam] = useState("");

  const getDetail = async () => {
    try {
      if (acc == "No Wallet") {
        console.log("No Wallet");
      } else if (acc == "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        console.log("Connect Wallet");
      } else {
        let obj = {};
        const web3 = window.web3;
        let financeAppcontractOf = new web3.eth.Contract(
          financeAppContract_Abi,
          financeAppContractAddress
        );
        let userDetails = await financeAppcontractOf.methods
          .getUserInfos(acc)
          .call();
        setDownline(userDetails[0].teamNum);
        console.log("setDownline",downline)
        let teamDeposite = await financeAppcontractOf.methods
          .getTeamDeposit(acc)
          .call();
        setTeamDeposite(teamDeposite.maxTeam);
        setOtherTeam(teamDeposite.otherTeam);
        setTotalTeam(teamDeposite.totalTeam);
        let getTeamDeposit = await financeAppcontractOf.methods
          .getTeamDeposit(acc)
          .call();
        // let checkMaxDeposit = await financeAppcontractOf.methods
        //   .checkMaxDeposit(acc)
        //   .call();
        // let check_Address = checkMaxDeposit.addr;

        // checkMaxDeposit = web3.utils.fromWei(checkMaxDeposit.amount);
        
      }
    } catch (e) {
      console.log("Transacton Failed");
    }
  };
  useEffect(() => {
    getDetail();
  }, [acc,getDetail]);

  return (
    <div className="mmmmm">
      <h3 className="text-white mt-5 mb-3">My Team</h3>
      <RepetationComponent />

      <div className="My_team_second_section">
        <div className="team_main">
          <div className="team_dev">
            <div className="sale_main">
              <img src={img1} alt="" />
              <div className="team_p text-white ">
                <span>Total Team Bussines :</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{TotalTeam/1000000}</span>
              </div>
            </div>
            <div className="sale_main">
              <img src={img2} alt="" />
              <div className="team_p text-white ">
                <span>Downline :</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{downline}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="team_main2">
          <div className="team_dev">
            <div className="sale_main">
              <img src={img3} alt="" />
              <div className="team_p text-white ">
                <span>Team Business :</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{team/1000000}</span>
              </div>
            </div>
            <div className="sale_main">
              <img src={img4} alt="" />
              <div className="team_p text-white ">
                <span>Team Business :</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{otherTeam/1000000}</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="team_main2">
          <div className="Last_div_img">
            <img src={img3} alt="" />
            <div className="team_p text-white ">
              <span>Maximum Team Deposit-Level</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                {userinfos.checkMaxDeposit} - {userinfos.Leval_Data}
                - {userinfos.check_Address}
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
export default My_team;
