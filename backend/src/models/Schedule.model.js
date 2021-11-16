const mongoose = require('../database')
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const SchedulesSchema = new Schema({
  type_schedule: String,
  created: {
    type: Date,
    default: function() {
      if (this.released) {
        return Date.now();
      }
      return null;
    }
  },
  date: {
    type: Date,
    required: true
  },
  hour: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true
  },
  topics: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  person_one: {
    user: ObjectId,
    accepted: Boolean,
    real_topic: [String],
    message: String,
    rate: Number
  },
  person_two: {
    user: ObjectId,
    accepted: Boolean,
    real_topic: [String],
    message: String,
    rate: Number
  }
})

module.exports = mongoose.model('schedules', SchedulesSchema)