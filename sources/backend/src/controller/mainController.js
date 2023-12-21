import userService from "../service/userService"


const handleHome = async (req, res) => {
    const userlist = await userService.getUsers();
    return res.render("home.ejs", { user: req.user, userlist })
}



const handleSteamLogout = (req, res) => {
    req.logout();
    res.redirect('/');
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    res.redirect('/');
}
const handleUpdatedTradeURL = async (req, res) => {
    await userService.updatedTradeURL(req.params.id, req.body.TradeURL)
    res.redirect('/');
}
const handleUpdatedWallet = async (req, res) => {
    await userService.updateWallet(req.params.id, req.body.Wallet)
    res.redirect('/');
}
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

module.exports = {
    handleHome,
    handleSteamLogout,
    ensureAuthenticated,
    handleDeleteUser,
    handleUpdatedTradeURL,
    handleUpdatedWallet
}