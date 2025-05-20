import Header from '../components/Header/Header.jsx';
import MobileNavBar from '../components/MobileNavBar/MobileNavBar.jsx';
import UserNavBar from '../components/UserNavBar/UserNavBar.jsx';
import { Outlet } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile.jsx';

function Profile() {
  const isMobile = useIsMobile();

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (!storedUser) return <div>Iniciá sesión para ver tu perfil</div>;

  return (
    <>
      {isMobile ? <MobileNavBar /> :
      <Header /> }
      <UserNavBar />
      <Outlet /> 
    </>
  );
}

export default Profile;
