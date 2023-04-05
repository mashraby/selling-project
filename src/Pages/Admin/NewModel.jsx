import axios from "axios";
import { useContext, useState } from "react";
import { OpenModalContext } from "../../Contexts/ModalContext/ModalContext";

const ModelRow = ({ element, handleChange, setReady, ready, i, types }) => {
  const [isNew, setIsNew] = useState(true);

  const handleCheck = (name, index) => {
    axios
      .get(`/has-model/${name}`)
      .then((response) => {
        // window.location.reload();
        if (response.data) {
          const newReady = ready.map((ele, ind) => {
            if (ind == index - 1) return false;
            return ele;
          });
          setReady(newReady);
          setIsNew(false);
        } else {
          const newReady = ready.map((ele, ind) => {
            if (ind == index - 1) return true;
            return ele;
          });
          setReady(newReady);
          setIsNew(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <tr key={i} id={element.id}>
        <td>{element.id}</td>
        <td>
          <select
            name="type"
            id={element.id}
            onChange={(event) =>
              handleChange(event.target.id, "type_id", event.target.value)
            }
            onBlur={(event) =>
              handleChange(event.target.id, "type_id", event.target.value)
            }
          >
            <option value="none">Выберите вид...</option>
            {types.length &&
              types.map((element, index) => (
                <option key={index} value={element.id}>
                  {element.name}
                </option>
              ))}
          </select>
        </td>
        <td>
          <input
            id={element.id}
            onChange={(e) => {
              handleChange(e.target.id, "name", e.target.value);
            }}
            onBlur={(e) => {
              handleChange(e.target.id, "name", e.target.value);
              handleCheck(e.target.value, e.target.id);
            }}
            style={{
              width: "300px",
              color: isNew ? "black" : "red",
            }}
            type="text"
            defaultValue={element.name}
          />
        </td>
      </tr>
    </>
  );
};

export default function NewModel() {
  const { token, types } = useContext(OpenModalContext);
  const [models, setModels] = useState([{ id: 1, name: "", type_id: "" }]);
  const [model_names, setModel_names] = useState([{ id: 1, name: "" }]);
  const [ready, setReady] = useState([true]);

  const handleChange = (rowId, name, value) => {
    const updatedRows = models.map((row) => {
      if (row.id == rowId) {
        return {
          ...row,
          [name]: value,
        };
      } else {
        return row;
      }
    });
    setModels(updatedRows);
  };

  const handlePlus = () => {
    setModel_names([...model_names, { id: model_names.length + 1, name: "" }]);
    ready.push(true);
    setReady(ready);
  };

  const handleSubmit = () => {
    if (ready.includes(false)) return;
    setReady([false]);
    axios
      .post(
        "/models",
        {
          data: models,
        },
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // window.location.reload();
        setReady([true]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div className="new-type-container">
        <header>
          <h2>Модель</h2>
        </header>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Вид мебели</th>
              <th>Модель</th>
            </tr>
          </thead>
          <tbody>
            {model_names.length &&
              model_names.map((e, i) => (
                <ModelRow
                  key={i}
                  ready={ready}
                  element={e}
                  setReady={setReady}
                  handleChange={handleChange}
                  i={i}
                  types={types}
                />
              ))}
          </tbody>
        </table>
        <button onClick={handlePlus} style={{ float: "left" }}>
          +
        </button>
        <button onClick={handleSubmit} style={{ float: "right" }}>
          {!ready.includes(false) ? "Создать" : "loading..."}
        </button>
      </div>
    </>
  );
}
