"use client";
import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  }
  const handleTagClick = (tag) => {
    setSearchText(tag);
  }


  useEffect(()=>{
    const fetchPosts = async() => {
      try {
        // if searchText is empty, return all posts
        let response;
        if (searchText === "") response = await fetch("/api/prompt");
        else response = await fetch("/api/prompt/search?searchText="+searchText);
            

    
          const data = await response.json();
          setPosts(data)
        

        } catch (error) {
          console.log("fetchPosts: ", error.toString())
      }
    }
    fetchPosts();
    
  },[searchText,/* on load */])

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
      handleTagClick = {handleTagClick}
    />

    </section>
  )
}

export default Feed