const errormiddleware = async(err, req, res, next) => {

    const status = err.status || 469;
    const message = err.message || "Backend error";
    const extraDetail = err.extraDetail || "Error from backend";

    return res.status(status).json({message, extraDetail});
};

module.exports = errormiddleware;