import { redirect } from "react-router-dom";
import { toast } from "react-toastify";


export const requireAuth = async (request) => {
  const pathname = request ? new URL(request.url).pathname : null;
  const currentUser = JSON.parse(localStorage.getItem("current-user"));

  const url = pathname
    ? `/login?message=You must log in first.&redirectTo=${pathname}`
    : "/login";

  if (!currentUser || !currentUser.token) {
    throw redirect(url);
  }
  return currentUser.token;
};

export const getDateString = (date) => {
  const today = date;
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const handleUsersInLocalStorgeWhenGetNewUser = (user) => {
  localStorage.setItem("current-user", JSON.stringify(user));

  const users = JSON.parse(localStorage.getItem("users"));

  let newUsers = null;
  if (!users) {
    newUsers = [user];
  } else {
    if (users.find((oneUser) => oneUser.email == user.email) !== undefined) {
      return false;
    }
    newUsers = [...users, user];
  }
  localStorage.setItem("users", JSON.stringify(newUsers));
  return true;
};

export const updateUserInLocalStorge = (user) => {
  const token = JSON.parse(localStorage.getItem("current-user")).token;

  user.token = token;

  localStorage.setItem("current-user", JSON.stringify(user));

  const usersLocal = JSON.parse(localStorage.getItem("users"));
  const NewUsers = usersLocal.map((userLocal) =>
    userLocal.email == user.email ? user : userLocal
  );

  localStorage.setItem("users", JSON.stringify(NewUsers));
};
