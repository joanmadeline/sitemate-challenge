const filterIssueById = (issuesData, id) => {
  return issuesData.issues.filter((issue) => issue.id == id);
};

module.exports = { filterIssueById };
