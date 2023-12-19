const testAPI = (req, res) => {
    return res.status(200).json({
        Message: "ok"
    })
}

module.exports = {
    testAPI
}