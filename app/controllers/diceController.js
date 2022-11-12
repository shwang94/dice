// import model 
const { default: mongoose } = require('mongoose');
const userModel = require('../models/userModel');
const voucherModel = require('../models/voucherModel');
const prizeModel = require('../models/prizeModel');

const diceHistoryModel = require('../models/diceHistoryModel');
const voucherHistoryModel = require('../models/voucherHistoryModel');
const prizeHistoryModel = require('../models/prizeHistoryModel');

//get all
const getDice = async (req, res) => {
    let body = req.body; //B1 thu thập

    //Find User By UserName
    let userObj = null;
    let newDiceHistory = null;
    let newVoucherHistory = null;
    let top3DiceHistories = null;
    var resData = { "voucher": null, "dice": 0, "prize": null };

    await userModel.findOne({ username: body.username })
        .then(function (obj) {
            userObj = obj;
        }
        ).catch(function (err) {
            console.log(err);
        }
        );

    if (userObj == null) {  //user Không tồn tại trong db thì tạo mới

        let newUser = new userModel();
        newUser._id = new mongoose.Types.ObjectId();
        newUser.username = req.body.username;
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;

        try {

            userObj = await newUser.save();

        } catch (err) {
            console.log(err)
        }
    }

    try {

        //có đc user.UserId, tạo diceHistory
        let diceHistory = new diceHistoryModel();
        diceHistory._id = new mongoose.Types.ObjectId();
        diceHistory.user = mongoose.Types.ObjectId(userObj._id);
        diceHistory.dice = Math.floor(6 * Math.random()) + 1;
        diceHistory.createdAt = Date.now();
        diceHistory.updatedAt = Date.now();
        
        // diceHistory.dice = 4;


        newDiceHistory = await diceHistory.save();


        resData.dice = newDiceHistory.dice

        //Nếu dice > 3 thì lấy random voucher tu db 
        if (diceHistory.dice > 3) {

            //lấy tất cả vouchers từ mongdb lên
            let vouchers = await voucherModel.find();  //lấy tất cả vouchers hiện có trong db

            let randomIndex = randomInt(0, vouchers.length - 1); //lấy ngẫu nhiên 1 voucher theo index (giá trị randomIndex sẽ từ  0 --> length-1)
            resData.voucher = vouchers[randomIndex];
            let voucherObj = vouchers[randomIndex];

            //tạo voucherHistory
            let voucherHistory = new voucherHistoryModel();
            voucherHistory._id = new mongoose.Types.ObjectId();
            voucherHistory.user = mongoose.Types.ObjectId(userObj._id);
            voucherHistory.voucher = mongoose.Types.ObjectId(voucherObj._id);

            newVoucherHistory = await voucherHistory.save();

            //lấy tất cả historydice của user từ mongdb lên
            top3DiceHistories = await diceHistoryModel.find({ user: userObj._id }).sort({ createdAt: "desc" }).exec();

            // console.table(top3DiceHistories);
            if (top3DiceHistories[0].dice > 3 && top3DiceHistories[1].dice > 3 && top3DiceHistories[2].dice > 3) {
                //lấy tất cả prize từ mongdb lên
                let prizes = await prizeModel.find();  //lấy tất cả prizes hiện có trong db

                let randomIndexp = randomInt(0, prizes.length - 1); //lấy ngẫu nhiên 1 prize theo index (giá trị randomIndexp sẽ từ  0 --> length-1)
                resData.prize = prizes[randomIndexp].name;
                let prizeObj = prizes[randomIndexp];

                //tạo prizeHistory
                let prizeHistory = new prizeHistoryModel();
                prizeHistory._id = new mongoose.Types.ObjectId();
                prizeHistory.user = mongoose.Types.ObjectId(userObj._id);
                prizeHistory.prize = mongoose.Types.ObjectId(prizeObj._id);

                newPrizeHistory = await prizeHistory.save();
            }


        }
    }
    catch (err) {

        console.log(err);
        res.json(err);
    }


    res.json(resData);

};

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//lấy dice history
const getDiceHistory = async (req,res)=>{
    let resDiceHis = {"dices":[]}
    let usernamex = req.query.username.trim();
    let userId = (await userModel.findOne({ username: usernamex }))._id;
    if (userId == null){
        res.json(resDiceHis);
    }

    AllDiceHistoriesUser = await diceHistoryModel.find({ user: userId });
    for (var i=0; i<AllDiceHistoriesUser.length; i++){
        resDiceHis.dices.push(AllDiceHistoriesUser[i].dice);
    }
    res.json(resDiceHis);
    
}

const getPrizeHistory = async (req,res)=>{
    let resPrizeHis = {"prizes":[]}
    let allPrizeHis = [];
    let usernamex = req.query.username.trim();
    let userId = (await userModel.findOne({ username: usernamex }))._id;
    if (userId == null){
        res.json(resPrizeHis);
    }
    AllPrizeHistoriesUser = await prizeHistoryModel.find({ user: userId });
    if (AllPrizeHistoriesUser == []){
        res.json(resPrizeHis);
    }
    for (var i = 0; i<AllPrizeHistoriesUser.length; i++){
        allPrizeHis.push(AllPrizeHistoriesUser[i].prize);
    }

    for (var i = 0; i<allPrizeHis.length; i++){

        let convertNamePrize = (await prizeModel.findOne({_id:allPrizeHis[i]}));
        console.log(convertNamePrize);
        resPrizeHis.prizes.push(convertNamePrize.name);
    }

    res.json(resPrizeHis);
}

const getVoucherHistory = async (req,res)=>{
    let resVoucherHis = {"vouchers":[]}
    let allVoucherHis = [];
    let usernamex = req.query.username.trim();
    let userId = (await userModel.findOne({ username: usernamex }))._id;
    if (userId == null){
        res.json(resVoucherHis);
    }
    AllVoucherHistoriesUser = await voucherHistoryModel.find({ user: userId });
    if (AllVoucherHistoriesUser == []){
        res.json(resVoucherHis);
    }
    for (var i = 0; i<AllVoucherHistoriesUser.length; i++){
        allVoucherHis.push(AllVoucherHistoriesUser[i].voucher);
    }

    for (var i = 0; i<allVoucherHis.length; i++){

        let convertVoucher = (await voucherModel.findOne({_id:allVoucherHis[i]}));
        console.log(convertVoucher);
        resVoucherHis.vouchers.push(convertVoucher);
    }

    res.json(resVoucherHis);
}
//export hàm thanh modeule 
module.exports = { getDice, getDiceHistory, getPrizeHistory, getVoucherHistory }