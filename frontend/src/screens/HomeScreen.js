import React, { useEffect, useState } from "react";
import Loader from "components/Loader";
import Message from "components/Message";
import { useDispatch, useSelector } from "react-redux";

import { loginUser, registerUser, logoutUser } from "actions/userActions";

function HomeScreen() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [l_email, setL_email] = useState("");
  const [r_email, setR_email] = useState("");
  const [l_password, setL_password] = useState("");
  const [r_password, setR_password] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { ul_error, userInfo, ul_loading } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { ur_error, userCreated, ur_loading } = userRegister;

  useEffect(() => {}, []);

  function registerUserHandler(e) {
    e.preventDefault();
    dispatch(registerUser(name, r_email, r_password));
  }

  function loginUserHandler(e) {
    e.preventDefault();
    dispatch(loginUser(l_email, l_password));
  }

  function logoutUserHandler(e) {
    e.preventDefault();
    dispatch(logoutUser());
  }

  return (
    <div>
      {userInfo ? (
        <div>
          {userCreated == userInfo.id && (
            <Message message="Uživatel Byl úspěšně vytvořen" />
          )}
          <h2>Ahoj {userInfo.email}</h2>
          <button onClick={logoutUserHandler}>Odhlásit se</button>
        </div>
      ) : (
        <div>
          {ur_loading ? (
            <Loader />
          ) : ur_error ? (
            <Message message={ur_error} />
          ) : (
            <form onSubmit={registerUserHandler}>
              <div>
                <label htmlFor="r_name">Jméno</label>
                <input type="text" id="r_name" onChange={(e) => setName(e.target.value)} value={name}/>
              </div>

              <div>
                <label htmlFor="r_email">Email</label>
                <input type="email" id="r_email" onChange={(e) => setR_email(e.target.value)} value={r_email}/>
              </div>

              <div>
                <label htmlFor="r_name">Heslo</label>
                <input type="password" id="r_password" onChange={(e) =>setR_password(e.target.value)} value={r_password} />
              </div>

              <button type="submit">Registrovat se</button>
            </form>
          )}
          {ul_loading ? (
            <Loader />
          ) : ul_error ? (
            <Message message={ul_error} />
          ) : (
            <form onSubmit={loginUserHandler}>
              <div>
                <label htmlFor="l_email">Email</label>
                <input type="email" id="l_email"  onChange={(e) =>setL_email(e.target.value)} value={l_email}/>
              </div>
              <div>
                <label htmlFor="l_name">Heslo</label>
                <input type="password" id="l_password"  onChange={(e) =>setL_password(e.target.value)} value={l_password}/>
              </div>{" "}
              <button type="submit">Přihlásit se</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
