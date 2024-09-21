import React, { useContext } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  TodayTasks,
  AllTasksWithDate,
  Profile,
  Status,
  EditTask,
  NotFoundError,
} from "./pages";
import { DashboardLayout } from "./components";
import "./index.css";

import { ErrorPage } from "./pages";

import { action as loginAction } from "./pages/Login";
import { action as signupAction } from "./pages/Signup";
import { loader as todayTasksLoader } from "./pages/TodayTasks";
import { loader as editTaskLoader } from "./pages/EditTask";
import { action as editTaskAction } from "./pages/EditTask";
import { loader as profileLoader } from "./pages/Profile";
import { action as profileAction } from "./pages/Profile";
import { loader as homeLoader } from "./pages/Home";
import { loader as allTasksWithDateLoader } from "./pages/AllTasksWithDate";
import { loader as statusLoader } from "./pages/Status";
import { loader as loginLoader } from "./pages/Login";
import { loader as signupLoader } from "./pages/Signup";

import { DateContext } from "./context/DateContext";
import { UsersContext } from "./context/UsersContext";


function App() {
  const { globleDateToAddingTask } = useContext(DateContext);
  const { reloadData } = useContext(UsersContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index loader={homeLoader} element={<Home />} />
        <Route
          action={loginAction(reloadData)}
          path="login"
          loader={loginLoader}
          element={<Login />}
        />
        <Route
          action={signupAction(reloadData)}
          path="signup"
          loader={signupLoader}
          element={<Signup />}
        />
        <Route path="dashboard/" element={<DashboardLayout />}>
          <Route index loader={todayTasksLoader} element={<TodayTasks />} />
          <Route
            path="all-tasks"
            loader={allTasksWithDateLoader}
            element={<AllTasksWithDate />}
          />
          <Route
            path="profile"
            errorElement={<ErrorPage />}
            loader={profileLoader}
            action={profileAction(reloadData)}
            element={<Profile />}
          />
          <Route
            path="status"
            errorElement={<ErrorPage />}
            loader={statusLoader}
            element={<Status />}
          />
          <Route
            path="edit-task/:id"
            errorElement={<ErrorPage />}
            loader={editTaskLoader}
            action={editTaskAction(globleDateToAddingTask)}
            element={<EditTask />}
          />
          <Route
            path="add-task"
            errorElement={<ErrorPage />}
            loader={editTaskLoader}
            action={editTaskAction(globleDateToAddingTask)}
            element={<EditTask />}
          />
        </Route>
        <Route path="*" element={<NotFoundError />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
