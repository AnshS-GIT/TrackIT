const Issue = require('../models/issue.model');
const mongoose = require('mongoose');

const createIssue = async (data, userId) => {
  return await Issue.create({
    ...data,
    createdBy: userId
  });
};

const getAllIssues = async () => {
  return await Issue.find()
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email');
};

const getIssueById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid issue ID');
  }

  const issue = await Issue.findById(id)
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email');

  if (!issue) {
    throw new Error('Issue not found');
  }

  return issue;
};

const updateIssue = async (id, updates) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid issue ID');
  }

  const issue = await Issue.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  }).populate('createdBy', 'name email').populate('assignedTo', 'name email');

  if (!issue) {
    throw new Error('Issue not found');
  }

  return issue;
};

const deleteIssue = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid issue ID');
  }

  const issue = await Issue.findByIdAndDelete(id);

  if (!issue) {
    throw new Error('Issue not found');
  }

  return issue;
};

const assignIssue = async (issueId, assignedToUserId) => {
  const User = require('../models/user.model');

  if (!mongoose.Types.ObjectId.isValid(issueId)) {
    throw new Error('Invalid issue ID');
  }

  if (!mongoose.Types.ObjectId.isValid(assignedToUserId)) {
    throw new Error('Invalid user ID');
  }

  const issue = await Issue.findById(issueId);
  if (!issue) {
    throw new Error('Issue not found');
  }

  const user = await User.findById(assignedToUserId);
  if (!user) {
    throw new Error('User not found');
  }

  issue.assignedTo = assignedToUserId;
  await issue.save();

  return await Issue.findById(issueId)
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email');
};

module.exports = {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  assignIssue
};
