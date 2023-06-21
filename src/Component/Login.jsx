import React from 'react';
import { useState } from 'react';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {


    const navigate = useNavigate();
    const [values, setvalues] = useState({
        email: "",
        pass: ""
    })

    const [error, seterror] = useState('')  //for error state 
    const [submitdisabel, setsubmitdisable] = useState(false)  // for disbale button for api 

    const handleSubmit = () => {
        if (!values.email || !values.pass) {
            seterror("Please Fill  All Feilds");
            return;
        }
        seterror('');
        setsubmitdisable(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then((res) => {
                setsubmitdisable(false);
                navigate('/data')
                console.log(res)
            }).catch((err) => {
                setsubmitdisable(false)
                seterror(err.message)
            })
    }

    return (
        <MDBContainer fluid>
            <MDBRow>

                <MDBCol sm='6'>

                    <div className='d-flex flex-row ps-5 pt-5 mb-7'>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
                        <span className="h1 fw-bold mb-0">Willeder</span>
                    </div>

                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

                        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

                        <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"

                            onChange={(e) => {
                                setvalues((prev) => ({ ...prev, email: e.target.value }))
                            }} />
                        <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlL' type='password' size="lg"
                            onChange={(e) => {
                                setvalues((prev) => ({ ...prev, pass: e.target.value }))
                            }} />

                        <div className='d-flex flex-row justify-content-center mb-4'>
                            <b className='error'>{error}</b>
                        </div>

                        <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleSubmit} disabled={submitdisabel} >Login</MDBBtn>
                        <p className="small mb-5 pb-lg-3 ms-5"> <Link to='/reset' class="text-muted" ><b>Forgot password ?</b></Link></p>
                        <p className='ms-5'>Don't have an account?{' '}<Link to="/register" class="link-info" >Register here</Link></p>

                    </div>

                </MDBCol>

                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                        alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left', height: "100vh" }} />
                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default Login;
