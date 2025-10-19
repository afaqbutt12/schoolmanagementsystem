const TeacherPayment = require('../models/teacherPaymentSchema.js');

// Create a new teacher payment record
const createTeacherPayment = async (req, res) => {
    try {
        const payment = new TeacherPayment({
            ...req.body,
            school: req.body.adminID
        });

        const result = await payment.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(500).json({ message: 'Error creating teacher payment', error: err.message });
    }
};

// Get all teacher payments for a school
const getTeacherPayments = async (req, res) => {
    try {
        const payments = await TeacherPayment.find({ school: req.params.id })
            .populate('teacher', 'name email phone')
            .sort({ createdAt: -1 });
        
        res.send(payments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teacher payments', error: err.message });
    }
};

// Get teacher payment details by ID
const getTeacherPaymentDetail = async (req, res) => {
    try {
        const payment = await TeacherPayment.findById(req.params.id)
            .populate('teacher', 'name email phone')
            .populate('school', 'schoolName');
        
        if (!payment) {
            return res.status(404).send({ message: 'Payment record not found' });
        }
        
        res.send(payment);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching payment details', error: err.message });
    }
};

// Update teacher payment
const updateTeacherPayment = async (req, res) => {
    try {
        const payment = await TeacherPayment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('teacher', 'name email phone');
        
        if (!payment) {
            return res.status(404).send({ message: 'Payment record not found' });
        }
        
        res.send(payment);
    } catch (err) {
        res.status(500).json({ message: 'Error updating payment record', error: err.message });
    }
};

// Delete teacher payment
const deleteTeacherPayment = async (req, res) => {
    try {
        const payment = await TeacherPayment.findByIdAndDelete(req.params.id);
        
        if (!payment) {
            return res.status(404).send({ message: 'Payment record not found' });
        }
        
        res.send({ message: 'Payment record deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting payment record', error: err.message });
    }
};

// Delete all teacher payments for a school
const deleteTeacherPayments = async (req, res) => {
    try {
        const result = await TeacherPayment.deleteMany({ school: req.params.id });
        res.send({ message: `${result.deletedCount} payment records deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting payments', error: err.message });
    }
};

// Mark payment as paid
const markPaymentAsPaid = async (req, res) => {
    try {
        const payment = await TeacherPayment.findById(req.params.id);
        if (!payment) {
            return res.status(404).send({ message: 'Payment record not found' });
        }

        payment.status = 'Paid';
        payment.paymentDate = new Date();
        payment.paymentMethod = req.body.paymentMethod || 'Cash';
        payment.transactionId = req.body.transactionId;

        await payment.save();
        res.send({ message: 'Payment marked as paid successfully', payment });
    } catch (err) {
        res.status(500).json({ message: 'Error marking payment as paid', error: err.message });
    }
};

// Get payments by status
const getPaymentsByStatus = async (req, res) => {
    try {
        const payments = await TeacherPayment.find({ 
            school: req.params.id, 
            status: req.params.status 
        }).populate('teacher', 'name email phone');
        
        res.send(payments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching payments by status', error: err.message });
    }
};

// Get payments by teacher
const getPaymentsByTeacher = async (req, res) => {
    try {
        const payments = await TeacherPayment.find({ 
            school: req.params.id, 
            teacherId: req.params.teacherId 
        }).populate('teacher', 'name email phone');
        
        res.send(payments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching payments by teacher', error: err.message });
    }
};

// Get payments by month and year
const getPaymentsByMonth = async (req, res) => {
    try {
        const payments = await TeacherPayment.find({ 
            school: req.params.id, 
            month: req.params.month,
            year: parseInt(req.params.year)
        }).populate('teacher', 'name email phone');
        
        res.send(payments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching payments by month', error: err.message });
    }
};

// Search payments
const searchPayments = async (req, res) => {
    try {
        const { query } = req.query;
        const payments = await TeacherPayment.find({
            school: req.params.id,
            $or: [
                { teacherName: { $regex: query, $options: 'i' } },
                { teacherId: { $regex: query, $options: 'i' } },
                { subject: { $regex: query, $options: 'i' } }
            ]
        }).populate('teacher', 'name email phone');
        
        res.send(payments);
    } catch (err) {
        res.status(500).json({ message: 'Error searching payments', error: err.message });
    }
};

// Get payment statistics
const getPaymentStatistics = async (req, res) => {
    try {
        const schoolId = req.params.id;
        
        const totalPayments = await TeacherPayment.countDocuments({ school: schoolId });
        const paidPayments = await TeacherPayment.countDocuments({ school: schoolId, status: 'Paid' });
        const pendingPayments = await TeacherPayment.countDocuments({ school: schoolId, status: 'Pending' });
        const overduePayments = await TeacherPayment.countDocuments({ school: schoolId, status: 'Overdue' });
        
        const totalAmount = await TeacherPayment.aggregate([
            { $match: { school: mongoose.Types.ObjectId(schoolId) } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        
        const paidAmount = await TeacherPayment.aggregate([
            { $match: { school: mongoose.Types.ObjectId(schoolId), status: 'Paid' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        
        res.send({
            totalPayments,
            paidPayments,
            pendingPayments,
            overduePayments,
            totalAmount: totalAmount[0]?.total || 0,
            paidAmount: paidAmount[0]?.total || 0,
            pendingAmount: (totalAmount[0]?.total || 0) - (paidAmount[0]?.total || 0)
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching payment statistics', error: err.message });
    }
};

module.exports = {
    createTeacherPayment,
    getTeacherPayments,
    getTeacherPaymentDetail,
    updateTeacherPayment,
    deleteTeacherPayment,
    deleteTeacherPayments,
    markPaymentAsPaid,
    getPaymentsByStatus,
    getPaymentsByTeacher,
    getPaymentsByMonth,
    searchPayments,
    getPaymentStatistics
};
