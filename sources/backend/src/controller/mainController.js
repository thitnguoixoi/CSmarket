import userService from "../service/userService"


const handleHome = async (req, res) => {
    const userlist = await userService.getUserList();
    return res.render("home.ejs", { user: req.user, userlist })
}

const handleAccount = async (req, res) => {
    const user = await userService.getUserTradeURL(req.user.id);

    res.render('account', { steaminfo: req.user, user });
}

const handleSteamLogout = (req, res) => {
    req.logout();
    res.redirect('/');
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    res.redirect('/');
}
const handleUpdateUser = async (req, res) => {
    await userService.updatedUser(req.params.id, req.body.TradeURL)
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
    handleDeleteUser,
    handleUpdateUser
}