import { Button } from "@chakra-ui/react";
import { useState } from "react";
import "./home.css";

function Home() {
  const [state, setState] = useState({
    id: "",
    applier: "",
    cathegory: "",
    reciever_department: "",
    reciever_finish: "",
    sum_in_sum: "",
    sum_in_dollar: "",
  });

  return (
    <>
      <form className="left">
        <div className="wrap">
          <label>
            Заявитель:
            <select name="applier" id="applier">
              <option value="Толиб">Толиб</option>
              <option value="Шукурулло">Шукурулло</option>
              <option value="Альфир">Альфир</option>
              <option value="Джавохир">Джавохир</option>
              <option value="Самир">Самир</option>
              <option value="Умид">Умид</option>
              <option value="Кабул">Кабул</option>
              <option value="Ахрор">Ахрор</option>
            </select>
          </label>
        </div>
        <div className="wrap">
          <label>
            Категория:
            <select name="cathegory" id="cathegory">
              <option value="Аванс">Аванс</option>
              <option value="З.П.">З.П.</option>
              <option value="Строительство">Строительство</option>
              <option value="Канцелярия">Канцелярия</option>
              <option value="Закуп сыря">Закуп сыря</option>
              <option value="Прочие расходы">Прочие расходы</option>
            </select>
          </label>
        </div>
        <div className="wrap">
          <label>
            Отдел получатель:
            <select name="receiver_department" id="receiver_department">
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
        </div>
        <div className="wrap">
          <label>
            Кон-получатель:
            <input type="text" name="receiver_finish" />
          </label>
        </div>
        <div className="wrap">
          <label>
            Сумма (сум):
            <input type="number" name="sum_in_sum" />
          </label>
        </div>
        <div className="wrap">
          <label>
            Сумма ($):
            <input type="number" name="sum_in_dollar" />
          </label>
        </div>
        <div className="button">
          <button type="submit">ok</button>
        </div>
      </form>
    </>
  );
}

export default Home;
