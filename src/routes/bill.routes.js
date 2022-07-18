const express = require('express');
const { getBills, getBill, createBill, updateBill, deleteBill } = require('../controllers');

const router = express.Router();

router.get('/', getBills);
router.get('/:id', getBill);
router.post('/', createBill);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);

module.exports = router;