import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdArrowBackIos } from "react-icons/md";
import "./Deposite_m.css";
import {
  financeAppContractAddress,
  financeAppContract_Abi,
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
  let acc = useSelector((state) => state.connect?.connection);
  let [loader, setloader] = useState(false);
  let [depositandintrest, setdepositandintrest] = useState("50");
  let [isOption, setIsOption] = useState(false);
  let [isToken, setIsToken] = useState("jutto");
  const dispatch = useDispatch();
  const checkBalance = async () => {
    try {
      const web3 = window.web3;
      if (isToken == "jutto" || isToken == "busd") {
        const token = new web3.eth.Contract(juttoTokenAbi, juttoTokenAddress);
        let bal = await token.methods.balanceOf(acc).call();
        bal = web3.utils.fromWei(bal);
        return bal;
      }
    } catch (error) {
      console.error("error while check balance", error);
    }
  };

  const depositAmount = async () => {
    try {
      if (acc == "No Wallet") {
        toast.info("No Wallet");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        toast.info("Connect Wallet");
      } else {
        const web3 = window.web3;
        const contract = new web3.eth.Contract(
          financeAppContract_Abi,
          financeAppContractAddress
        );
        const token = new web3.eth.Contract(juttoTokenAbi, juttoTokenAddress);
        let {totalDeposit}=await contract.methods.userInfo(acc).call()
        totalDeposit=web3.utils.fromWei(totalDeposit)
        if((2500-totalDeposit)>0){
          if (
            parseInt(depositandintrest) >= 50 &&
            parseInt(depositandintrest) <= 2500
          ) {
            if (parseInt(depositandintrest) % 50 == 0) {
              const { maxDeposit, referrer } = await contract.methods
                .userInfo(acc)
                .call();
  
              let value;
              let approveAmount = web3.utils.toWei(depositandintrest);
              let userTokenBalance = await checkBalance();
  
              // if( parseFloat(userTokenBalance) >= parseFloat(web3.utils.fromWei(value))){
              if (
                parseFloat(approveAmount) >=
                parseFloat(web3.utils.fromWei(maxDeposit))
              ) {
                if (referrer == "0x0000000000000000000000000000000000000000") {
                  toast.error("please Register Account 1st");
                } else {
                  setloader(true);
  
                  await token.methods
                    .approve(financeAppContractAddress, approveAmount)
                    .send({
                      from: acc,
                    });
                  await contract.methods.deposit(approveAmount).send({
                    from: acc,
                  });
  
                  checkFirstTime();
                  dispatch(getRemaintime());
                  dispatch(getpoolDetail());
                  dispatch(getUserRank(acc));
                  dispatch(withdrawInfo(acc));
                  props.onHide();
                  toast.success("Amount Deposited successfully");
                  setloader(false);
                }
              } else {
                toast.info(
                  `please enter value ${web3.utils.fromWei(maxDeposit)} or above`
                );
              }
            } else {
              toast.info("Please enter value in multiple of 50");
            }
          } else {
            toast.info("value must be greater then 50 and less then 2500 ");
          }
        }
        else{
          toast.info("Remaing deposit limit reached")
        }
       
      }
    } catch (error) {
      setloader(false);
      console.error("error while deposit amount", error.message);
    }
  };

  const checkFirstTime = async () => {
    try {
      console.log("acc",acc);
      if (
        acc != "No Wallet" &&
        acc != "Wrong Network" &&
        acc != "Connect Wallet"
      ) {
        const web3 = window.web3;
        const contract = new web3.eth.Contract(
          financeAppContract_Abi,
          financeAppContractAddress
        );
        let { maxDeposit } = await contract.methods.userInfo(acc).call();
        setIsOption(parseFloat(maxDeposit) > 0 ? false : true);
      }
    } catch (error) {
      console.error("error while check first time", error);
    }
  };
  useEffect(() => {
    checkFirstTime();
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
                      <MdArrowBackIos></MdArrowBackIos>
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
                  min="50"
                  max="2500"
                  value={depositandintrest}
                  onChange={(e) => {
                    setdepositandintrest(e.target.value);
                  }}
                  className="input_modal"
                  placeholder="50"
                />
                <p className="modal_pa">
                  Minimum deposit 50 USDT. A ratio of 50 max 2500
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
          <Button className="s_d_Ws  w-100" onClick={depositAmount}>
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
            )}{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Deposite_m;
