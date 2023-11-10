import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams()
    const {data: blog, isPending, error} = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory()
    
    const handleDelete = () => {
        //这里的handleDelete之所以不需要入参 blog.id，是因为这里的blog是从useFetch中获取的，而useFetch中的data是从fetch中获取的，而fetch中的数据是从http://localhost:8000/blogs/' + id获取的，所以这里的blog.id就是id
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/')
        })
    }
    
    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={ handleDelete }>delete</button>
                </article>
            )}
        </div>
    );
}
 
export default BlogDetails;