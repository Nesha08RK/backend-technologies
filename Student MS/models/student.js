const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    }
}, { timestamps: true });

studentSchema.index(
    { rollNumber: 1, school: 1 },
    { unique: true }
);

module.exports = mongoose.model("Student", studentSchema);
