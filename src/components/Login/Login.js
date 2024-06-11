import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/login-api.js'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
    } else {
      onLogin(username, password);
    }
  };

  const onLogin = async (username, password) => {
    try {
      const response = await api.post('', { username: username, password: password });
      if(response.data.hasAccess === true) {
        navigate('/main');
      };
    } catch (error) {
      console.log(error);
      setError('Usuário ou senha incorretos')
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setIsUsernameTouched(true)}
          onFocus={() => setError('')} // Clear error message on focus
          style={(isUsernameTouched && !username) ? { ...styles.input, ...styles.error } : styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setIsPasswordTouched(true)}
          onFocus={() => setError('')} // Clear error message on focus
          style={(isPasswordTouched && !password) ? { ...styles.input, ...styles.error } : styles.input}
        />
        <button type="submit" style={styles.button}>Entrar</button>
        {error && <p style={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  error: {
    border: '1px solid red',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Login;