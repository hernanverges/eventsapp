import { useState } from 'react';
import '../stylesheets/AuthModal.css';


export default function AuthModal({ onClose }) {

  const API = import.meta.env.VITE_API_URL;
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviar datos");

    if (!isLogin) {
      if (password !== repeatPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
  
      const response = await fetch(`${API}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: username,
          password,
          mail: email,
        }),
      });
    
      const data = await response.json();
    
      if (response.ok) {
        alert('Usuario registrado con éxito');
        onClose(); // o cambiá a login automáticamente
      } else {
        alert(data.error || 'Ocurrió un error');
      }
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
        <form onSubmit={handleSubmit}>
          <input
          type="email"
          placeholder="Email"
          required value={email}
          onChange={(e) => setEmail(e.target.value)} />
          <input
          type="password"
          placeholder="Contraseña"
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
          {!isLogin && (
            <><input
            type="password"
            placeholder="Repite la contraseña"
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)} />
            <input
            type="text"
            placeholder="Nombre de usuario"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)} /></>
          )}
          <button type="submit">{isLogin ? 'Ingresar' : 'Registrarme'}</button>
        </form>
        <p>
          {isLogin
            ? '¿No tenés cuenta? '
            : '¿Ya tenés cuenta? '}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Registrate' : 'Iniciá sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}