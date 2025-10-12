const explainCodeController = require('../controllers/explainCode.controller');
const router = require('express').Router();

const {
    explainCode,
} = explainCodeController;

// POST /explainCode
router.post('/', explainCode);

module.exports = router;