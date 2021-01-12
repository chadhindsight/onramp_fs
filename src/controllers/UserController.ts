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
                    `INSERT INTO users (name, email, passwordhash)
                VALUES ($1, $2, $3)
                RETURNING id, name`,
                    [name, email, hashedPassword],
                    (err, results) => {
                        if (err) {
                            res.send(err)
                            throw new Error(err)
                        }

                        res.send(results.rows);
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


    // View user dashboard/profile
    public async viewDash(req, res) {

    }
}

export default UserController;