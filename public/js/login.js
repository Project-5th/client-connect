/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    console.log("This is login", email, password);
    const res = await axios({
      method: "POST",
      url: "http://localhost:8000/login",
      data: {
        email,
        password,
      },
    });
    console.log("Helo");
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      console.log("Hello login");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:8000/logout",
    });
    if ((res.data.status = "success")) location.reload(true);
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
};
