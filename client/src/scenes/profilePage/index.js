import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar"; // Ensure Navbar path is correct
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // State to store user info
  const { userId } = useParams(); // Get userId from the URL
  const token = useSelector((state) => state.token); // Get token from Redux
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Media query for responsive layout

  // Fetch user data from the API
  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  // Fetch the user data on component mount
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null; // Return nothing if user data is not available

  return (
    <Box>
      {/* Navbar */}
      <Navbar />
      
      {/* Main content layout */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/* Left sidebar - User details and friend list */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* User profile widget */}
          <UserWidget userId={userId} picturePath={user.picturePath} />
          
          <Box m="2rem 0" />

          {/* Friend list widget */}
          <FriendListWidget userId={userId} />
        </Box>

        {/* Right section - User posts */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* Widget to create new post */}
          <MyPostWidget picturePath={user.picturePath} />
          
          <Box m="2rem 0" />

          {/* Posts widget showing the user's posts */}
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
