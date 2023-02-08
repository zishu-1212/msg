import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdArrowBackIos } from "react-icons/md";
import "./Withdraw_m.css";
import ReactLoading from "react-loading";
import {
  financeAppContractAddress,
  financeAppContract_Abi,
} from "../../utilies/Contract";
import { withdrawInfo } from "../../Redux/withdrawDetail/action";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

function Withdraw_m(props) {
  let acc = useSelector((state) => state.connect?.connection);
  let { withdrawDetail } = useSelector((state) => state.withDrawInfo);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const getDetail = async () => {
    try {
      if (acc == "No Wallet") {
        console.log("No Wallet");
      } else if (acc == "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        console.log("Connect Wallet");
      } else {
        dispatch(withdrawInfo(acc));
      }
    } catch (e) {
      console.log("error while get detiail", e);
    }
  };
  ///interval added for checking ROI aftert every one minute
  useEffect(() => {
    setInterval(() => {
      getDetail();
    }, 60000);
    getDetail();
  }, [acc]);
  const withdrawAmount = async () => {
    try {
      if (acc == "No Wallet") {
        toast.info("No Wallet");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        toast.info("Connect Wallet");
      } else {
        setLoader(true);
        if (withdrawDetail?.all_val > 0) {
          const web3 = window.web3;
          let financeAppcontractOf = new web3.eth.Contract(
            financeAppContract_Abi,
            financeAppContractAddress
          );
          await financeAppcontractOf.methods.withdraw().send({
            from: acc,
          });
          getDetail();
          props.onHide();
          setLoader(false);
          dispatch(withdrawInfo(acc));
          toast.success("successfully withdraw");
        } else {
          setLoader(false);
          toast.info("You don't have any reward yet!");
        }
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  };
  const handleUpdateROI = async () => {
    try {
      if (acc == "No Wallet") {
        toast.info("No Wallet");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        toast.info("Connect Wallet");
      } else {
        setLoader2(true);
        const web3 = window.web3;
        let financeAppcontractOf = new web3.eth.Contract(
          financeAppContract_Abi,
          financeAppContractAddress
        );
        await financeAppcontractOf.methods.claimROIReward().send({
          from: acc,
        });
        getDetail();
        toast.success("successfully Updated ROI");
        setLoader2(false);
      }
    } catch (e) {
      console.log(e);
      setLoader2(false);

      toast.error("Transaction Failed");
    }
  };
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
                      className="color-black"
                      style={{
                        backgroundColor: "#00A79D",
                        border: "1px solid #00A79D",
                      }}
                    >
                      <MdArrowBackIos></MdArrowBackIos>
                    </Button>
                  </div>
                  <h4 className="ms-5 modal_h4">Withdraw</h4>
                </div>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="body_m_bg bb">
          <div className="bb">
            <div className="container">
              <div className="row ">
                <div className="col-lg-12">
                  <div className="d-flex justify-content-between">
                    <p className="text-white">Split Reward</p>
                    <p className="witddraw_p">{withdrawDetail?.split} USDT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            {/* <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">principal</p>
                  <p className="witddraw_p">{withdrawDetail?.totalDeposit} USDT</p>
                </div>
              </div>
            </div> */}

            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Cycle reward</p>
                  <p className="witddraw_p">{withdrawDetail?.roi} USDT</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Direct Referral Income</p>
                  <p className="witddraw_p">{withdrawDetail?.capitals} USDT</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Diamond</p>
                  <p className="witddraw_p">{withdrawDetail?.diamond} USDT</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Double Diamond</p>
                  <p className="witddraw_p">
                    {withdrawDetail?.doubleDiamond} USDT
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Daily Equality Dividend</p>
                  <p className="witddraw_p">
                    {withdrawDetail?.directPool} USDT
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">ROI</p>
                  <p className="witddraw_p">{withdrawDetail?.roi} USDT</p>
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Level 1 Team Reward</p>
                  <p className="witddraw_p">
                    {withdrawDetail?.level1ROIIncome} USDT
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Level 2-5 Team Reward</p>
                  <p className="witddraw_p">
                    {withdrawDetail?.level4ROIIncome} USDT
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Level 6-15 Team Reward</p>
                  <p className="witddraw_p">
                    {withdrawDetail?.level5ROIIncome} USDT
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Top</p>
                  <p className="witddraw_p">
                    {withdrawDetail?.top} USDT
                  </p>
                </div>
              </div>
            </div> */}
            {/* <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Top player reward</p>
                  <p className="witddraw_p">{withdrawDetail?.top} USDT</p>
                </div>
              </div>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer className="footer_m_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Total Withdrawable</p>
                  <p className="witddraw_p">{withdrawDetail?.all_val} USDT</p>
                </div>
              </div>
            </div>

            {/* {toatlWithdraw && <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>Maximum withdraw</p>
                                    <p className='witddraw_p'>{available_withdraw} USDT</p>
                                </div>
                            </div>
                        </div>} */}
          </div>
          <Button
            className="s_d_Ws  w-100"
            onClick={() => {
              withdrawAmount();
            }}
          >
            {loader ? (
              <ReactLoading
                type="spin"
                color="#ffffff"
                className="mb-2 mx-auto"
                height={30}
                width={30}
              />
            ) : (
              "Withdraw"
            )}
          </Button>
          <Button
            className="s_d_Ws  w-100"
            onClick={() => {
              handleUpdateROI();
            }}
          >
            {loader2 ? (
              <ReactLoading
                type="spin"
                color="#ffffff"
                className="mb-2 mx-auto"
                height={30}
                width={30}
              />
            ) : (
              "Update ROI"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Withdraw_m;
