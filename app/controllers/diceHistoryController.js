// // import model 
// const { default: mongoose } = require('mongoose');
// const diceHistoryModel = require('../models/diceHistoryModel');

// //get all
// const getAllDiceHistory = (req, res) => {
//     diceHistoryModel.find((error, data) => {
//         if (error) {
//             res.status(500).json({
//                 message: `Lỗi không thể lấy dữ liệu: ${error.message}`
//             });
//         } else {
//             res.status(200).json({
//                 data
//             });
//         }
//     })   
// }
// //get by id
// const getDiceHistoryById  = (req, res) => {
//     let id = req.params.diceHistoryId; //B1 thu thập
//     //B2 check
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         res.status(400).json({
//             message: "id không tồn tại"
//         })
//     } else {
//         //B3
//         diceHistoryModel.findById(id, (error, data) => {
//             if (error) {
//                 res.status(500).json({
//                     message: `lỗi không thể lấy dữ liệu: ${error.message}`
//                 });
//             } else {
//                 res.status(200).json({
//                     data
//                 });
//             }
//         })
//     }
// }

// // post
// const createDiceHistory  = (req, res) => {
//     let body = req.body; //B1 thu thập
//     //B2 check data
//     // if (!mongoose.Types.ObjectId.isValid(user)) {
//     //     return res.status(400).json({
//     //         message: "user không tồn tại."
//     //     })
//     // }
//     if (!body.dice) {
//         return res.status(400).json({
//             message: "phải nhập dice."
//         })
//     }
//     if (!Number.isInteger(body.dice) || body.dice < 0 || body.dice > 7) {
//         return res.status(400).json({
//             message: "dice phải là số lớn hơn 0, nhỏ hơn hoặc bằng 6"
//         })
//     }
    
//     else {
//         //B3 thực hiện thao tác
//         let dice = {
           
//             user: body.username,
//             dice: body.firstname,
//         }

//         //create new into mongodb
//         diceHistoryModel.create(user, (error, data) => {
//             if (error) {
//                 return res.status(500).json({
//                     message: `lỗi không thể tạo Dice: ${error.message}`
//                 })
//             } else {
//                 return res.status(201).json({
//                     data
//                 })
//             }
//         });
//     }


// };

// const updateDiceHistoryById  = (req, res) => {
//     //B1 thu thập
//     let id = req.params.diceHistoryId;
//     let body = req.body;
//     //B2 check
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({
//             message: "id không tồn tại."
//         })
//     } else if (!body.username) {
//         return res.status(400).json({
//             message: "phải nhập username."
//         })
//     }
//     else if (!body.firstname) {
//         return res.status(400).json({
//             message: "phải nhập firstname."
//         })
//     } 
//     else if (!body.lastname) {
//         return res.status(400).json({
//             message: "phải nhập lastname."
//         })
//     } 
//     else {
//         //B3 trả về
//         let user = {
           
//             username: body.username,
//             firstname: body.firstname,
//             lastname: body.lastname
//         }
//         diceHistoryModel.findByIdAndUpdate(id, user, { new: true }, (error, data) => {
//             if (error) {
//                 return res.status(500).json({
//                     message: `lỗi cập nhập không thành công: ${error.message}`
//                 })
//             } else {
//                 // console.log("đã cập nhập dữ liệu thành công" + data);
//                 return res.status(200).json(data)
//             }
//         });
//     }
// };

// const deleteDiceHistoryById   = (req, res) => {
//     //B1
//     let id = req.params.diceHistoryId;

//     //B2 check
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         res.status(400).json({
//             message: "id không tồn tại"
//         })
//     } else {
//         //B3
//         diceHistoryModel.findByIdAndDelete(id, (error, data) => {
//             if (error) {
//                 res.status(500).json({
//                     message: `lỗi xóa không thành công: ${error.message}`
//                 })
//             } else {
//                 res.status(204).json({
//                     data: data.reviews
//                 })
//             }
//         })
//     }
// }
// //export hàm thanh modeule 
// module.exports = { getAllDiceHistory , getDiceHistoryById , createDiceHistory , updateDiceHistoryById , deleteDiceHistoryById }