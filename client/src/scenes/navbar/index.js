import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DarkMode, LightMode, Menu, Close, AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Sociography
        </Typography>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          <FormControl variant="standard">
            <Select
              value={fullName}
              displayEmpty
              IconComponent={null}
              sx={{
                backgroundColor: "transparent",
                width: "50px",
                borderRadius: "0.25rem",
                p: "0.25rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: "transparent",
                },
                
              }}
              input={<InputBase />}
              renderValue={() => <AccountCircle sx={{ fontSize: "35px" }} />}
            >
              <MenuItem
                onClick={() => navigate(`/profile/${user._id}`)} // Navigate to profile page
              >
                <AccountCircle sx={{ fontSize: "35px", marginRight: "0.5rem" }} />
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => dispatch(setLogout())}
                sx={{
                  color: theme.palette.mode === "dark" ? "white" : "red", // Text color based on theme
                  backgroundColor: theme.palette.mode === "dark" ? "transparent" : "transparent", // Keep background transparent
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "darkred" : "red", // Keep background red for light mode
                    color: theme.palette.mode === "dark" ? "lightgray" : "white", // Contrast text color on hover
                  },
                }} // Set hover styles
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            <FormControl variant="standard">
              <Select
                value={fullName}
                displayEmpty
                IconComponent={null}
                sx={{
                  backgroundColor: "transparent",
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: "transparent",
                  },
                }}
                input={<InputBase />}
                renderValue={() => <AccountCircle sx={{ fontSize: "35px" }} />}
              >
                <MenuItem
                  onClick={() => navigate(`/profile/${user._id}`)} // Navigate to profile page
                >
                  <AccountCircle sx={{ fontSize: "35px", marginRight: "0.5rem" }} />
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(setLogout())}
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "red", // Text color based on theme
                    backgroundColor: theme.palette.mode === "dark" ? "transparent" : "transparent", // Keep background transparent
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "dark" ? "darkred" : "red", // Keep background red for light mode
                      color: theme.palette.mode === "dark" ? "lightgray" : "white", // Contrast text color on hover
                    },
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
