import { Link } from 'react-router-dom';
import './UserNavBar.css';

export default function UserNavBar(){
    return (
        <div className='usernav-container'>
                    <Link className='usernavbar-link' to="/profile">Mi perfil</Link>
                    <Link className='usernavbar-link' to="/profile/events">Mis eventos</Link>
        </div>
    )
}