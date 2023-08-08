const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

module.exports = {
    validate,
    isObjectId,
};
