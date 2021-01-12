import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

// All methods related to post queries should be in this file
interface PostData {
    id: number,
    title: string,
    content: string,
    authorid: number,
    faveid: number
}
export type dataPost = PostData[]

const AllPosts = () => {
    const [posts, setPosts] = useState<dataPost>()

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const blogPosts = await axios.get<dataPost>('http://localhost:4000/posts')
            console.log(blogPosts.data)
            setPosts(blogPosts.data)
        }
        fetchData();
    }, []);

    const deletePost = (id) => {
        // axios.delete(http://localhost:4000/posts/:id)
    }
    // Render content for each post
    const renderPosts = (blogPosts) => {
        return blogPosts?.map(post => {
            return (
                <div key={post.id}>
                    <Post info={post} delete={deletePost} />
                </div>
            )
        })
    }

    return (
        <div>
            {renderPosts(posts)}
        </div>
    );
};

export default AllPosts;