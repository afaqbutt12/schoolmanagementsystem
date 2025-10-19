const Parent = require('../models/parentSchema.js');

// Create a new parent
const parentCreate = async (req, res) => {
    try {
        const existingParent = await Parent.findOne({
            $or: [
                { email: req.body.email },
                { idNo: req.body.idNo }
            ]
        });

        if (existingParent) {
            return res.status(400).send({ message: 'Parent with this email or ID already exists' });
        }

        const parent = new Parent({
            ...req.body,
            school: req.body.adminID
        });

        const result = await parent.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(500).json({ message: 'Error creating parent', error: err.message });
    }
};

// Get all parents for a school
const getParents = async (req, res) => {
    try {
        const parents = await Parent.find({ school: req.params.id })
            .populate('children', 'name rollNum sclassName')
            .sort({ createdAt: -1 });
        
        res.send(parents);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching parents', error: err.message });
    }
};

// Get parent details by ID
const getParentDetail = async (req, res) => {
    try {
        const parent = await Parent.findById(req.params.id)
            .populate('children', 'name rollNum sclassName')
            .populate('school', 'schoolName');
        
        if (!parent) {
            return res.status(404).send({ message: 'Parent not found' });
        }
        
        res.send(parent);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching parent details', error: err.message });
    }
};

// Update parent
const updateParent = async (req, res) => {
    try {
        const parent = await Parent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('children', 'name rollNum sclassName');
        
        if (!parent) {
            return res.status(404).send({ message: 'Parent not found' });
        }
        
        res.send(parent);
    } catch (err) {
        res.status(500).json({ message: 'Error updating parent', error: err.message });
    }
};

// Delete parent
const deleteParent = async (req, res) => {
    try {
        const parent = await Parent.findByIdAndDelete(req.params.id);
        
        if (!parent) {
            return res.status(404).send({ message: 'Parent not found' });
        }
        
        res.send({ message: 'Parent deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting parent', error: err.message });
    }
};

// Delete all parents for a school
const deleteParents = async (req, res) => {
    try {
        const result = await Parent.deleteMany({ school: req.params.id });
        res.send({ message: `${result.deletedCount} parents deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting parents', error: err.message });
    }
};

// Add child to parent
const addChildToParent = async (req, res) => {
    try {
        const parent = await Parent.findById(req.params.id);
        if (!parent) {
            return res.status(404).send({ message: 'Parent not found' });
        }

        if (!parent.children.includes(req.body.childId)) {
            parent.children.push(req.body.childId);
            await parent.save();
        }

        res.send({ message: 'Child added to parent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding child to parent', error: err.message });
    }
};

// Remove child from parent
const removeChildFromParent = async (req, res) => {
    try {
        const parent = await Parent.findById(req.params.id);
        if (!parent) {
            return res.status(404).send({ message: 'Parent not found' });
        }

        parent.children = parent.children.filter(child => child.toString() !== req.body.childId);
        await parent.save();

        res.send({ message: 'Child removed from parent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error removing child from parent', error: err.message });
    }
};

module.exports = {
    parentCreate,
    getParents,
    getParentDetail,
    updateParent,
    deleteParent,
    deleteParents,
    addChildToParent,
    removeChildFromParent
};
