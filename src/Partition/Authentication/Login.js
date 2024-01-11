// Login.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate  } from 'react-router-dom';
import { LOGIN_MUTATION } from '../../ApolloClient/Authentication/LogonApollo';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data }] = useMutation(LOGIN_MUTATION);
  const history = useNavigate ();

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem('token', data.login);
      history.push('/');
      console.log(data.login);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
