const express = require('express');
// const { courseMiddleware } = require('../middlewares/courseMiddleware');
//import module course controller 
const { getDice, getDiceHistory, getPrizeHistory, getVoucherHistory } = require('../controllers/diceController')

const diceRouter = express.Router();

// userRouter.use( courseMiddleware );


diceRouter.post("/dice", getDice);
diceRouter.get("/dice-history", getDiceHistory);
diceRouter.get("/prize-history", getPrizeHistory);
diceRouter.get("/voucher-history", getVoucherHistory);



module.exports= { diceRouter};