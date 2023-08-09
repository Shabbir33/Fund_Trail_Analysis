import React, {useEffect, useState} from "react";
import * as Components from './Components';
import { useNavigate } from "react-router-dom";
import "./stylesLogin.css"
import store from "../stores/store";

function LoginPage() {
    const Store = store()
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   const setNavbar = Store.setNavbar

   useEffect(() => {
    setNavbar(false)
   }, [])

   const navigate = useNavigate()

   const handleSignIn = async (event) => {
       event.preventDefault();

       // Basic client-side validation
       if (!email || !password) {
           setError('Please fill in both email and password fields.');
           return;
       }

       // Perform server-side validation (simulated here)
       // In a real LoginPagelication, you would send a request to your backend for validation
       // For this example, let's assume the authentication succeeds
       try {
       // Simulating a successful response
       var response = 'false'
       if (password === 'testing')
           response = 'true';

       if (response === 'true') {
           // Successful authentication, you might redirect or show a success message
           setError('');
           alert('Sign in successful!');
           setNavbar()
           navigate("/home")
       } else {
           setError('Invalid email or password.');
       }
       } catch (error) {
       setError('An error occurred during login.');
       }
       };

       const [signIn, toggle] = React.useState(true);
     
   return(
    <div style={{justifyContent: "center", margin:"auto"}}>
       <Components.Container style={{marginLeft:"25px",paddingLeft:"1000px", paddingRight:"800px", marginTop: "150px"}}>
           <Components.SignInContainer signinIn={signIn}>
               <Components.Form onSubmit={handleSignIn}>
                   <Components.Title>Sign in</Components.Title>
                   <Components.Input
                   type='email'
                   placeholder='Email'
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   />
                   <Components.Input
                   type='password'
                   placeholder='Password'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   />
                   {error && <p style={{ color: 'red' }}>{error}</p>}
                   <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                   <Components.Button>Sigin In</Components.Button>
               </Components.Form>
           </Components.SignInContainer>

           <Components.OverlayContainer signinIn={signIn}>
               <Components.Overlay signinIn={signIn}>
                   <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>FUND TRAIL ANALYSIS TOOL BY TEAM 404</Components.Title>
                   </Components.RightOverlayPanel>
               </Components.Overlay>
           </Components.OverlayContainer>

         </Components.Container>
         </div>
     )
}

export default LoginPage;