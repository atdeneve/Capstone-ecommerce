import {useContext, useState, useRef } from "react";
import { Link, Navigate } from 'react-router-dom';
import { ShoppingCartContext } from "../../contexts";
import './login.css'

function LogIn() {
  const { userAccount, saveAccount, saveLogOut } = useContext(ShoppingCartContext);
  const [ view, setView ] = useState("user-info");
  const form = useRef(null);

  const userHasAccount =  userAccount && Object.keys(userAccount).length !== 0;

  const handleLogIn = () => {
    saveLogOut(false);
    return <Navigate replace to={"/"}/>
  }

  const createAnAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    saveAccount(data);
    handleLogIn()
  }

  const renderLogIn = () => {
    return (
      <>
        <div className="my-container">
          <p className="create-account-text">
            {userHasAccount ? userAccount?.name : "Create an Account"}
          </p>
          <Link to="/">
            <button
              className='btn-login'
              onClick={() => handleLogIn()}
              disabled={!userHasAccount}
            >
              Log In
            </button>
          </Link>
          <button
            className={`btn-register`}
            onClick={ () => setView("create-user-info")}
            disabled={userHasAccount}
          >Register</button>
        </div>
      </>
    )
  }

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className="my-form">
        <div className="input-fields">
          <label htmlFor="name" className="input-fields-label">
            Your name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={userAccount?.name}
            placeholder="Your name here"
            className="input-field"/>
        </div>
        <div className="input-fields">
          <label htmlFor="email" className="input-fields-label">
            Your email: 
          </label>
          <input 
            type="text"
            id="email"
            name="email"
            defaultValue={userAccount?.email}
            placeholder="exampleemail@email.com"
            className="input-field"
          />
        </div>
        <div className="input-fields">
          <label htmlFor="password" className="text-label">
            Your password:
          </label>
          <input 
            type="text"
            id="password"
            name="password"
            defaultValue={userAccount?.password}
            placeholder="your password"
            className="input-field"
          />
        </div>
        <Link to="/">
          <button 
            className="btn-create-account"
            onClick={() => createAnAccount()}
          >Create</button>
        </Link>
      </form>
    )
  }

  const renderView = () =>
    view === "create-user-info" ? renderCreateUserInfo() : renderLogIn()
  
  return (
    <>
      <h1 className="header">Welcome to Fast Fashion!!</h1>
      {renderView()}
    </>
  )
}

export { LogIn }


