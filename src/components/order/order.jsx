import { useContext, useEffect, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import accounting from "accounting";
import { OpenModalContext } from "../../Contexts/ModalContext/ModalContext";

function OrderRow({
  i,
  e,
  handleChange,
  cathegoryOptions,
  typeOptions,
  modelOptions,
  allModels,
}) {
  const [price, setPrice] = useState(e.price);
  const [models, setModels] = useState(modelOptions);
  const filterModels = (selectType) => {
    const filteredModels = allModels.filter((e) => e.type == selectType);
    setModels(filteredModels);
  };
  return (
    <Tr>
      <Td>
        {" "}
        <Select
          variant="filled"
          placeholder="Категория..."
          name="cathegory"
          id={e.id}
          onChange={(event) =>
            handleChange(event, event.target.id, "cathegory")
          }
          onBlur={(event) => handleChange(event, event.target.id, "cathegory")}
        >
          {cathegoryOptions?.map((el, ind) => (
            <option value={el}>{el}</option>
          ))}
        </Select>
      </Td>
      <Td>
        {e.cathegory == "заказ" ? (
          <Input
            type="text"
            placeholder={"авто"}
            disabled={true}
            id={e.id}
            onChange={(event) =>
              handleChange(event, event.target.id, "orderId")
            }
            onBlur={(event) => {
              handleChange(event, event.target.id, "orderId");
            }}
          />
        ) : (
          <Input
            type="text"
            placeholder={e.cathegory == "заказ" ? "авто" : "id"}
            id={e.id}
            onChange={(event) =>
              handleChange(event, event.target.id, "orderId")
            }
            onBlur={(event) => {
              handleChange(event, event.target.id, "orderId");
            }}
          />
        )}
      </Td>
      <Td>
        {" "}
        <Select
          placeholder="Выберите вид..."
          name="type"
          id={e.id}
          onChange={(event) => {
            handleChange(event, event.target.id, "type");
            filterModels(event.target.value);
          }}
          onBlur={(event) => {
            handleChange(event, event.target.id, "type");
            filterModels(event.target.value);
          }}
        >
          {typeOptions.map((el, ind) => (
            <option value={el.name}>{el.name}</option>
          ))}
        </Select>
      </Td>
      <Td>
        <Select
          placeholder="Выберите модель..."
          name="model"
          id={e.id}
          onChange={(event) => handleChange(event, event.target.id, "model")}
          onBlur={(event) => handleChange(event, event.target.id, "model")}
        >
          {models.map((el, ind) => (
            <option value={el.id}>{el.name}</option>
          ))}
        </Select>
      </Td>
      <Td>
        <Input
          type="text"
          id={e.id}
          defaultValue={e.tissue}
          onChange={(event) => handleChange(event, event.target.id, "tissue")}
          onBlur={(event) => handleChange(event, event.target.id, "tissue")}
        />
      </Td>
      <Td>
        <Input
          type="text"
          id={e.id}
          defaultValue={e.title}
          onChange={(event) => handleChange(event, event.target.id, "title")}
          onBlur={(event) => handleChange(event, event.target.id, "title")}
        />
      </Td>
      <Td>
        <Input
          type="text"
          id={e.id}
          value={accounting.formatNumber(price, 0, " ")}
          onChange={(event) => {
            handleChange(event, event.target.id, "price");
            setPrice(accounting.unformat(event.target.value));
          }}
          onBlur={(event) => {
            handleChange(event, event.target.id, "price");
            setPrice(accounting.unformat(event.target.value));
          }}
        />
      </Td>
      <Td>
        <Input
          type="number"
          id={e.id}
          defaultValue={e.sale}
          onChange={(event) => handleChange(event, event.target.id, "sale")}
          onBlur={(event) => handleChange(event, event.target.id, "sale")}
        />
      </Td>
      <Td>
        <Input
          type="number"
          id={e.id}
          defaultValue={e.qty}
          onChange={(event) => handleChange(event, event.target.id, "qty")}
          onBlur={(event) => handleChange(event, event.target.id, "qty")}
        />
      </Td>
      <Td>
        <Heading variant="h5" size="sm">
          {accounting.formatNumber(e.sum, 0, " ")}
        </Heading>
      </Td>
    </Tr>
  );
}

function OrderTable() {
  const [state, setState] = useState(1);

  const {
    row,
    setRow,
    isOpenModal,
    setIsOpenModal,
    orderShow,
    setOrderShow,
    setOpenApply,
    types,
    setTypes,
    allModels,
    setAllModels,
  } = useContext(OpenModalContext);
  useEffect(() => {
    const mappedData = row.map((e) => {
      return {
        ...e,
        sum: e.price * e.qty * (1 - e.sale * 0.01),
      };
    });
    setRow(mappedData);
  }, [state]);
  const cathegoryOptions = ["заказ", "продажа с витрины", "продажа со склада"];
  const modelOptions = allModels;


  const handlePlus = () => {
    row.push({
      id: row.length + 1,
      cathegory: "hey",
      type: "",
      model: "",
      title: "",
      price: 0,
      sale: 0,
      qty: 0,
      sum: 0,
    });
    setRow(row);
    setState(state + 1);
  };

  function handleChange(event, rowId, fieldName) {
    // console.log(event.target.value);
    const updatedRows = row.map((row) => {
      if (row.id == rowId) {
        if (fieldName == "price") {
          return {
            ...row,
            [fieldName]: accounting.unformat(event.target.value),
            ["sum"]:
              accounting.unformat(event.target.value) *
              row.qty *
              (1 - row.sale * 0.01),
          };
        }
        if (fieldName == "qty") {
          return {
            ...row,
            [fieldName]: event.target.value,
            ["sum"]: row.price * event.target.value * (1 - row.sale * 0.01),
          };
        }
        if (fieldName == "sale") {
          return {
            ...row,
            [fieldName]: event.target.value,
            ["sum"]: row.price * row.qty * (1 - event.target.value * 0.01),
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
    setRow(updatedRows);
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading fontSize={{ base: "18px", md: "26px", lg: "32px" }} my={5}>
          Прием заказа
        </Heading>
        <Button
          onClick={() => {
            setOpenApply(true);
            setOrderShow(false);
          }}
        >
          Подача заявки на оплату
        </Button>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>категория</Th>
              <Th>ID_______</Th>
              <Th>вид мебели</Th>
              <Th>модель</Th>
              <Th>ткань</Th>
              <Th>примечание</Th>
              <Th> ц е н а </Th>
              <Th>скидка</Th>
              <Th>кол-во</Th>
              <Th>сумма</Th>
            </Tr>
          </Thead>
          <Tbody>
            {row &&
              row.map((e, i) => {
                return (
                  <OrderRow
                    key={i}
                    i={i}
                    e={e}
                    handleChange={handleChange}
                    cathegoryOptions={cathegoryOptions}
                    typeOptions={types}
                    modelOptions={modelOptions}
                    allModels={allModels}
                  />
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <div
        className="footer_buttons"
        style={{ display: orderShow ? "block" : "none" }}
      >
        <Button onClick={handlePlus}>+</Button>
        <Button
          style={{ float: "right" }}
          onClick={() => {
            setIsOpenModal(true);
            setOrderShow(false);
          }}
        >
          submit
        </Button>
      </div>
      {/* <div>
        <button
          style={{ position: "absolute", top: "0", left: "0" }}
          onClick={handleOut}
        >
          Log Out
        </button>
      </div> */}
    </>
  );
}

export default OrderTable;
