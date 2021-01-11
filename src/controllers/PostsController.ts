import postPool from '../dbconfig/dbconnector';

class PostsController {

    public async viewAllPosts(req, res) {
        try {
            await postPool.query('SELECT * FROM posts', (error, results) => {
                console.log(results.rows)
                res.json(results.rows)
                // postPool.end()
            })


        } catch (error) {
            res.status(400).send(`${error} in butt`);
        }
    }

    //@GET description: view a specific blog post by ID
    public async viewPost(req, res) {
        postPool.query('SELECT * FROM posts WHERE id=1', (error, results) => {
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

    public async updatePost(request, response) {
        // In later iteration, check if title/content is null before updating
        postPool.query(`UPDATE posts SET title='New Beans', content='Lets get some bean action going!' 
            WHERE id=3`, (error, results) => {
            if (!error) console.log(results.rows)
        })
    }

    // @GET description: view favorited blogs posts
    public async viewFavPosts(request, response) {
        postPool.query(`SELECT * FROM posts WHERE faveid=1`, (error, results) => {
            if (!error) console.log(results.rows)
        })
    }

    //@DELETE description: remove/delete a post by id or title
    deletePost = async (request, response) => {
        postPool.query(`DELETE FROM posts WHERE id=1`, (error, results) => {
            if (!error) console.log(results.rows)
        })
    }
    // @GET description: view own posts by checking that author id matches current userID
    public async viewMyPosts(request, response) {
        postPool.query(`SELECT * FROM posts WHERE authorid=${request.user.id}`, (error, results) => {
            if (!error) console.log(results.rows)
        })
    }
}

export default PostsController;