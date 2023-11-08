

const handleHome = (req, res) => {
    return res.render("home.ejs", { user: req.user })
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