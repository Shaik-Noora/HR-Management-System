const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { getLogs } = require('../controllers/logController');

router.use(auth);
router.get('/', getLogs);

module.exports = router;
