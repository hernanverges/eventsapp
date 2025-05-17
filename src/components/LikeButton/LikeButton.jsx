import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import './LikeButton.css';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300); // resetea animación
  };

  return (
    <button
      onClick={toggleLike}
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