module.exports = function (req, res, next) {
    if (req.method === 'Options'){
        next()
    }

    try {

    } catch(e) {
        console.log(e)
        return res.status(400).json({message: 'pls login'})
    }
}