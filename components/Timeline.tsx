import React, { useState, useEffect } from 'react'
import Post from './Post'
import apiClient from '@/lib/apiClient'
import { PostType } from '@/types'

const Timeline = () => {

  const [comment, setComment] = useState<string>("")
  const [newPostsArray, setNewPostsArray] = useState<PostType[]>([])

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await apiClient.get("/posts/get_latest_post")
        setNewPostsArray(response.data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchLatestPosts()
  },[])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const newPost = await apiClient.post('/posts/post', {
        content: comment,
      })
      setNewPostsArray(prevPost => [newPost.data, ...prevPost])
      setComment("")

    } catch(error) {
      alert('Please login.')
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100">
    <main className="container mx-auto py-4">
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="What's on your mind?"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>setComment(e.target.value)}
            value={comment}
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
          >
            POST
          </button>
        </form>
      </div>
      {newPostsArray.map((post: PostType) => (
        <Post key={post.id} post={post}/>
      ))}
    </main>
  </div>
  )
}

export default Timeline