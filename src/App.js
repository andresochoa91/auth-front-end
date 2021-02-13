import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import cookie from 'react-cookies';

const App = () => {

  const [ user, setUser ] = useState(null);
  const loginEmail = useRef("");
  const loginPassword = useRef("");
  const signUpEmail = useRef("");
  const signUpPassword = useRef("");
  const signUpPasswordConfirmation = useRef("");

  const domain = "https://auth-rails-psql.herokuapp.com";
  // const domain = "http://localhose:3000";

  const setCurrentUser = () => {
    const token = cookie.load("token")
    if (token) {
      fetch(`${domain}/current_user`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setUser(data.user)
        }
        console.log(data)
      })
      .catch(console.error);
    }
  };

  useEffect(setCurrentUser, []);

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    fetch(`${domain}/login`, {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: loginEmail.current.value,
        password: loginPassword.current.value
      })
    })
    .then(response => {
      const auth = response.headers.get("authorization")
      cookie.save("token", auth, { path: "/" });
      setCurrentUser();
      return response.json();
    })
    .then(console.log)
    .catch(console.error);
  };
  
  const handleSubmitSignUp = (event) => {
    event.preventDefault();
    fetch(`${domain}/signup`, {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signUpEmail.current.value,
        password: signUpPassword.current.value,
        password_confirmation: signUpPassword.current.value
      })
    })
    .then(response => {
      const auth = response.headers.get("authorization")
      cookie.save("token", auth, { path: "/" });
      setCurrentUser();
      return response.json();
    })
    .then(console.log)
    .catch(console.error);
  };

  return (
    !user ? (
      <div>
        <h2>Sign In</h2>
        <form onSubmit={ handleSubmitLogin } >
          <label>Email</label>
          <input 
            type="email"
            name="loginEmail"
            ref={ loginEmail }
            defaultValue="user1@gmail.com"
          />
          <label>Password</label>
          <input 
            type="password"
            name="loginPassword"
            ref={ loginPassword }
            defaultValue="123456789"
          />
          <input type="submit"/>
        </form>

        <h2>Sign Up</h2>
        <form onSubmit={ handleSubmitSignUp }>
          <label>Email</label>
          <input
            type="email"
            name="signUpEmail"
            ref={ signUpEmail }
            defaultValue="user1@gmail.com"
          />
          <label>Password</label>
          <input 
            type="password"
            name="signUpPassword"
            ref={ signUpPassword }
            defaultValue="123456789"
          />
          <label>Password Confirmation</label>
          <input 
            type="password"
            name="signUpPasswordConfirmation"
            ref={ signUpPasswordConfirmation }
            defaultValue="123456789"
          />
          <input type="submit"/>
        </form>
      </div>
    ) : (
      <>
        <button
          onClick={() => {
            cookie.remove("token", { path: "/" });
            window.location.reload();
          }}
        >
          Sign Out
        </button>
        <p>Hello { user.email }</p>
      </>
    )
  );
};

export default App;
