const express = require('express');
//Import router
const { homeRouter } = require("./app/routes/homeRouter");
const { userRouter } = require("./app/routes/userRouter");
const { prizeRouter } = require("./app/routes/prizeRouter");
const { voucherRouter } = require("./app/routes/voucherRouter");

// const { diceHistoryRouter } = require("./app/routes/diceHistoryRouter");

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
app.use("/", userRouter);
// app.use("/", diceHistoryRouter);
app.use("/", prizeRouter);
app.use("/", voucherRouter);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})