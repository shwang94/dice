const express = require('express');
//Import router
const { homeRouter } = require("./app/routes/homeRouter");
const { randomRouter } = require("./app/routes/randomRouter");
const { diceRouter } = require("./app/routes/diceRouter");

const { userRouter } = require("./app/routes/userRouter");
const { prizeRouter } = require("./app/routes/prizeRouter");
const { voucherRouter } = require("./app/routes/voucherRouter");

const { diceHistoryRouter } = require("./app/routes/diceHistoryRouter");
const { voucherHistoryRouter } = require("./app/routes/voucherHistoryRouter");
const { prizeHistoryRouter } = require("./app/routes/prizeHistoryRouter");


const mongoose = require('mongoose');// khai báo thư viện database 


//Import models
const userModel = require("./app/models/userModel");
const diceHistoryModel = require("./app/models/diceHistoryModel");


//kết nối database 
mongoose.connect('mongodb://127.0.0.1:27017/CRUD_LuckyDice', (error) =>{
    if (error){
        throw error;
    }
    console.log("Successfully connected!");
});


const app = express();
const port = 8000;
app.use(express.json());

app.use("/", homeRouter);
app.use("/", randomRouter);
app.use("/devcamp-lucky-dice", diceRouter);

app.use("/", userRouter);
app.use("/", prizeRouter);
app.use("/", voucherRouter);
app.use("/", diceHistoryRouter);
app.use("/", voucherHistoryRouter);
app.use("/", prizeHistoryRouter);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})