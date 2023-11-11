import userService from "../service/userService"


const handleHome = (req, res) => {
    const users = userService.getUserList();
    return res.render("home.ejs", { user: req.user, list: users })
}

const handleAccount = (req, res) => {
    res.render('account', { user: req.user });
}

const handleSteamLogout = (req, res) => {
    req.logout();
    res.redirect('/');
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

module.exports = {
    handleHome,
    handleAccount,
    handleSteamLogout,
    ensureAuthenticated,
}