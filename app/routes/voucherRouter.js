const express = require('express');
//import module course controller 
const { getAllVoucher, getVoucherById, createVoucher, updateVoucherById, deleteVoucherById } = require('../controllers/voucherController')

const voucherRouter = express.Router();


voucherRouter.get("/vouchers", getAllVoucher);
voucherRouter.get("/vouchers/:voucherId", getVoucherById);

voucherRouter.post("/vouchers", createVoucher);
voucherRouter.put("/vouchers/:voucherId", updateVoucherById);

voucherRouter.delete("/vouchers/:voucherId", deleteVoucherById);

module.exports= { voucherRouter};