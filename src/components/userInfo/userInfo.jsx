import React, { useContext } from "react";
import { OpenModalContext } from "../../Contexts/ModalContext/ModalContext";

const UserInfo = () => {
  const {
    isOpenModal,
    setIsOpenModal,
    setOrderShow,
    formData,
    setFormData,
    setPaymentModal,
    id,
    setId,
  } = useContext(OpenModalContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value, id }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsOpenModal(false);
    setPaymentModal(true);
  };

  return (
    <div className="modal" style={{ display: isOpenModal ? "block" : "none" }}>
      <div className="modal-content">
        <span
          className="close"
          onClick={(e) => {
            setIsOpenModal(false);
            setOrderShow(true);
          }}
        >
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label>ID: {formData.id}</label>
          <label>
            Имя клиента:
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              onBlur={handleChange}
            />
          </label>
          <label>
            Номер телефона:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleChange}
            />
          </label>
          <label>
            Откуда пришли:
            <select
              name="whereFrom"
              id="whereFrom"
              onChange={handleChange}
              onBlur={handleChange}
            >
              <option value="инста">инста</option>
              <option value="т.г.">т.г.</option>
              <option value="фейсбук">фейсбук</option>
              <option value="наружная реклама">наружная реклама</option>
              <option value="посоветовали">посоветовали</option>
            </select>
          </label>
          <label>
            Статус:
            <select
              name="status"
              id="status"
              onChange={handleChange}
              onBlur={handleChange}
            >
              <option value="первая покупка">первая покупка</option>
              <option value="постоянный">постоянный</option>
            </select>
          </label>
          <label>
            Дата доставки:
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              onBlur={handleChange}
            />
          </label>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
