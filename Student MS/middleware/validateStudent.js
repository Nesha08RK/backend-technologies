const Student = require("../models/Student");

// Single student validation
const validateSingleStudent = async (req, res, next) => {
    const { name, rollNumber, grade, school } = req.body;

    if (!name || !rollNumber || !grade || !school) {
        return res.status(400).json({
            message: "name, rollNumber, grade, school are required"
        });
    }

    const exists = await Student.findOne({ rollNumber, school });
    if (exists) {
        return res.status(409).json({
            message: `Roll number ${rollNumber} already exists in ${school}`
        });
    }

    next();
};

// Multiple students validation
const validateMultiStudents = async (req, res, next) => {
    if (!Array.isArray(req.body)) {
        return res.status(400).json({
            message: "Expected array of students"
        });
    }

    let errors = [];

    for (let i = 0; i < req.body.length; i++) {
        const { name, rollNumber, grade, school } = req.body[i];

        if (!name || !rollNumber || !grade || !school) {
            errors.push({ index: i, reason: "Missing fields" });
            continue;
        }

        const exists = await Student.findOne({ rollNumber, school });
        if (exists) {
            errors.push({
                index: i,
                reason: `Roll number ${rollNumber} already exists in ${school}`
            });
        }
    }

    if (errors.length > 0) {
        return res.status(409).json({
            message: "Invalid student data",
            errors
        });
    }

    next();
};

module.exports = {
    validateSingleStudent,
    validateMultiStudents
};
