import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../firebase/firebase'
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        }).then((result) => {
            console.log('Auth provider Page', result)
        }).catch((error) => {
            console.log('Auth provider Page', error);
        });
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
                const userInfo = {
                    email: currentUser.email,
                }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                         if(res.data.token){
                            localStorage.setItem('access-token',res.data.token);
                            setLoading(false);
                         }
                    })
            } else {
                localStorage.removeItem('access-token');
                setUser(null);
                setLoading(false);
            }
        });
        return () => {
            return unSubscribe();
        }
    }, [axiosPublic])









    const authInfo = { createUser, signInUser, loading, logout, googleSignIn, updateUserProfile, user }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;