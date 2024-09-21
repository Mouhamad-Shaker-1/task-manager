import { Grid, Divider } from "@chakra-ui/react";

import { useContext, useEffect } from "react";

import { Task } from "../components";
import { AddTaskItem } from "../components";
import React from "react";
import {
  deleteTaskFromAPI,
  getAllTasksFromAPI,
  updateTaskFromAPI,
} from "../api";
import LoadingComponent from "./Loading";
import { getDateString } from "../utils";
import { DateContext } from "../context/DateContext";
import { ErrorPage } from "../pages";
import { UsersContext } from "../context/UsersContext";

const TodayTasks = () => {
  const { globleDateToAddingTask } = useContext(DateContext);

  const { currentUser } = React.useContext(UsersContext);

  const [tasks, setTasks] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLaoding] = React.useState(true);

  useEffect(() => {
    // make sure the user exist and call the api based on globeDate
    if (currentUser) {
      setLaoding(true);
      async function getData() {
        try {
          const data = await getAllTasksFromAPI(
            getDateString(globleDateToAddingTask)
          ); //
          setTasks(data);
          setLaoding(false);
        } catch (error) {
          console.error("Error get Data:", error);
          setError(error.message);
        }
      }
      getData();
    }
  }, [globleDateToAddingTask, currentUser]); //

  const handleComplete = async (taskID, completed) => {
    try {
      await updateTaskFromAPI(taskID, { completed: !completed });
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          return task._id !== taskID
            ? task
            : { ...task, completed: !task.completed };
        })
      );
    } catch (error) {
      console.error("Error Updating task:", error);
      setError(error.message);
    }
  };

  const deleteTask = async (taskID) => {
    try {
      await deleteTaskFromAPI(taskID);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskID));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError(error.toString());
    }
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        p={4}
      >
        {tasks &&
          tasks.map((task) => {
            return (
              !task.completed && (
                <Task
                  key={task._id}
                  task={task}
                  deleteTask={deleteTask}
                  handleComplete={handleComplete}
                />
              )
            );
          })}
        <AddTaskItem />
      </Grid>
      <Divider borderColor="gray.400" my={5} borderWidth="1px" />
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        p={4}
      >
        {tasks &&
          tasks.map((task) => {
            return (
              task.completed && (
                <Task
                  key={task._id}
                  task={task}
                  deleteTask={deleteTask}
                  handleComplete={handleComplete}
                />
              )
            );
          })}
      </Grid>
    </>
  );
};

export default TodayTasks;
