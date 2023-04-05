import { useContext, useEffect, useState } from "react";
import accounting from "accounting";
import axios from "axios";
import { OpenModalContext } from "../../Contexts/ModalContext/ModalContext";

function ModalForm() {
  const [state, setState] = useState(1);
  const { openApply, setOpenApply, setOrderShow, token } =
    useContext(OpenModalContext);
  const [orderNumber, setOrderNumber] = useState("");
  const [applier, setApplier] = useState("");
  const [cathegory, setCathegory] = useState("Аванс");
  const [receiverDepartment, setReceiverDepartment] = useState("Юнусабад");
  const [receiverFinish, setReceiverFinish] = useState("");
  const [amountInSum, setAmountInSum] = useState("");
  const [amountInDollars, setAmountInDollars] = useState("");

  useEffect(() => {
    axios
      .get("/applyNumber", {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      })
      .then((response) => {
        setOrderNumber(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/applyNumber", {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      })
      .then((response) => {
        setOrderNumber(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [state]);

  const onClose = () => {
    setOpenApply(false);
    setOrderShow(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data
    axios
      .post(
        "/payment",
        {
          data: {
            orderNumber,
            applier,
            cathegory,
            receiverDepartment,
            receiverFinish,
            amountInSum,
            amountInDollars,
          },
        },
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
    console.log({
      orderNumber,
      applier,
      cathegory,
      receiverDepartment,
      receiverFinish,
      amountInSum,
      amountInDollars,
    });
    // Clear the form fields
    setOrderNumber("");
    setApplier("");
    setCathegory("");
    setReceiverDepartment("");
    setReceiverFinish("");
    setAmountInSum("");
    setAmountInDollars("");
    // Close the modal
    onClose();
  };

  if (!openApply) {
    return null;
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-content">
        <h2>Подача заявки</h2>
        <label>№ Заявки: {orderNumber}</label>
        <label>
          Категория
          <select
            name="cathegory"
            id="cathegory"
            onChange={(e) => setCathegory(e.target.value)}
            onBlur={(e) => setCathegory(e.target.value)}
          >
            <option value="Аванс">Аванс</option>
            <option value="З.П.">З.П.</option>
            <option value="Строительство">Строительство</option>
            <option value="Канцелярия">Канцелярия</option>
            <option value="Закуп сыря">Закуп сыря</option>
            <option value="Прочие расходы">Прочие расходы</option>
          </select>
        </label>
        <label>
          Отдел получатель
          <select
            name="receiver_department"
            id="receiver_department"
            onChange={(e) => setReceiverDepartment(e.target.value)}
            onBlur={(e) => setReceiverDepartment(e.target.value)}
          >
            <option value="Юнусабад">Юнусабад</option>
            <option value="Чиланзар">Чиланзар</option>
            <option value="Урта">Урта</option>
            <option value="Кола">Кола</option>
            <option value="Снабжение">Снабжение</option>
            <option value="Логистика">Логистика</option>
            <option value="Отдел продаж">Отдел продаж</option>
            <option value="Отдел маркетинга">Отдел маркетинга</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Фин. отдел">Фин. отдел</option>
            <option value="Тех. отдел">Тех. отдел</option>
          </select>
        </label>
        <label>
          Конечный получатель
          <input
            type="text"
            value={receiverFinish}
            onChange={(event) => {
              setReceiverFinish(event.target.value);
              setState(state + 1);
            }}
            required
          />
        </label>
        <label>
          Сумма (сум)
          <input
            type="text"
            value={accounting.formatNumber(amountInSum, 0, " ")}
            onChange={(event) =>
              setAmountInSum(accounting.unformat(event.target.value))
            }
            onBlur={(event) =>
              setAmountInSum(accounting.unformat(event.target.value))
            }
            required
          />
        </label>
        <label>
          Сумма ($)
          <input
            type="text"
            value={accounting.formatNumber(amountInDollars, 0, " ")}
            onChange={(event) =>
              setAmountInDollars(
                accounting.formatNumber(event.target.value, 0, " ")
              )
            }
            onBlur={(event) =>
              setAmountInDollars(
                accounting.formatNumber(event.target.value, 0, " ")
              )
            }
            required
          />
        </label>
        <div className="modal-actions">
          <button type="submit">Подать</button>
          <button type="button" onClick={onClose}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalForm;
