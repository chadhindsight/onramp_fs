import userPool from '../dbconfig/dbconnector';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';

class UserController {
    // Signup/Register new user
    // public async createUser(req, res) {
    //     const { name, email, password } = req.body
    //     let hashedPassword = await bcrypt.hash(password, 10)

    //     // Check if user alreadys exists
    //     const alreadyExists = await userPool.query(`SELECT * FROM users
    //         WHERE email = ${email}`).then(results => {
    //         if (results.rows.length > 0) throw new Error('Sorry, user already exists')
    //     }).catch(e => console.error(e.stack, 'from user already exists section'))

    //     // Authenticate user right after they register
    //     userPool.query(
    //         `INSERT INTO users (name, email, passwordhash)
    //             VALUES ($1, $2, $3)
    //             RETURNING id, name`,
    //         [name, email, hashedPassword],
    //         (err, results) => {
    //             if (err) {
    //                 throw err;
    //             }
    //             console.log(results.rows);
    //             res.send('Logged In')
    //             // res.redirect("/users/login");
    //         }
    //     );

    // }

    public async createUser(req, res) {
        const { name, email, password } = req.body
        let hashedPassword = await bcrypt.hash(password, 10)

        userPool.query(`SELECT * FROM users
            WHERE email = $1`, [email], (err, results) => {
            if (err) { throw err }

            if (results.rows.length > 0) {
                res.send('Sorry, email already registered')
                // Should direct to dashboard
                res.res.status(201).json({})
            } else {
                userPool.query(
                    `INSERT INTO users (name, email, passwordhash)
                VALUES ($1, $2, $3)
                RETURNING id, name`,
                    [name, email, hashedPassword],
                    (err, results) => {
                        if (err) {
                            throw err;
                        }
                        console.log(results.rows);
                        res.send(results.rows);
                    }
                );
            }
        })

    }

    // Login & authenticate a user
    public async loginUser(req, res) {
        const { email, password } = req.body

        const user = await userPool.query(`SELECT * FROM users
            WHERE email = $1`, [email], async (err, results) => {
            if (err) throw new Error("Something went wrong with login. Email might be incorrect ");

            const userInBD = results.rows[0];
            if (await bcrypt.compare(password, userInBD.passwordhash)) {
                console.log(userInBD)
                res.json({
                    id: userInBD.id,
                    name: userInBD.name,
                    email: userInBD.email,
                    token: generateToken(userInBD.id)
                })
            }
            else {
                res.status(401)
                throw new Error('Invalid email or password!')
            }
        })
    }

    // View user dashboard/profile
    public async viewDash(req, res) {
        const user = await userPool.query(`SELECT * FROM users
            WHERE id = ${req.user.id}`)

        if (user) {
            //Show user info
            res.json({
                email: user.email,
                name: user.name,
            })
        }
        else {
            res.status(404)
            throw new Error('User not found')
        }
    }
}

export default UserController;