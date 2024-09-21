// useRevalidateOnUserChange.jsx
import { useContext, useEffect } from "react";
import { useRevalidator } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";

// this custom hooks do: if the user switch then the data must apdate so
// we must re-call the api, but the call in the loader function 
// to run the loader must use revalidator.revalidate() and we run it 
// when the user change

// i use it in
//  /dashboard/status
//  /dashboard/profile

const useRevalidateOnUserChange = () => {
  const { currentUser } = useContext(UsersContext);
  const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();
  }, [currentUser]);
};

export default useRevalidateOnUserChange;
