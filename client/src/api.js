import axios from "axios";
import { requireAuth } from "./utils";
import { toast } from "react-toastify";

const urlAPI = "https://taskmanagerms-hbb3uppc.b4a.run";

export const deleteTaskFromAPI = async (taskID) => {
  const token = await requireAuth();

  try {
    const res = await axios({
      method: "delete",
      url: `${urlAPI}/api/v1/tasks/${taskID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    toast.error("deleted failed: " + error.message);

    throw new Error("Delete failed: " + error.message);
  }
};

export const updateTaskFromAPI = async (taskID, data) => {
  const token = await requireAuth();

  try {
    const res = await axios({
      method: "patch",
      url: `${urlAPI}/api/v1/tasks/${taskID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
  } catch (error) {
    toast.error("updated failed: " + error.message);

    throw new Error(error.message);
  }
};

export const addTaskFromAPI = async (data) => {
  const token = await requireAuth();

  try {
    const res = await axios({
      method: "post",
      url: `${urlAPI}/api/v1/tasks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
    toast.success("added the task successful!");
  } catch (error) {
    toast.error("add failed: " + error.message);

    throw new Error(error.message);
  }
};

export const getTaskFromAPI = async (taskID) => {
  const token = await requireAuth();

  try {
    const res = await axios(`${urlAPI}/api/v1/tasks/${taskID}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllTasksFromAPI = async (date) => {
  const token = await requireAuth();

  try {
    const res = await axios(
      `${urlAPI}/api/v1/tasks${date ? `?date=${date}` : ""}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPerformance = async (date) => {
  const token = await requireAuth();

  try {
    const res = await axios(`${urlAPI}/api/v1/tasks/performance`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUser = async () => {
  const token = await requireAuth();

  try {
    const res = await axios(`${urlAPI}/api/v1/auth/user`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (data) => {
  const token = await requireAuth();

  try {
    const res = await axios({
      method: "post",
      url: `${urlAPI}/api/v1/auth/user`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
    toast.success("you update your profile");
    return res.data;
  } catch (error) {
    toast.error("get data failed: " + error.message);

    throw new Error(error.message);
  }
};
