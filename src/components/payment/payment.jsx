import axios from "axios";
import { useContext, useState } from "react";
import { OpenModalContext } from "../../Contexts/ModalContext/ModalContext";
import accounting from "accounting";

function PaymentRow({ e, handleChange, typeOptions }) {
  const [paymentSum, setPaymentSum] = useState(e.payment_sum);
  const [paymentDollar, setPaymentDollar] = useState(e.payment_$);
  const [kurs, setKurs] = useState(e.kurs);
  const [change, setChange] = useState(e.change);
  return (
    <tr>
      <td>
        {" "}
        <select
          style={{ width: "250px" }}
          name="payment_type"
          id={e.id}
          onChange={(event) =>
            handleChange(event, event.target.id, "payment_type")
          }
          onBlur={(event) =>
            handleChange(event, event.target.id, "payment_type")
          }
        >
          <option value="none" selected disabled hidden>
            select payment type...
          </option>
          {typeOptions.map((el, ind) => (
            <option value={el}>{el}</option>
          ))}
        </select>
      </td>
      <td>
        {" "}
        <input
          style={{ width: "200px" }}
          type="text"
          name="payment_sum"
          id={e.id}
          value={accounting.formatNumber(paymentSum, 0, " ")} //{e.payment_sum}
          onChange={(event) => {
            handleChange(event, event.target.id, "payment_sum");
            setPaymentSum(accounting.unformat(event.target.value));
          }}
          onBlur={(event) => {
            handleChange(event, event.target.id, "payment_sum");
            setPaymentSum(accounting.unformat(event.target.value));
          }}
        />
      </td>
      <td>
        <input
          style={{ width: "200px" }}
          type="text"
          name="payment_$"
          id={e.id}
          value={accounting.formatNumber(paymentDollar, 0, " ")}
          onChange={(event) => {
            handleChange(event, event.target.id, "payment_$");
            setPaymentDollar(accounting.unformat(event.target.value));
          }}
          onBlur={(event) => {
            handleChange(event, event.target.id, "payment_$");
            setPaymentDollar(accounting.unformat(event.target.value));
          }}
        />
      </td>
      <td>
        <input
          style={{ width: "200px" }}
          type="text"
          name="kurs"
          id={e.id}
          value={accounting.formatNumber(kurs, 0, " ")}
          onChange={(event) => {
            handleChange(event, event.target.id, "kurs");
            setKurs(accounting.unformat(event.target.value));
          }}
          onBlur={(event) => {
            handleChange(event, event.target.id, "kurs");
            setKurs(accounting.unformat(event.target.value));
          }}
        />
      </td>
      <td>
        <div style={{ width: "250px" }}>
          {accounting.formatNumber(e.amount_by_kurs, 0, " ")}
        </div>
      </td>
      <td>
        <input
          style={{ width: "250px" }}
          type="text"
          name="change"
          id={e.id}
          value={accounting.formatNumber(change, 0, " ")}
          onChange={(event) => {
            handleChange(event, event.target.id, "change");
            setChange(accounting.unformat(event.target.value));
          }}
          onBlur={(event) => {
            handleChange(event, event.target.id, "change");
            setChange(accounting.unformat(event.target.value));
          }}
        />
      </td>
      <td>
        <div style={{ width: "250px" }}>
          {accounting.formatNumber(e.total_sum, 0, " ")}
        </div>
      </td>
      <td>
        <div style={{ width: "250px" }}>
          {accounting.formatNumber(e.rest_money, 0, " ")}
        </div>
      </td>
    </tr>
  );
}

function PaymentTable() {
  const [ready, setReady] = useState(true);
  const { paymentRow, setPaymentRow, paymentModal, formData, row, token } =
    useContext(OpenModalContext);
  const [state, setState] = useState(1);
  const typeOptions = [
    "нал_касса",
    "нал_другой",
    "перечисление_(терминал) ",
    "карта(узкарт)",
    "карта(хумо)",
    "рассрочка(анорБанк)",
  ];

  const handleSubmit = () => {
    if (!ready) return;
    setReady(false);
    console.log({ row, formData, paymentRow });
    setReady(true);
    axios
      .post(
        "/universal",
        {
          data: { row, formData, paymentRow },
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
        setReady(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePlus = () => {
    paymentRow.push({
      id: paymentRow.length + 1,
      payment_type: "",
      payment_sum: 0,
      payment_$: 0,
      kurs: 0,
      amount_by_kurs: 0,
      change: 0,
      total_sum: 0,
      rest_money: 0,
    });
    setPaymentRow(paymentRow);
    setState(state + 1);
  };

  function handleChange(event, rowId, fieldName) {
    const updatedRows = paymentRow.map((row) => {
      if (row.id == rowId) {
        if (fieldName == "payment_sum") {
          return {
            ...row,
            [fieldName]: accounting.unformat(event.target.value),
            ["total_sum"]:
              accounting.unformat(event.target.value) * 1 +
              (row.payment_$ * row.kurs) / 100 -
              row.change,
          };
        }
        if (fieldName == "payment_$") {
          return {
            ...row,
            [fieldName]: accounting.unformat(event.target.value),
            ["total_sum"]:
              row.payment_sum * 1 +
              (accounting.unformat(event.target.value) * row.kurs) / 100 -
              row.change,
            ["amount_by_kurs"]:
              (accounting.unformat(event.target.value) * row.kurs) / 100,
          };
        }
        if (fieldName == "kurs") {
          return {
            ...row,
            [fieldName]: accounting.unformat(event.target.value),
            ["total_sum"]:
              (row.payment_$ * accounting.unformat(event.target.value)) / 100 +
              row.payment_sum * 1 -
              row.change,
            ["amount_by_kurs"]:
              (accounting.unformat(event.target.value) * row.payment_$) / 100,
          };
        }
        if (fieldName == "change") {
          return {
            ...row,
            [fieldName]: accounting.unformat(event.target.value),
            ["total_sum"]:
              (row.payment_$ * row.kurs) / 100 +
              row.payment_sum * 1 -
              accounting.unformat(event.target.value),
          };
        }
        return {
          ...row,
          [fieldName]: event.target.value,
        };
      } else {
        return row;
      }
    });
    setPaymentRow(updatedRows);
  }

  return (
    <>
      <h2 style={{ display: paymentModal ? "block" : "none" }}>Предоплата</h2>
      <table style={{ display: paymentModal ? "block" : "none" }}>
        <thead>
          <tr>
            <th>Вид оплаты</th>
            <th>Предоплата (сум)</th>
            <th>Предоплата ($)</th>
            <th>курс-$100</th>
            <th>Сумма по курсу</th>
            <th>здачи</th>
            <th>Итого (сум)</th>
            <th>остаток</th>
          </tr>
        </thead>
        <tbody>
          {paymentRow &&
            paymentRow.map((e, i) => {
              return (
                <PaymentRow
                  e={e}
                  handleChange={handleChange}
                  typeOptions={typeOptions}
                />
              );
            })}
        </tbody>
      </table>
      <div
        className="footer_buttons"
        style={{ display: paymentModal ? "block" : "none" }}
      >
        <button onClick={handlePlus}>+</button>
        <button
          style={{ float: "right" }}
          onClick={handleSubmit}
          disabled={!ready}
        >
          {ready ? "Submit" : "Loading..."}
        </button>
      </div>
    </>
  );
}

export default PaymentTable;
