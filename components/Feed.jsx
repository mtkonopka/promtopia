"use client";
import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([])

  const handleSearchChange = (event) => {}
  const handleTagClick = (event) => {}

  useEffect(()=>{
    const fetchPosts = async() => {
      try {
        const response = await fetch("/api/prompt/");

        if (response.ok) {
          const data = await response.json();
          setPosts(data)
        }

        } catch (error) {
          console.log("fetchPosts: ", error.toString())
      }
    }
    fetchPosts();
    
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          className="search_input peer"
          type="text"
          placeholder="Search.."
          value={searchText}
          onChange={handleSearchChange}
          required
        />

      </form>

    <PromptCardList 
      data={posts}
      handleTagClick = {() => {}}
    />

    </section>
  )
}

export default Feed