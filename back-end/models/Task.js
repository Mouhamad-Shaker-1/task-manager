const { MongoServerClosedError, MaxKey } = require('mongodb')
const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name for task'],
        minLength: 4,
        maxLength: 30,
        trim: true
    },
    description: {
        type: String,
        maxLength: 200,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        select: false // This makes the field protected by default
      }
}, {timestamps:true})

// taskSchema.pre('save', function(next) {
//     if (this.isModified('createdBy')) {
//       throw new Error('createdBy field is protected and cannot be modified');
//     }
//     next();
//   });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
