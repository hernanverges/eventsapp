import Header from '../components/Header/Header.jsx';
import UserProfile from '../components/UserProfile/UserProfile.jsx';

function Profile() {

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) return <div>Iniciá sesión para ver tu perfil</div>;


return (
    <>
      <Header />
      <UserProfile userId={storedUser} />
    </>
  );

}

export default Profile;