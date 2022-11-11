// import model 
const { default: mongoose } = require('mongoose');
const voucherHistoryModel = require('../models/voucherHistoryModel');

//get all
const getAllVoucherHistory = (req, res) => {
    voucherHistoryModel.find((error, data) => {
        if (error) {
            res.status(500).json({
                message: `Lỗi không thể lấy dữ liệu: ${error.message}`
            });
        } else {
            res.status(200).json({
                data
            });
        }
    })   
}
//get by id
const getVoucherHistoryById = (req, res) => {
    let id = req.params.voucherHistoryId; //B1 thu thập
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        voucherHistoryModel.findById(id, (error, data) => {
            if (error) {
                res.status(500).json({
                    message: `lỗi không thể lấy dữ liệu: ${error.message}`
                });
            } else {
                res.status(200).json({
                    data
                });
            }
        })
    }
}

// post
const createVoucherHistory  = (req, res) => {
    let body = req.body; //B1 thu thập
    //B2 check data
    if (!body.user) {
        return res.status(400).json({
            message: "phải nhập user."
        })
    }
    if (!body.voucher) {
        return res.status(400).json({
            message: "phải nhập voucher."
        })
    }
    
    else {
        //B3 thực hiện thao tác
        let userId = req.body.user
        let voucherId = req.body.voucher

        let prizeHistory = {
           
            user: mongoose.Types.ObjectId(userId),
            voucher: mongoose.Types.ObjectId(voucherId)        
        }

        //create new into mongodb
        voucherHistoryModel.create(voucherHistory, (error, data) => {
            if (error) {
                return res.status(500).json({
                    message: `lỗi không thể tạo voucherHistory: ${error.message}`
                })
            } else {
                return res.status(201).json({
                    data
                })
            }
        });
    }


};

const updateVoucherHistoryById = (req, res) => {
    //B1 thu thập
    let id = req.params.voucherHistoryId;
    let body = req.body;
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "id không tồn tại."
        })
    } else if (!body.user) {
        return res.status(400).json({
            message: "phải nhập user."
        })
    }
    else if (!body.voucher) {
        return res.status(400).json({
            message: "phải nhập voucher."
        })
    } 
    
    else {
        //B3 trả về
        let voucherHistory = {
           
            user: body.user,
            voucher: body.voucher
                }        
                voucherHistoryModel.findByIdAndUpdate(id, voucherHistory, { new: true }, (error, data) => {
            if (error) {
                return res.status(500).json({
                    message: `lỗi cập nhập không thành công: ${error.message}`
                })
            } else {
                // console.log("đã cập nhập dữ liệu thành công" + data);
                return res.status(200).json(data)
            }
        });
    }
};

const deleteVoucherHistoryById  = (req, res) => {
    //B1
    let id = req.params.voucherHistoryId;

    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        voucherHistoryModel.findByIdAndDelete(id, (error, data) => {
            if (error) {
                res.status(500).json({
                    message: `lỗi xóa không thành công: ${error.message}`
                })
            } else {
                res.status(204).json({
                    data: data
                })
            }
        })
    }
}
//export hàm thanh modeule 
module.exports = { getAllVoucherHistory, getVoucherHistoryById, createVoucherHistory, updateVoucherHistoryById, deleteVoucherHistoryById }