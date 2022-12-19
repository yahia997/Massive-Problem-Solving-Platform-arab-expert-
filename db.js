const mongoose = require('mongoose');

// Users //
const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    img: {type: String, required: false, unique: false},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true, unique: false },
    passedChallenges: [String],
    points: {type: Number, required: false, unique: false, default: 0}
}, {
    timestamps: true,
});

// Challenges //
const challengeSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true, unique: false},
    type: {type: String, required: true, unique: false},
    testing: {type: String, required: true, unique: false},
    peoplePassed: {type: Number, required: false, unique: false, default: 0},
    solution: { type: String, required: false, unique: false },
    forbidden: [String],
    funcName: { type: String, required: true, unique: false },
    img: {type: String}
}, {
    timestamps: true,
});

// usersNumber //
const usersNumberSchema = new mongoose.Schema({
    num: {type: Number}
}, {
    timestamps: true,
});


// articles //
const articlesSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: false },
    body: { type: String, required: true, unique: false },
    numOfPeople: {type: Number, required: true, default: 0,unique: false},
    keyWords: {type: String, required: false, unique: false},
    created: { type: String, default: () => new Date().toLocaleString(), unique: false },
    updated: { type: String, default: () => new Date().toLocaleString(), unique: false }
}, {
    timestamps: true,
});


const User = mongoose.model('users', userSchema);

const Challenge = mongoose.model('challenges', challengeSchema);

const UsersNumber = mongoose.model('usersNumber', usersNumberSchema);

const Articles = mongoose.model('articles', articlesSchema);

module.exports = { User , Challenge, UsersNumber, Articles};

