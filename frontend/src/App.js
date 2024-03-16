import { useState } from "react";
import "./App.css";
import { getIssueById, deleteIssueById } from "./services/IssueService";

function App() {
  const [issueId, setIssueId] = useState("");
  const [issueIdToDelete, setIssueIdToDelete] = useState("");
  const [issue, setIssue] = useState({});

  const getIssue = async (id) => {
    try {
      const issue = await getIssueById(id);

      setIssue(issue);
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  const deleteIssue = async (id) => {
    try {
      const message = await deleteIssueById(id);

      alert(message);
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  return (
    <>
      <div className="get-issue">
        <h1>Test get issue</h1>
        <input
          type="text"
          placeholder="Insert id like 1, 2, etc.."
          onChange={(e) => {
            setIssueId(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getIssue(issueId);
          }}
        >
          Get issue
        </button>
        <div>
          <p>id: {issue.id}</p>
          <p>title: {issue.title}</p>
          <p>description: {issue.description}</p>
        </div>
      </div>

      <div className="delete-issue">
        <h1>Delete issue</h1>
        <input
          type="text"
          placeholder="Insert id to delete.."
          onChange={(e) => {
            setIssueIdToDelete(e.target.value);
          }}
        />
        <button
          onClick={() => {
            deleteIssue(issueIdToDelete);
          }}
        >
          Delete issue
        </button>
      </div>
    </>
  );
}

export default App;
