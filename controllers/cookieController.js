const cookieController = {};

//creating a cookie
cookieController.createCookie = (req, res, next) => {
    res.cookie('randomCookie', Math.floor(Math.random() * 99));
    return next();
}




export default cookieController;