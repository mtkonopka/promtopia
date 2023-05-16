"use client";
import Profile from "@components/Profile"
import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClientOnly from "@components/ClientOnly";



const MyProfile = () => {
  const {data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }
  const handleDelete= async (post) => {
    const hasConfirmed = confirm("Are you sure?");
    if(hasConfirmed) try {
        console.log(`delete-prompt: deleting post ${post._id}`)
        const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

     
        setPosts(posts.filter((p) => p._id !== post._id))
   
    } catch (error) {
      console.log("`delete-prompt: submiting: ",error);
    } 
  }

  useEffect(()=>{
      const fetchUserPosts = async() => {
        try {
          console.log("MyProfile_fetchUserPosts");
              const response = await fetch(`/api/users/${session?.user.id}/posts`);

              if (response.ok) {
                  const data = await response.json();
                  setPosts(data)
              }
          } catch (error) {
            console.log("MyProfile_fetchPosts: ", error.toString())
        }
      }
      if(session?.user.id) fetchUserPosts();
  },[])


  return (
  
    <Profile 
        name={"My"}
        desc="Profile Page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}

    />

  )
}

export default MyProfile