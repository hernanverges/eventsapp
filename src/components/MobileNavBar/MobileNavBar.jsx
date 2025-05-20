import { Link } from 'react-router-dom';
import { FaHouseUser, FaMapMarkedAlt, FaCalendarAlt, FaUser, FaSearch } from 'react-icons/fa';
import './MobileNavBar.css';

function MobileNavBar ( {isLoggedIn, openAuthModal}) {

    return(
        <>
        <div className='mobile-navbar'>
<Link to='/' className='nav-icon'>
    <FaHouseUser />
  </Link>
  {isLoggedIn ? (
            <Link className='nav-icon' to='/profile'><FaUser /></Link>
          ) : (
            <Link className='nav-icon' onClick={openAuthModal}><FaUser /></Link>
          )}
  <Link to='/events' className='nav-icon'>
    <FaCalendarAlt />
  </Link>
  <Link to='/search' className='nav-icon'>
    <FaSearch />
  </Link>
  <Link to='/map' className='nav-icon'>
    <FaMapMarkedAlt />
  </Link>
</div></>
    )
}

export default MobileNavBar;