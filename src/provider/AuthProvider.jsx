import { createContext } from "react";
// import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext(null)
// const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    // const [user, setUser] = useState(null)
    // const [loading, setLoading] = useState(true)


    // const createUser = (email, password) =>{
    //     setLoading(true)
    //     return createUserWithEmailAndPassword(auth, email, password)
    // }
    // const signInUser = (email, password) =>{
    //     setLoading(true)
    //     return signInWithEmailAndPassword(auth, email, password)
    // }

    // const logInWithGoogle = () =>{
    //     setLoading(true)
    //     return signInWithPopup(auth, googleProvider)
    // }
    // const logInWithGithub = () =>{
    //     setLoading(true)
    //     return signInWithPopup(auth, githubProvider)
    // }


    // const logOut = () =>{
    //     setLoading(true)
    //     return signOut(auth);
    // }

    // useEffect(() =>{
    //    const unSubscribe =  onAuthStateChanged(auth, currentUser =>{
    //         setUser(currentUser)
    //         setLoading(false)
    //         console.log("Observing ",currentUser)
    //     });
    //     return () =>{
    //         unSubscribe();
    //     }
    // }, [])


    const userInfo = {abc: "abc"}
    // const userInfo = {user, createUser,signInUser, logOut, logInWithGoogle, logInWithGithub, loading}
  
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;