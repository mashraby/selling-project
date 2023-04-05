import axios from "axios";
import { useContext, useState } from "react";
import { OpenModalContext } from "../../Contexts/ModalContext/ModalContext";

const ModelRow = ({ element, handleChange, setReady }) => {
  const [modelHas, setModelHas] = useState(false);
  return (
    <>
      <tr id={element.id}>
        <td>{element.id}</td>
        <td>
          <input
            id={element.id}
            onChange={(e) => {
              handleChange(e.target.id, e.target.value);
            }}
            onBlur={(e) => handleChange(e.target.id, e.target.value)}
            style={{ width: "300px" }}
            type="text"
            defaultValue={element.name}
          />
        </td>
      </tr>
    </>
  );
};

export default function NewFurnitureType() {
  const { token, types } = useContext(OpenModalContext);
  const [isNew, setIsNew] = useState(true);
  const [type_name, setType_name] = useState("");
  const [model_names, setModel_names] = useState([{ id: 1, name: "" }]);
  const [ready, setReady] = useState(true);

  const checkType = (name) => {
    const foundType = types.find((e) => e.name == name);
    if (foundType) {
      setIsNew(false);
      setReady(false);
    } else {
      setIsNew(true);
      setReady(true);
    }
  };

  const handleChange = (rowId, name) => {
    const updatedRows = model_names.map((row) => {
      if (row.id == rowId) {
        return {
          ...row,
          name,
        };
      } else {
        console.log("nothing");
        return row;
      }
    });
    setModel_names(updatedRows);
  };

  const handlePlus = () => {
    setModel_names([...model_names, { id: model_names.length + 1, name: "" }]);
  };

  const handleSubmit = () => {
    if (!ready) return;
    setReady(false);
    console.log({ type_name, model_names });
    axios
      .post(
        "/new-type-with-models",
        {
          data: { type_name, model_names },
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
  return (
    <>
      <div className="new-type-container">
        <header>
          <h2>Вид мебели</h2>
        </header>
        <label>
          Новый вид мебели:
          <input
            style={{
              border: isNew ? "1px solid #ccc" : "1px solid red",
              color: isNew ? "black" : "red",
            }}
            onChange={(e) => setType_name(e.target.value)}
            onBlur={(e) => {
              setType_name(e.target.value);
              checkType(e.target.value);
            }}
            type="text"
            className="new-furniture-type-input"
            id="new-furniture-type-input"
          />
        </label>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Модель</th>
            </tr>
          </thead>
          <tbody>
            {model_names.length &&
              model_names.map((e, i) => (
                <ModelRow
                  key={i}
                  element={e}
                  handleChange={handleChange}
                  setReady={setReady}
                />
                // <tr key={i} id={e.id}>
                //   <td>{e.id}</td>
                //   <td>
                //     <input
                //       id={e.id}
                //       onChange={(e) => {
                //         handleChange(e.target.id, e.target.value);
                //       }}
                //       onBlur={(e) => handleChange(e.target.id, e.target.value)}
                //       style={{ width: "300px" }}
                //       type="text"
                //       defaultValue={e.name}
                //     />
                //   </td>
                // </tr>
              ))}
          </tbody>
        </table>
        <button onClick={handlePlus} style={{ float: "left" }}>
          +
        </button>
        <button onClick={handleSubmit} style={{ float: "right" }}>
          {ready ? "Создать" : "loading..."}
        </button>
      </div>
    </>
  );
}
