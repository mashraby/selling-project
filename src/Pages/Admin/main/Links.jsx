import { NavLink } from "react-router-dom";

export default function AdminLinkList() {
  return (
    <>
      <div className="admin-link-container">
        <ul className="link-list">
          <li className="link-item">
            <NavLink className={"admin-link"} to={"new-model"}>
              New Model
            </NavLink>
          </li>
          <li className="link-item">
            <NavLink className={"admin-link"} to={"new-furniture-type"}>
              New Furniture Type
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
