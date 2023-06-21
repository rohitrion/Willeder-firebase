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
  return (
    <>
      {log ? (
        <div>
          <MDBNavbar light bgColor='light'>
            <MDBContainer fluid>
              <MDBNavbarBrand href='#' className='ms-5'>
               (●'◡'●) Home
              </MDBNavbarBrand>
              <MDBNavbarBrand href='#'>Welcome {" "} {name}🙎</MDBNavbarBrand>
              <MDBNavbarBrand href='#' className='me-5' onClick={handleLogout}>
                Signout🛑
              </MDBNavbarBrand>
            </MDBContainer>
          </MDBNavbar>
          <br />
          <div className='card-container'>
            <Cards />
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}

export default Home


