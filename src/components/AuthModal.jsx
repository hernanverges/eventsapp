import { useState } from 'react';
import '../stylesheets/AuthModal.css'; 

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviar datos");
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Contraseña" required />
          {!isLogin && (
            <input type="text" placeholder="Nombre de usuario" required />
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