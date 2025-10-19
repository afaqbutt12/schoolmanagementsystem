const Fee = require('../models/feesSchema.js');

// Create a new fee record
const feeCreate = async (req, res) => {
    try {
        const fee = new Fee({
            ...req.body,
            school: req.body.adminID
        });

        const result = await fee.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(500).json({ message: 'Error creating fee record', error: err.message });
    }
};

// Get all fees for a school
const getFees = async (req, res) => {
    try {
        const fees = await Fee.find({ school: req.params.id })
            .populate('student', 'name rollNum sclassName')
            .sort({ createdAt: -1 });
        
        res.send(fees);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching fees', error: err.message });
    }
};

// Get fee details by ID
const getFeeDetail = async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id)
            .populate('student', 'name rollNum sclassName')
            .populate('school', 'schoolName');
        
        if (!fee) {
            return res.status(404).send({ message: 'Fee record not found' });
        }
        
        res.send(fee);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching fee details', error: err.message });
    }
};

// Update fee
const updateFee = async (req, res) => {
    try {
        const fee = await Fee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('student', 'name rollNum sclassName');
        
        if (!fee) {
            return res.status(404).send({ message: 'Fee record not found' });
        }
        
        res.send(fee);
    } catch (err) {
        res.status(500).json({ message: 'Error updating fee record', error: err.message });
    }
};

// Delete fee
const deleteFee = async (req, res) => {
    try {
        const fee = await Fee.findByIdAndDelete(req.params.id);
        
        if (!fee) {
            return res.status(404).send({ message: 'Fee record not found' });
        }
        
        res.send({ message: 'Fee record deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting fee record', error: err.message });
    }
};

// Delete all fees for a school
const deleteFees = async (req, res) => {
    try {
        const result = await Fee.deleteMany({ school: req.params.id });
        res.send({ message: `${result.deletedCount} fee records deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting fees', error: err.message });
    }
};

// Mark fee as paid
const markFeeAsPaid = async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id);
        if (!fee) {
            return res.status(404).send({ message: 'Fee record not found' });
        }

        fee.status = 'Paid';
        fee.paymentDate = new Date();
        fee.paymentMethod = req.body.paymentMethod || 'Cash';
        fee.transactionId = req.body.transactionId;

        await fee.save();
        res.send({ message: 'Fee marked as paid successfully', fee });
    } catch (err) {
        res.status(500).json({ message: 'Error marking fee as paid', error: err.message });
    }
};

// Get fees by status
const getFeesByStatus = async (req, res) => {
    try {
        const fees = await Fee.find({ 
            school: req.params.id, 
            status: req.params.status 
        }).populate('student', 'name rollNum sclassName');
        
        res.send(fees);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching fees by status', error: err.message });
    }
};

// Get fees by student
const getFeesByStudent = async (req, res) => {
    try {
        const fees = await Fee.find({ 
            school: req.params.id, 
            studentId: req.params.studentId 
        }).populate('student', 'name rollNum sclassName');
        
        res.send(fees);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching fees by student', error: err.message });
    }
};

// Get fees by class
const getFeesByClass = async (req, res) => {
    try {
        const fees = await Fee.find({ 
            school: req.params.id, 
            class: req.params.className 
        }).populate('student', 'name rollNum sclassName');
        
        res.send(fees);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching fees by class', error: err.message });
    }
};

// Search fees
const searchFees = async (req, res) => {
    try {
        const { query } = req.query;
        const fees = await Fee.find({
            school: req.params.id,
            $or: [
                { studentName: { $regex: query, $options: 'i' } },
                { studentId: { $regex: query, $options: 'i' } },
                { expenseType: { $regex: query, $options: 'i' } }
            ]
        }).populate('student', 'name rollNum sclassName');
        
        res.send(fees);
    } catch (err) {
        res.status(500).json({ message: 'Error searching fees', error: err.message });
    }
};

// Get fee statistics
const getFeeStatistics = async (req, res) => {
    try {
        const schoolId = req.params.id;
        
        const totalFees = await Fee.countDocuments({ school: schoolId });
        const paidFees = await Fee.countDocuments({ school: schoolId, status: 'Paid' });
        const unpaidFees = await Fee.countDocuments({ school: schoolId, status: 'Unpaid' });
        const overdueFees = await Fee.countDocuments({ school: schoolId, status: 'Overdue' });
        
        const totalAmount = await Fee.aggregate([
            { $match: { school: mongoose.Types.ObjectId(schoolId) } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        
        const paidAmount = await Fee.aggregate([
            { $match: { school: mongoose.Types.ObjectId(schoolId), status: 'Paid' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        
        res.send({
            totalFees,
            paidFees,
            unpaidFees,
            overdueFees,
            totalAmount: totalAmount[0]?.total || 0,
            paidAmount: paidAmount[0]?.total || 0,
            pendingAmount: (totalAmount[0]?.total || 0) - (paidAmount[0]?.total || 0)
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching fee statistics', error: err.message });
    }
};

module.exports = {
    feeCreate,
    getFees,
    getFeeDetail,
    updateFee,
    deleteFee,
    deleteFees,
    markFeeAsPaid,
    getFeesByStatus,
    getFeesByStudent,
    getFeesByClass,
    searchFees,
    getFeeStatistics
};
