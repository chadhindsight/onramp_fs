import userPool from '../dbconfig/dbconnector';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';

class UserController {

    // Signup/Register new user
    public async createUser(req, res) {
        const { name, email, password } = req.body
        let hashedPassword = await bcrypt.hash(password, 10)


        userPool.query(`SELECT * FROM users
            WHERE email = $1`, [email], (err, results) => {
            if (err) { throw err }

            if (results.rows.length > 0) {
                res.send('Sorry, email already registered')
                // Should direct to dashboard
                res.status(201).json({})
            } else {
                userPool.query(
                    `upda INTO users (name, email, passwordhash)
                VALUES ($1, $2, $3)
                RETURNING name, email`,
                    [name, email, hashedPassword],
                    async (err, results) => {
                        if (err) {
                            res.send(err)
                            throw new Error(err)
                        }
                        console.log(results.rows)
                        res.send(results.rows);
                        // res.redirect to dashboard
                    }
                );
            }
        })

    }

    // Login & authenticate a user
    public async loginUser(req, res) {
        const { email, password } = req.body
        let hashedPassword = await bcrypt.hash(password, 10)

        const matchPassword = async (enteredPassword) => {
            return await bcrypt.compare(enteredPassword, hashedPassword)
        }

        // Check DB to see if the user's email is there
        const exists = await userPool.query(`SELECT * FROM users
            WHERE email = $1`, [email])

        if (exists.rows.length === 0) {
            res.status(401).send('Invalid login')
        }

        else if (exists.rows[0].email === email && (await matchPassword(exists.rows[0].passwordhash))) {
            let user = exists.rows[0]

            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            })
        } else {
            res.status(401).send('Invalid login')
        }
    }


    // Update user info
    public async updateUser(req, res) {
        const { name, email, password } = req.body
        let hashedPassword = await bcrypt.hash(password, 10)

        // Allow a logged in user the ability to change name, email or pw
        const user = await userPool.query(`UPDATE users SET name=$1, email = $2, passwordhash = $3 WHERE id = $4`,
            [name, email, hashedPassword, req.user.id])
    }
}

export default UserController;