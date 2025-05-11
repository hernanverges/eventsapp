import { useState } from 'react';
import '../stylesheets/AuthModal.css';
import { Link } from 'react-router-dom';


export default function AuthModal({ onClose }) {

  const API = import.meta.env.VITE_API_URL;
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log('Enviar datos');

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
        setEmailSent(true);
      } else {
        alert(data.error || 'Ocurrió un error en el registro');
      }
    }
  };

  return (
    <div className='auth-modal-overlay'>
      <div className='auth-modal'>
        <button className='close-btn' onClick={onClose}>Cerrar ✖</button>
  
        {emailSent ? (
          <div className='success-message'>
            <h3>📩 Verificá tu correo</h3>
            <p>Te enviamos un mail para activar tu cuenta.</p>
            <p>Revisá también la carpeta de spam.</p>
            <Link className='nav-Link' to='/'>Home</Link>
          </div>
        ) : (
          <>
            <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Contraseña'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isLogin && (
                <>
                  <input
                    type='password'
                    placeholder='Repite la contraseña'
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                  <input
                    type='text'
                    placeholder='Nombre de usuario'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </>
              )}
              <button className='log-button' type='submit'>{isLogin ? 'Ingresar' : 'Registrarme'}</button>
            </form>
            <p>
              {isLogin ? '¿No tenés cuenta? ' : '¿Ya tenés cuenta? '}
              <button className='log-button' onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Registrate' : 'Iniciá sesión'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}