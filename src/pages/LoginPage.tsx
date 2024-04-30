import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import validateCredentials from '../utils/validateCredentials.tsx';
import client from '../client/client.ts';

const styles = ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#a3b18a',
    width: '100%',
    borderRadius: 10,
    padding: '2%',
  },
  disabledButton: {
    backgroundColor: '#a3b18a',
    width: '100%',
    borderRadius: 10,
    padding: '2%',
    opacity: 0.5,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
  },
  registerButton: {
    paddingTop: '2%',
    display: 'flex',
    flexDirection: 'row',
  },
  textButtonGreen: {
    color: '#a3b18a',
  },
  textButtonGreenBold: {
    color: '#a3b18a',
    fontWeight: '700',
  },
});

function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const onButtonClick = async () => {
    // You'll update this function later...
    if (!validateCredentials.validateEmail(email)) {
      setEmailError('Enter a valid email');
      return;
    }
    if (!validateCredentials.validatePassword(password)) {
      setPasswordError('Enter a password longer than');
      return;
    }
    // eslint-disable-next-line max-len
    const data: {access_token: string} | null = await client.login(email, password);

    if (!data?.access_token) {
      setLoginError('L\'adresse email ou le mot de passe est incorrect');
      return;
    }
    localStorage.setItem('access_token', data.access_token);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Login</div>
      <div style={styles.input}>
        <input
          style={styles.input}
          value={email}
          placeholder="Email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <label>{emailError}</label>
      </div>
      <div style={styles.input}>
        <input
          type="password"
          style={styles.input}
          value={password}
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <label>{passwordError}</label>
      </div>
      {loginError && (
        <Typography style={{ color: 'red' }}>{loginError}</Typography>
      )}
      <div style={styles.button}>
        <input type="button" onClick={onButtonClick} value="Log in" />
      </div>
    </div>
  );
}

export default LoginPage;
