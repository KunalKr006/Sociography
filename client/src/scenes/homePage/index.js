import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        justifyContent="center" // Center the content horizontally
        alignItems="flex-start"  // Align items at the start vertically
        flexDirection={isNonMobileScreens ? "row" : "column"} // Responsive direction
      >
        <Box
          flexBasis={isNonMobileScreens ? "42%" : "100%"} // Adjust width based on screen size
          margin="0 1rem" // Add margin for spacing
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
