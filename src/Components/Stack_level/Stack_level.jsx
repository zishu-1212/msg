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
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [trxBalance, setTrxBalance] = useState("");
  const [myLevel, setMyLevel] = useState("");
  const [userIncome, setUserIncome] = useState("");
  const [userAccountbalance, setUserAccountBalance] = useState("");
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
        // let userincome = web3.utils.fromWei(userinfo.totalRevenue);
        // userincome = parseFloat(userincome).toFixed(2);

        // setUserIncome(userincome);

        let balance = new web3.eth.getBalance(acc).then((response) => {
          let userBalance = web3.utils.fromWei(response);

          userBalance = Number(userBalance).toFixed(2);
          setUserAccountBalance(userBalance);
        });
        setrefrealAdress(userinfo.referrer);
      }
    } catch (e) {
      // toast.error(e.message);
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
              {/* <div className="stack_level_content">
                                <h6 className='stack_level_h6'><Rating
                                    style={{ color: "#ffbf00" }}
                                    initialRating={myLevel}
                                    emptySymbol={<AiOutlineStar />}
                                    fullSymbol={<AiFillStar className='star_color' />}
                                    start={0}
                                    stop={5}
                                    readonly

                                /></h6>

                            </div> */}
              {/* <div className="d-flex S_sss">
                <p className="s_l_p">Income:</p>
                <p className=" aliment">{withdrawDetail?.all_val}</p>
              </div> */}
              {/* <div className="d-flex S_sss">
                <p className="s_l_p">BNB Balance:</p>
                <p className=" aliment">{userAccountbalance}</p>
              </div> */}
              <div className="d-flex S_sss">
                <p className="s_l_p">USDT Balance:</p>
                <p className=" aliment ">{usdtBalance} USDT</p>
              </div>
              <div className="d-flex S_sss">
                <p className="s_l_p">Referral:</p>
                <p className=" aliment width_adjust">{refrealAdress}</p>
                <p className=" aliment width_adjust2">
                  {refrealAdress?.substring(0, 8) +
                    "..." +
                    refrealAdress?.substring(refrealAdress?.length - 8)}
                </p>
              </div>
              <div className="d-flex S_ssss">
                <p className="s_l_p">Referral link:</p>
                <p className=" aliment width_adjust3">{window.location.href}</p>
                <span style={{ marginTop: "-0.8rem" }}>
                  <CopyToClipboard
                    onCopy={() => setcopyTest(true)}
                    text={
                      refrealAdress ==
                      "0x0000000000000000000000000000000000000000"
                        ? `${window.location.href}`
                        : `${window.location.href}?referrallink=${acc}`
                    }
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
