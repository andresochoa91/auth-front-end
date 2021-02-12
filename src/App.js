import React, { useState } from 'react';
import './App.css';

function App() {

  const [ logged, setLogged ] = useState(false);
  const [ user, setUser ] = useState(null);

  return (
    logged ? (
      <div>
        <h2>Sign In</h2>
        <form>
          <label>Email</label>
          <input type="email"/>
          <label>Password</label>
          <input type="password"/>
          <input type="submit"/>
        </form>
        <h2>Sign Up</h2>
        <form>
          <label>Email</label>
          <input type="email"/>
          <label>Password</label>
          <input type="password"/>
          <label>Password Confirmation</label>
          <input type="password"/>
          <input type="submit"/>
        </form>
      </div>
    ) : (
      <p>Hello { user.email }</p>
    )
  );
}

export default App;
