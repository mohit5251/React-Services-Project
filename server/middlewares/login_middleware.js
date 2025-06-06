const login_Middleware = (schema) => async (req, res, next) =>{

    try {
        const parsebody = await schema.parseAsync(req.body);
        req.body = parsebody;
        next();
    } catch (err) {
        const status = 400;
        const extraDetail = err.errors[0].message;
        const message = "invalid credentials mk"

        const error = {
            status,
            extraDetail,
            message,
        }
        console.log(error);
        next(error);
    }
};

module.exports = login_Middleware;