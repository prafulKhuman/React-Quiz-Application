// Register.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate  } from 'react-router-dom';
import { REGISTER_MUTATION } from '../../ApolloClient/Authentication/LogonApollo';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, { data }] = useMutation(REGISTER_MUTATION);
  const history = useNavigate ();

  const handleRegister = async () => {
    try {
      await register({ variables: { username, password } });
      history.push('/login');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
