import { useContext, useState, useRef } from "react";
import { ShoppingCartContext } from "../../contexts";
import "./myaccount.css";

function MyAccount() {
  const { saveAccount } = useContext(ShoppingCartContext);
  const [ view, setView ] = useState("user-info");
  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);
  const form = useRef(null);

  const editAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    saveAccount(data);
  }

  const renderUserInfo = () => {
    return(
      <div className="my-account-info">
        <p>
          <span className="my-account-details">Name: </span>
          <span>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className="my-account-details">Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <button
          className="edit-button"
          onClick={() => setView("edit-user-info")}
        >Edit</button>
      </div>
    )
  }

  const renderEditUserInfo = () => {
    return (
      <form ref={form} className="my-account-edit-form">
        <div> 
          <label htmlFor="name" className="my-account-edit-form-label">Your name: </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount.name}
            placeholder="Your name..."
            className="my-account-edit-form-info"
          />
        </div>
        <div>
          <label htmlFor="email" className="my-account-edit-form-label">Your email: </label>
          <input 
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount.email}
            placeholder="exampleemail@email.com"
            className="my-account-edit-form-info"
          />
        </div>
        <div>
          <label htmlFor="password" className="my-account-edit-form-label">Your password: </label>
          <input 
            type="text"
            id="password"
            name="password"
            defaultValue={parsedAccount.password}
            placeholder="password..."
            className="my-account-edit-form-info"
          />
        </div>
        <button
          className="my-account-edit-form-button"
          onClick={() => {
            setView("user-info"), editAccount();
          }}
        >
          Edit
        </button>
      </form>
    )
  }

  const renderView = () =>
    view === "edit-user-info" ? renderEditUserInfo() : renderUserInfo();

    return (
      <>
        <h1 className="my-account-title" >My Account</h1>
        {renderView()}
      </>
    )
}

export { MyAccount };