const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const {
    validateSingleStudent,
    validateMultiStudents
} = require("../middleware/validateStudent");

// CREATE STUDENT (single or multiple)
router.post("/", async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            await validateMultiStudents(req, res, async () => {
                const students = await Student.insertMany(req.body);
                return res.status(201).json({
                    message: "Multiple students added",
                    count: students.length
                });
            });
        } else {
            await validateSingleStudent(req, res, async () => {
                const student = new Student(req.body);
                await student.save();
                return res.status(201).json({
                    message: "Student added",
                    student
                });
            });
        }
    } catch (err) {
        console.error("SERVER ERROR:", err);
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});

router.get("/", async (req, res) => {
    const students = await Student.find().sort({ school: 1, rollNumber: 1 });
    res.json({
        total: students.length,
        students
    });
});

router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const { rollNumber, school } = req.body;

        if (rollNumber && school) {
            const conflict = await Student.findOne({
                rollNumber,
                school,
                _id: { $ne: student._id }
            });

            if (conflict) {
                return res.status(409).json({
                    message: `Roll number ${rollNumber} already exists in ${school}`
                });
            }
        }

        Object.assign(student, req.body);
        await student.save();

        res.json({
            message: "Student updated successfully",
            student
        });

    } catch (err) {
        console.error("SERVER ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
