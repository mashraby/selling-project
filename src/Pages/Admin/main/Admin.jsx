import { Route, Routes } from "react-router-dom";
import NewFurnitureType from "../NewFurnitureType";
import NewModel from "../NewModel";
import AdminLinkList from "./Links";

export default function Admin() {
  return (
    <>
      <Routes>
        <Route path="/new-model" element={<NewModel />} />
        <Route path="/new-furniture-type" element={<NewFurnitureType />} />
        <Route path="/" element={<AdminLinkList />} />
      </Routes>
    </>
  );
}
