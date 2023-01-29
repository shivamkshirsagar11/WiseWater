

const { decodeJWTtoken } = require('../../utility/decodeJWTtoken');

// @desc    giveUserType :- it will decode jwt token and give user type
// @route   post /api/user/
// @access  public

exports.giveUserType = (req, res) => {
        const {authorization} = req.headers;
    if ('Bearer undefined' !== authorization) {
        const decodedToken = decodeJWTtoken(req, res);
        console.log(decodedToken);
        res.status(200).json({
            userType: decodedToken.collectionName.toLowerCase(),
        })
    } else {
        res.status(200).json({
            userType: 'guest'
        });
    }
};