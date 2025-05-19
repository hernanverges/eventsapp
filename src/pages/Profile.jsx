import Header from '../components/Header/Header.jsx';
import UserNavBar from '../components/UserNavBar/UserNavBar.jsx';
import { Outlet } from 'react-router-dom';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (!storedUser) return <div>Iniciá sesión para ver tu perfil</div>;

  return (
    <>
      <Header />
      <UserNavBar />
      <Outlet /> 
    </>
  );
}

export default Profile;
