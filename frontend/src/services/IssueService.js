import axios from "axios";
import { ISSUE_URL } from "../constants/ApiUrl";

const getIssueById = async (id) => {
  try {
    const response = await axios.get(`${ISSUE_URL}${id}`);

    return response.data[0];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const deleteIssueById = async (id) => {
  try {
    const response = await axios.delete(`${ISSUE_URL}${id}`);

    return response.data.message;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { getIssueById, deleteIssueById };
