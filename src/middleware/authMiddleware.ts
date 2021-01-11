import jwt from 'jsonwebtoken';
import userPool from '../dbconfig/dbconnector';

const protect = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await userPool.query(`SELECT * FROM users
            WHERE id = $1`, [decoded.id], () => {
                console.log(decoded.id)
            })

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

}
export { protect }