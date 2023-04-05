import axios from "axios";
import { createContext, useEffect, useState } from "react";

const OpenModalContext = createContext();

function Provider({ children }) {
  const token = window.localStorage.getItem("token");
  const [id, setId] = useState("");
  function generateRandomNumber() {
    axios
      .get("/getId", {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setId(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [types, setTypes] = useState([]);
  const [orderShow, setOrderShow] = useState(true);
  const [userDataModal, setUserDataModal] = useState(false);
  const [paymentRow, setPaymentRow] = useState([
    {
      id: 1,
      payment_type: "",
      payment_sum: 0,
      payment_$: 0,
      kurs: 0,
      amount_by_kurs: 0,
      change: 0,
      total_sum: 0,
      rest_money: 0,
    },
  ]);
  const [paymentModal, setPaymentModal] = useState(false);
  const [openApply, setOpenApply] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [allModels, setAllModels] = useState([]);
  const [row, setRow] = useState([
    {
      id: 1,
      cathegory: "",
      orderId: "",
      type: "",
      model: "",
      tissue: "",
      title: "",
      price: 0,
      sale: 0,
      qty: 0,
      sum: 0,
    },
  ]);
  const [formData, setFormData] = useState({
    id,
    clientName: "",
    phone: "",
    whereFrom: "инста",
    status: "первая покупка",
    seller: "",
    deliveryDate: "",
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    generateRandomNumber();
    axios
      .get("/furniture-type", {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      })
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/models-with-type", {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      })
      .then((response) => {
        setAllModels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <OpenModalContext.Provider
      value={{
        isOpenModal,
        setIsOpenModal,
        setOpenApply,
        openApply,
        loginOpen,
        setLoginOpen,
        orderShow,
        setOrderShow,
        input,
        setInput,
        userDataModal,
        setUserDataModal,
        paymentRow,
        setPaymentRow,
        paymentModal,
        setPaymentModal,
        row,
        setRow,
        formData,
        setFormData,
        generateRandomNumber,
        token,
        id,
        setId,
        types,
        setTypes,
        allModels,
        setAllModels,
      }}
    >
      {children}
    </OpenModalContext.Provider>
  );
}

export { OpenModalContext, Provider };
