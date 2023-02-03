import React from 'react'
import { useState } from 'react';
// here we are importing "auth" from "config folder in firebase"
// Afterwards we are importing the type of service ha we want to access from "firebase/auth" 
import {auth , googleProvider} from "../config/firebase"
import {createUserWithEmailAndPassword , signInWithPopup , signOut} from "firebase/auth";
function Auth() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  // We are trying to output the email of he current signed in user
  console.log(auth?.currentUser?.email);
  const signIn = async() => {
    try{await createUserWithEmailAndPassword(auth,email,password);}
    catch(err){
      console.error(err);
    }
    
  }

  const signInWithGoogle = async() =>{
    try{await signInWithPopup(auth , googleProvider);}
    catch(err){
      console.error(err);
    }
  }

  const logOut = async() =>{
    try{await signOut(auth );}
    catch(err){
      console.error(err);
    }
  }

  return (
    <div>
        <input type="email" placeholder='Email....'
        onChange={(e)=>{setEmail(e.target.value)}}
        />
        <input type="password" placeholder='Password...' 
        onChange={(e)=>{setPassword(e.target.value)}} 
        />
        <button onClick={signIn}>Sign In</button>
        {/* <br /> */}
        <button onClick={signInWithGoogle}>Sign In with Google</button>
        {/* <br /> */}
        <button onClick={logOut}>LogOut</button>
    </div>
  )
}

export default Auth