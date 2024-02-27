import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    hostel: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});


const Student = model('Students', studentSchema);

export { Student };