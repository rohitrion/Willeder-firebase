import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand
  ,
} from 'mdb-react-ui-kit';
import Cards from './Cards';

function Home({ name, log }) {

  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth).then(() => {          // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
    });

  }

  if (!log) {
    navigate('/');
    return null;
  }

  return (
    <>
     <div>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#' className='ms-5'>
            (●'◡'●) Home
          </MDBNavbarBrand>
          <MDBNavbarBrand href='#'>Welcome {name}🙎</MDBNavbarBrand>
          <MDBNavbarBrand href='#' className='me-5' onClick={handleLogout}>
            Signout🛑
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <br />
      <div >
        <Cards />
      </div>
    </div>
    </>
  );
}

export default Home


//className='card-container'