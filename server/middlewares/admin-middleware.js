const adminMiddleware = async(req, res, next) =>{
    try {
        const adminRole = req.user.isAdmin;
        
        if(!adminRole){
            return res.status(403).json({message : "Access denied, User is not Admin"});
        }
        //if user is admin then proceed to the next middleware
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;
