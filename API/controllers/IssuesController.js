const express = require("express");
const router = express.Router();
const path = require("path");
const { BASE_URL } = require("../constants/ApiUrl");
const { readIssuesAsync } = require("../services/FileService");
const { filterIssueById } = require("../utils/Helper");

/**
 * GET api/v1/issues/:id
 *
 * params: id
 * return: Issue object
 */
router.get(`${BASE_URL}/issues/:id`, async (req, res) => {
  const issueId = parseInt(req.params.id);

  try {
    const issuesData = await readIssuesAsync(
      path.resolve(__dirname, "../mockData/issues.json"),
      "utf8"
    );
    const dataToDisplay = filterIssueById(issuesData, issueId);

    if (dataToDisplay.length == 0) {
      const errorMessage = { error: "Issue not found" };
      console.error(errorMessage);
      res.status(404).json(errorMessage);
    }

    res.json(dataToDisplay);
  } catch (error) {
    console.error(error.messages);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * POST api/v1/issues
 *
 * body: Issue object
 * return: New issue object
 */
router.post(`${BASE_URL}/issues`, async (req, res) => {
  try {
    const { id, title, description } = req.body;

    if (!id) {
      return res.status(400).send({ error: "Id is required" });
    }

    if (!title) {
      return res.status(400).send({ error: "Title is required" });
    }

    if (!description) {
      return res.status(400).send({ error: "Description is required" });
    }

    res.json({
      id: id,
      title: title,
      description: description,
    });
  } catch (error) {
    console.error(error.messages);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * PUT api/v1/issues/:id
 *
 * params: id
 * body: Issue object
 * return: New issue object
 */
router.put(`${BASE_URL}/issues/:id`, async (req, res) => {
  try {
    // Check data to update
    const issueId = parseInt(req.params.id);
    const issuesData = await readIssuesAsync(
      path.resolve(__dirname, "../mockData/issues.json"),
      "utf8"
    );

    const dataToUpdate = filterIssueById(issuesData, issueId);

    if (dataToUpdate.length == 0) {
      const errorMessage = { error: "Issue not found" };
      console.error(errorMessage);
      res.status(404).json(errorMessage);
    }

    const { id, title, description } = req.body;

    if (!id) {
      return res.status(400).send({ error: "Id is required" });
    }

    if (!title) {
      return res.status(400).send({ error: "Title is required" });
    }

    if (!description) {
      return res.status(400).send({ error: "Description is required" });
    }

    // Return updated issue according to the new parameters
    res.json({
      id: dataToUpdate[0].id !== id ? id : dataToUpdate[0].id,
      title: dataToUpdate[0].title !== title ? title : dataToUpdate[0].title,
      description:
        dataToUpdate[0].description !== description
          ? description
          : dataToUpdate[0].description,
    });
  } catch (error) {
    console.error(error.messages);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * DELETE api/v1/issues/:id
 *
 * params: id
 * return: void
 */
router.delete(`${BASE_URL}/issues/:id`, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const issuesData = await readIssuesAsync(
      path.resolve(__dirname, "../mockData/issues.json"),
      "utf8"
    );

    const dataToDelete = filterIssueById(issuesData, id);

    if (dataToDelete.length == 0) {
      const errorMessage = { error: "Issue not found" };
      console.error(errorMessage);
      res.status(404).json(errorMessage);
    }

    res.json({ message: `Issue ${id} has been deleted` });
  } catch (error) {
    console.error(error.messages);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
