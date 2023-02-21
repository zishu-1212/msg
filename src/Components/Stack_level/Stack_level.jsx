import React, { useEffect, useState } from "react";
import "./Stack_level.css";

import {
  financeAppContractAddress,
  financeAppContract_Abi,
  juttoTokenAddress,
  juttoTokenAbi,
} from "../../utilies/Contract";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import { useSelector } from "react-redux";
function Stack_level() {
  let acc = useSelector((state) => state.connect?.connection);
  const [refrealAdress, setrefrealAdress] = useState("");
  const [referralLink, setrefrealLink] = useState("");
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [myLevel, setMyLevel] = useState("");
  const [copyTest, setcopyTest] = useState(false);
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
        let financeAppTokenOf = new web3.eth.Contract(
          juttoTokenAbi,
          juttoTokenAddress
        );

        let balanceOf = await financeAppTokenOf.methods.balanceOf(acc).call();
        let usdtamount = Number(web3.utils.fromWei(balanceOf)).toFixed(2);
        setUsdtBalance(usdtamount);

        let userinfo = await financeAppcontractOf.methods.userInfo(acc).call();
        setMyLevel(userinfo.level);
        setrefrealAdress(userinfo.referrer);
        if (userinfo.totalDeposit > 0) {
          let spit= window.location.origin + window.location.pathname
          let add = `${spit}?referrallink=${acc}`;
          setrefrealLink(add);
        } else {
          setrefrealLink(userinfo.referrer);
          let spit= window.location.origin+window.location.pathname
          let add = `${spit}?referrallink=${userinfo.referrer}`;
          setrefrealLink(add);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getDetail();
  }, [acc]);

  useEffect(() => {
    copyTest ? toast.success("Copied") : <></>;
    setTimeout(() => {
      setcopyTest(false);
    }, 10);
  }, [copyTest]);

  return (
    <div className="stack_level_main_bg py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card stack_inner_card">
              <div className="d-flex S_sss">
                <p className="s_l_p">USDT Balance:</p>
                <p className=" aliment ">{usdtBalance} USDT</p>
              </div>
              <div className="d-flex S_sss">
                <p className="s_l_p">Referrer:</p>
                <p className=" aliment width_adjust">{refrealAdress}</p>
                <p className=" aliment width_adjust2">
                  {refrealAdress?.substring(0, 8) +
                    "..." +
                    refrealAdress?.substring(refrealAdress?.length - 8)}
                </p>
              </div>
              <div className="d-flex S_ssss">
                <p className="s_l_p">Referral link:</p>
                <p className=" aliment width_adjust3">{referralLink}</p>
                <span style={{ marginTop: "-0.8rem" }}>
                  <CopyToClipboard
                    onCopy={() => setcopyTest(true)}
                    text={referralLink}
                  >
                    <AiOutlineCopy className="text-white fs-4" />
                  </CopyToClipboard>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stack_level;
