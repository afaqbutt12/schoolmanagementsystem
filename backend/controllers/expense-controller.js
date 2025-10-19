const Expense = require('../models/expenseSchema.js');

// Create a new expense
const expenseCreate = async (req, res) => {
    try {
        const expense = new Expense({
            ...req.body,
            school: req.body.adminID
        });

        const result = await expense.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(500).json({ message: 'Error creating expense', error: err.message });
    }
};

// Get all expenses for a school
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ school: req.params.id })
            .populate('approvedBy', 'name')
            .sort({ createdAt: -1 });
        
        res.send(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expenses', error: err.message });
    }
};

// Get expense details by ID
const getExpenseDetail = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id)
            .populate('approvedBy', 'name')
            .populate('school', 'schoolName');
        
        if (!expense) {
            return res.status(404).send({ message: 'Expense not found' });
        }
        
        res.send(expense);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expense details', error: err.message });
    }
};

// Update expense
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('approvedBy', 'name');
        
        if (!expense) {
            return res.status(404).send({ message: 'Expense not found' });
        }
        
        res.send(expense);
    } catch (err) {
        res.status(500).json({ message: 'Error updating expense', error: err.message });
    }
};

// Delete expense
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        
        if (!expense) {
            return res.status(404).send({ message: 'Expense not found' });
        }
        
        res.send({ message: 'Expense deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting expense', error: err.message });
    }
};

// Delete all expenses for a school
const deleteExpenses = async (req, res) => {
    try {
        const result = await Expense.deleteMany({ school: req.params.id });
        res.send({ message: `${result.deletedCount} expenses deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting expenses', error: err.message });
    }
};

// Mark expense as paid
const markExpenseAsPaid = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).send({ message: 'Expense not found' });
        }

        expense.status = 'Paid';
        expense.paymentDate = new Date();
        expense.paymentMethod = req.body.paymentMethod || 'Cash';
        expense.transactionId = req.body.transactionId;
        expense.receiptNumber = req.body.receiptNumber;

        await expense.save();
        res.send({ message: 'Expense marked as paid successfully', expense });
    } catch (err) {
        res.status(500).json({ message: 'Error marking expense as paid', error: err.message });
    }
};

// Get expenses by status
const getExpensesByStatus = async (req, res) => {
    try {
        const expenses = await Expense.find({ 
            school: req.params.id, 
            status: req.params.status 
        }).populate('approvedBy', 'name');
        
        res.send(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expenses by status', error: err.message });
    }
};

// Get expenses by type
const getExpensesByType = async (req, res) => {
    try {
        const expenses = await Expense.find({ 
            school: req.params.id, 
            expenseType: req.params.type 
        }).populate('approvedBy', 'name');
        
        res.send(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expenses by type', error: err.message });
    }
};

// Get expenses by category
const getExpensesByCategory = async (req, res) => {
    try {
        const expenses = await Expense.find({ 
            school: req.params.id, 
            category: req.params.category 
        }).populate('approvedBy', 'name');
        
        res.send(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expenses by category', error: err.message });
    }
};

// Search expenses
const searchExpenses = async (req, res) => {
    try {
        const { query } = req.query;
        const expenses = await Expense.find({
            school: req.params.id,
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { expenseType: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { vendor: { $regex: query, $options: 'i' } }
            ]
        }).populate('approvedBy', 'name');
        
        res.send(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Error searching expenses', error: err.message });
    }
};

// Get expense statistics
const getExpenseStatistics = async (req, res) => {
    try {
        const schoolId = req.params.id;
        
        const totalExpenses = await Expense.countDocuments({ school: schoolId });
        const paidExpenses = await Expense.countDocuments({ school: schoolId, status: 'Paid' });
        const dueExpenses = await Expense.countDocuments({ school: schoolId, status: 'Due' });
        const overdueExpenses = await Expense.countDocuments({ school: schoolId, status: 'Overdue' });
        
        const totalAmount = await Expense.aggregate([
            { $match: { school: mongoose.Types.ObjectId(schoolId) } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        
        const paidAmount = await Expense.aggregate([
            { $match: { school: mongoose.Types.ObjectId(schoolId), status: 'Paid' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        
        // Get expenses by type
        const expensesByType = await Expense.aggregate([
            { $match: { school: mongoose.Types.ObjectId(schoolId) } },
            { $group: { _id: '$expenseType', total: { $sum: '$amount' }, count: { $sum: 1 } } },
            { $sort: { total: -1 } }
        ]);
        
        res.send({
            totalExpenses,
            paidExpenses,
            dueExpenses,
            overdueExpenses,
            totalAmount: totalAmount[0]?.total || 0,
            paidAmount: paidAmount[0]?.total || 0,
            pendingAmount: (totalAmount[0]?.total || 0) - (paidAmount[0]?.total || 0),
            expensesByType
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expense statistics', error: err.message });
    }
};

// Approve expense
const approveExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).send({ message: 'Expense not found' });
        }

        expense.approvedBy = req.body.approvedBy;
        await expense.save();
        
        res.send({ message: 'Expense approved successfully', expense });
    } catch (err) {
        res.status(500).json({ message: 'Error approving expense', error: err.message });
    }
};

module.exports = {
    expenseCreate,
    getExpenses,
    getExpenseDetail,
    updateExpense,
    deleteExpense,
    deleteExpenses,
    markExpenseAsPaid,
    getExpensesByStatus,
    getExpensesByType,
    getExpensesByCategory,
    searchExpenses,
    getExpenseStatistics,
    approveExpense
};
