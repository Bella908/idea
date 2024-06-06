
import { createContext, useEffect, useState } from "react";
import auth from "../FireBase/FireBase.int";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";




export const AuthContext = createContext()
const AuthProvider = ({children}) => {

    const[user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

const googleAuthProvider = new GoogleAuthProvider();

useEffect(() => {
    const unSubscribe =  onAuthStateChanged(auth, currentUser => {
         console.log('user is the auth state changed', currentUser);
         setUser(currentUser);
         setLoading(false);
     });
     return() =>{
        unSubscribe() ;
     }
 }, [])


const sighIn = (email , password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth , email , password);
}

const logOut = () =>{
    setLoading(true);
    return signOut(auth);

}

const googleLogin = () =>{
    setLoading(true);
    return signInWithPopup(auth,googleAuthProvider)
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    

    const userInfo ={
        user,
        setUser,
        loading,
        sighIn,
        createUser,
        logOut,
        googleLogin,

    }
    return (
        <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;