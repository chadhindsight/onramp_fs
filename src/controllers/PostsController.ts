import postPool from '../dbconfig/dbconnector';
// import SpecialReq from '../utils/reqDefinition';

class PostsController {

    public async viewAllPosts(req, res) {
        try {
            await postPool.query('SELECT * FROM posts', (error, results) => {
                console.log(results.rows)
                res.json(results.rows)
                // postPool.end()
            })


        } catch (error) {
            res.status(400).send(`${error} error. Please try again`);;
        }
    }

    //@GET description: view a specific blog post by title
    public async viewPost(req, res) {
        await postPool.query('SELECT * FROM posts WHERE title=$1', [req.query.name], (error, results) => {
            if (!error) console.log(results.rows)
            res.json(results.row)
        })
    }

    //@POST description: create a blog post
    public async createPost(req, res) {
        postPool.query(`INSERT INTO posts (title, content, authorid, faveid) VALUES('New Jeans', 'Buy a loved some new jeans', 2,1)`, [], (error, results) => {
            if (!error) console.log(results.rows)
            res.json(results.row)
        })

    }

    public async updatePost(req, res) {
        // In later iterations check if title/content is null before updating
        postPool.query(`UPDATE posts SET title=$1, content=$2 
            WHERE id=$3`, [req.body.title, req.body.content, req.params.id], (error, results) => {
            if (!error) console.log(results.rows)
        })
    }

    // @GET description: view favorited blogs posts
    public async viewFavPosts(req, res) {
        postPool.query(`SELECT * FROM posts WHERE faveid=$1`, [req.params.id], (error, results) => {
            if (!error) {
                console.log(results.rows)
                res.send(results.rows)
            }
        })
    }

    //@DELETE description: remove/delete a post by id or title
    deletePost = async (req, res) => {
        await postPool.query(`DELETE FROM posts WHERE id=$1`, [req.params.id], async (error, results) => {
            if (!error) {
                console.log('deleted!')
                // console.log(results.rows)
                const updatedList = await postPool.query(`SELECT * FROM posts`)
                res.status(200).send(updatedList)
            }
            else {
                res.status(401).send('Something went wrong. Sorry, try logging in or signing up!')
            }
        })
    }
    // @GET description: view own posts by checking that author id matches current userID
    public async viewMyPosts(req, res) {
        postPool.query(`SELECT id, title, content FROM posts WHERE authorid=$1`, [req.params.id], (error, results) => {
            if (!error) {
                console.log(results.rows)
                res.send(results.rows)
            }
        })
    }
}
export default PostsController;
