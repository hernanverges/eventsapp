import { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import './LikeButton.css';

const LikeButton = ({ eventId }) => {
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const token = localStorage.getItem('token');


  useEffect(() => {
    const checkIfLiked = async () => {
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Error al obtener perfil');

        const user = await response.json();

        if (user.likedEvents && user.likedEvents.includes(eventId)) {
          setLiked(true);
          setAnimate(true);
          setTimeout(() => setAnimate(false), 300);
        }
      } catch (error) {
        console.error('Error al verificar liked:', error);
      }
    };

    checkIfLiked();
  }, [eventId, token]);

  const handleLike = async () => {
    try {
      console.log("Enviando evento:", { eventId });
      const response = await fetch("http://localhost:5000/api/users/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ eventId })
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      setLiked(prevLiked => !prevLiked);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    } catch (error) {
      console.error("Error al guardar like:", error);
    }
  };

  if (!token) return null; 

  return (
    <button
      onClick={handleLike}
      className={`like-button ${animate ? 'animate' : ''}`}
    >
      {liked ? (
        <AiFillHeart color="red" size={28} />
      ) : (
        <AiOutlineHeart color="gray" size={28} />
      )}
    </button>
  );
};

export default LikeButton;
