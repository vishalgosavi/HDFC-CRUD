const User = require("../models/userModel");

const getUser = async (email) => {
    try {
        let result = await User.findOne({ where: { email: email } });
        return result.dataValues;
    }
    catch (err) {
        console.log("Error retrieving user:"+ err.message);
    }
};

module.exports = getUser