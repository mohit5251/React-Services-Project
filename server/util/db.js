const mongoose = require("mongoose");

const connect_db = async () => {
    const URI=process.env.MONGODB_URI;

    try {
        await mongoose.connect(URI);
        console.log("connection successfull");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connect_db;