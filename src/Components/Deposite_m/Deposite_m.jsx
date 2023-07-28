import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdArrowBackIos } from "react-icons/md";
import "./Deposite_m.css";
import {
  financeAppContractAddress,
  financeAppContract_Abi,
  busdTokenAddress,
  busdtokenAbi,
  juttoTokenAddress,
  juttoTokenAbi,
} from "../../utilies/Contract";
import { useSelector, useDispatch } from "react-redux";
import { getpoolDetail, getUserRank } from "../../Redux/poolInfo/action";
import { getRemaintime } from "../../Redux/remaintime/action";
import { withdrawInfo } from "../../Redux/withdrawDetail/action";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

function Deposite_m(props) {
  const acc = useSelector((state) => state.connect?.connection);
  const [loader, setLoader] = useState(false);
  const [depositAndInterest, setDepositAndInterest] = useState("");
  const [isOption, setIsOption] = useState(false);
  const [isToken, setIsToken] = useState("jutto");
  const [getTime, setGeTime] = useState();
  const [unix, setUnix] = useState();

  const dispatch = useDispatch();

  // const checkBalance = async () => {
  //   try {
  //     const web3 = window.web3;
  //     if (isToken === "jutto" || isToken === "busd") {
  //       const token = new web3.eth.Contract(busdtokenAbi, busdTokenAddress);
  //       let bal = await token.methods.balanceOf(acc).call();
  //       bal = web3.utils.fromWei(bal);
  //       return bal;
  //     }
  //   } catch (error) {
  //     console.error("Error while checking balance", error);
  //   }
  // };

  const depositAmount = async () => {
    try {
      if (acc === "No Wallet") {
        toast.info("No Wallet");
      } else if (acc === "Wrong Network") {
        toast.info("Wrong Wallet");
      } else if (acc === "Connect Wallet") {
        toast.info("Connect Wallet");
      } else {
        const web3 = window.web3;
        const contract = new web3.eth.Contract(
          financeAppContract_Abi,
          financeAppContractAddress
        );

        const currentDate = new Date();
        const epochTime = currentDate.getTime();
        const unixTimestamp = Math.floor(epochTime / 1000);

        console.log("Unix Timestamp:", unixTimestamp);

        setGeTime(unixTimestamp);
        const token = new web3.eth.Contract(busdtokenAbi, busdTokenAddress);

        const userInfo = await contract.methods.getUserInfos(acc).call();
        const totalDeposit = userInfo[0].maxDeposit;
        console.log("totalDeposit", totalDeposit);
        const reffere = userInfo[0].referrer;
        const maxDepositable = userInfo[0].maxDepositable;
        console.log("maxDepositable", maxDepositable);
        const totalDepositWei = totalDeposit;
        console.log("totalDepositWei", totalDepositWei);

        const getUserInfos = await contract.methods.getUserInfos(acc).call();
        const index = getUserInfos[0].unfreezeIndex;
        console.log("index", index);

        const getCurDay = await contract.methods.getCurDay().call();
        console.log("getCurDayssssss", getCurDay);
        const getDayInfos = await contract.methods
          .getDayInfos(getCurDay)
          .call();

        console.log("getDayInfos", getDayInfos);
        const getMaxDayNewbies = await contract.methods
          .getMaxDayNewbies(getCurDay)
          .call();
        console.log("getMaxDayNewbies", getMaxDayNewbies);

        if (totalDeposit == 0) {
          const approveAmount = depositAndInterest * 1000000000000;
          setLoader(true);
          await token.methods
            .approve(financeAppContractAddress, approveAmount)
            .send({
              from: acc,
            });
          setLoader(false);

          const approveAmountss = approveAmount / 1000000;
          console.log("ammmmmiiot", approveAmountss);

          await contract.methods.deposit(approveAmountss).send({
            from: acc,
          });

          toast.success("Amount deposited successfully");
        } else {
          const getUnfreeze = await contract.methods
            .getOrderUnfreezeTime(acc, index)
            .estimateGas();
          console.log("Unix Timestamp:hellloenchd bdjbd", getUnfreeze);
          setUnix(getUnfreeze);
          console.log("getUnfreeze", getUnfreeze);
          if (parseInt(unixTimestamp) > parseInt(getUnfreeze)) {
            console.log(
              `depositAndInterest ${typeof depositAndInterest} and totalDeposit ${typeof totalDeposit}`
            );

            if (depositAndInterest > totalDeposit) {
              const depositValue = parseInt(depositAndInterest);

              if (depositValue >= 25 && depositValue <= 3000) {
                if (depositValue % 25 === 0) {
                  const { maxDeposit, referrer } = userInfo || {};
                  const levelValue = depositAndInterest;
                  const approveAmount = depositAndInterest * 1000000000000;

                  if (parseFloat(approveAmount) >= parseFloat(totalDeposit)) {
                    if (
                      referrer === "0x0000000000000000000000000000000000000000"
                    ) {
                      toast.error("Please Register Account 1st");
                    } else {
                      setLoader(true);
                      await token.methods
                        .approve(financeAppContractAddress, approveAmount)
                        .send({
                          from: acc,
                        });
                      setLoader(false);

                      const approveAmountss = approveAmount / 1000000;
                      // console.log("ammmmmiiot", approveAmountss);

                      await contract.methods.deposit(approveAmountss).send({
                        from: acc,
                      });

                      // Assuming these functions exist and serve specific purposes
                      checkFirstTime();
                      dispatch(getRemaintime());
                      dispatch(getpoolDetail());
                      dispatch(getUserRank(acc));
                      dispatch(withdrawInfo(acc));

                      props.onHide();
                      toast.success("Amount deposited successfully");
                    }
                  } else {
                    toast.info(
                      `Please enter a value of ${web3.utils.fromWei(
                        maxDeposit
                      )} or above`
                    );
                  }
                } else {
                  toast.info("Please enter a value in multiples of 25");
                }
              } else {
                toast.info("Value must be between 25 and 3000");
              }
            } else {
              toast.info("Increase the amount of deposit");
            }
          } else {
            toast.info("Freeze Time Not Completed");
          }
        }
      }
    } catch (error) {
      setLoader(false);
      console.error("Error while deposit amount:", error);
    }
  };

  const checkFirstTime = async () => {
    try {
      if (
        acc !== "No Wallet" &&
        acc !== "Wrong Network" &&
        acc !== "Connect Wallet"
      ) {
        const web3 = window.web3;
        const contract = new web3.eth.Contract(
          financeAppContract_Abi,
          financeAppContractAddress
        );
        const { maxDeposit } = await contract.methods.getUserInfos(acc).call();
        setIsOption(parseFloat(maxDeposit) > 0 ? false : true);
      }
    } catch (error) {
      console.error("Error while checking first time:", error);
    }
  };

  useEffect(() => {
    setInterval(() => {
      checkFirstTime();
    }, 300000);
  }, [acc]);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal_bg">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 p-o">
                <div className="d-flex">
                  <div className="icons_m">
                    <Button
                      onClick={() => props.onHide()}
                      style={{
                        backgroundColor: "#00A79D",
                        border: "1px solid #00A79D",
                      }}
                    >
                      <MdArrowBackIos />
                    </Button>
                  </div>

                  <h4 className="ms-5 modal_h4">Deposit</h4>
                </div>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="body_m_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <input
                  type="number"
                  value={depositAndInterest}
                  onChange={(e) => {
                    setDepositAndInterest(e.target.value);
                  }}
                  className="input_modal"
                  placeholder="25"
                />
                <p className="modal_pa">
                  Minimum deposit 25 USDT. A ratio of 25 max 3000
                </p>
              </div>
              {/* { isOption && <div className='col-lg-4'>
                                <select name="" id="" onChange={(e)=>{setIsToken(e.target.value)}}>
                                    <option value="" selected disabled>Select Token</option>
                                    <option value="jutto">JUTTO</option>
                                    <option value="busd">BUSD</option>
                                </select>
                            </div>} */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="footer_m_bg">
          <Button className="s_d_Ws w-100" onClick={depositAmount}>
            {loader ? (
              <ReactLoading
                type="spin"
                color="#ffffff"
                className="mb-2 mx-auto"
                height={30}
                width={30}
              />
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Deposite_m;
