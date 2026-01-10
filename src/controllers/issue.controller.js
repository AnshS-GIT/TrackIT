const issueService = require('../services/issue.service');

const createIssue = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const issue = await issueService.createIssue(req.body, req.user.userId);
    res.status(201).json(issue);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await issueService.getAllIssues();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await issueService.getIssueById(req.params.id);
    res.status(200).json(issue);
  } catch (error) {
    if (error.message === 'Invalid issue ID') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Issue not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateIssue = async (req, res) => {
  try {
    const issue = await issueService.updateIssue(req.params.id, req.body);
    res.status(200).json(issue);
  } catch (error) {
    if (error.message === 'Invalid issue ID') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Issue not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteIssue = async (req, res) => {
  try {
    await issueService.deleteIssue(req.params.id);
    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    if (error.message === 'Invalid issue ID') {
        return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Issue not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const assignIssue = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    if (!assignedTo) {
      return res.status(400).json({ message: 'assignedTo field is required' });
    }

    const issue = await issueService.assignIssue(req.params.id, assignedTo);
    res.status(200).json(issue);
  } catch (error) {
    if (error.message === 'Invalid issue ID' || error.message === 'Invalid user ID') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Issue not found' || error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  assignIssue
};
