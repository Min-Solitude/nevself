import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "@/configs/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function checkEmail(email: string) {
  
    let result = null;
    let error = null;
  
    try {
        result = await fetchSignInMethodsForEmail(auth, email);
    } catch(e) {
      error = e;
    }
  
    return { result, error };
}

export async function createAccountToCollection(email: string, password: string, purpose: string | null, phoneNumber: string, uid: string) {
    let result = null;
    let error = null;
  
    try {
        const userDocRef = doc(db, 'users', uid);
        await setDoc(userDocRef, {
            username: email,
            purpose: purpose,
            phoneNumber: phoneNumber,
            uid: uid,
            role: 'user',
            status: 'active',
            loginBy: 'account',
        });

        result = {
            uid: uid,
            username: email,
            purpose: purpose,
            phoneNumber: phoneNumber,
            role: 'user',
            status: 'active',
            loginBy: 'account',
        }
    } catch(e) {
      error = e;
    }
  
    return { result, error };
}

export async function createrAccount(email: string, password: string) {
    let result = null;
    let error = null;
  
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch(e) {
      error = e;
    }
  
    return { result, error };
}

export async function login(username: string, password: string) {
    let result = null;
    let error = null;
  
    try {
        result = await signInWithEmailAndPassword(
            auth,
            `${username}@gmail.com`,
            password,
        );
    } catch(e) {
      error = e;
    }
  
    return { result, error };
}

export async function getAccountByUid(uid: string) {
    let result = null;
    let error = null;
  
    try {
        const userDocRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            result = docSnap.data();
        } else {
            result = null;
        }
    } catch(e) {
      error = e;
    }
  
    return { result, error };
}



////////////////////////////////////////

export async function loginByGoogle() {
    let result = null;
    let error = null;
  
    try {
        const login = await signInWithPopup(auth, provider);

        console.log(login);
        

        // if(login.user){
        //     result = login;
        // }else
        //     result = null;
            
    } catch(e) {
    //   error = e;
    console.log(e);
    
    }
  
    return { result, error };
}

export async function checkAccount(uid: string){
    let result = null;
    let error = null;
  
    try {
        const userDocRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            result = docSnap.data();
        } else {
            result = null;
        }
    } catch(e) {
      error = e;
    }
  
    return { result, error };
}