const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env variables
dotenv.config({ path: './config/config.env'});

// load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/course');
const User = require('./models/user');
const Review = require('./models/Review');

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// read json files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, `utf-8`));

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, `utf-8`));

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, `utf-8`));

const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, `utf-8`));

// import data to DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        await User.create(users);
        await Review.create(reviews);
        console.log('data imported ...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// delete data from DB
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('data Destroyed ...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}


if( process.argv[2] === '-i' ) {               // node seeder -i
    importData();
} else if( process.argv[2] == '-d') {          // node seeder -d
    deleteData();
}