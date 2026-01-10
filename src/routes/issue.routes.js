const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, issueController.createIssue);
router.get('/', authMiddleware, issueController.getAllIssues);
router.put('/:id/assign', authMiddleware, issueController.assignIssue);
router.get('/:id', authMiddleware, issueController.getIssueById);
router.put('/:id', authMiddleware, issueController.updateIssue);
router.delete('/:id', authMiddleware, issueController.deleteIssue);

module.exports = router;
