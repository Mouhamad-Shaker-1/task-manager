import React, { createContext, useState, useCallback } from "react";

export const UsersContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("current-user");
    return user ? JSON.parse(user) : null;
  });

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
    return parsedUsers.filter((user) => user.email !== currentUser?.email);
  });

  const reloadData = useCallback((newUser) => {
    // this callback function make update local easyer
    // when i chnage the user in localStorge the state here update in this functoin
    const user = localStorage.getItem("current-user");
    setCurrentUser(user ? JSON.parse(user) : null);

    if (newUser) {
      const storedUsers = localStorage.getItem("users");
      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
      setUsers(parsedUsers.filter((user) => user.email !== newUser.email));
    }
  }, []);

  return (
    <UsersContext.Provider
      value={{ currentUser, users, setCurrentUser, reloadData }}
    >
      {children}
    </UsersContext.Provider>
  );
};

//   const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("current-user")));
//   const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users"))?.filter(user => user.email !== currentUser.email))
// // JSON.parse(localStorage.getItem("current-user")) || null
//   const reloadData = useCallback((newUser) => {
//     console.log(localStorage.getItem('current-user'))
//     setCurrentUser(() => {
//       const user = localStorage.getItem("current-user");
//       console.log(user)
//       console.log(user ? JSON.parse(user) : null)
//       return user ? JSON.parse(user) : null;
//     })
//     console.log(localStorage.getItem('current-user'))
//     if(newUser){
//       setUsers(JSON.parse(localStorage.getItem("users")).filter(user => user.email !== newUser.email))
//     }
//   }, []);

//   return (
//     <UsersContext.Provider value={{ currentUser, users, setCurrentUser, reloadData }}>
//       {children}
//     </UsersContext.Provider>
//   );
// };
