import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export function useAuthentication() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user
  };
}