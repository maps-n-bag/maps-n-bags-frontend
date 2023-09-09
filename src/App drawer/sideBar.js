import * as React from "react";
import {
  styled,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { OpenInFullRounded } from "@mui/icons-material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BookIcon from "@mui/icons-material/Book";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import PublicIcon from '@mui/icons-material/Public';
import { Avatar, Tooltip } from "@mui/material";

const drawerWidth = 240;

const iconData = [
  { icon: HomeIcon, name: "Home", link: "" },
  { icon: PublicIcon, name: "Others Plan", link: "OthersPlan" },
  { icon: PermContactCalendarIcon, name: "Profile", link: `Profile/${localStorage.getItem("userId")}` },
  { icon: BookIcon, name: "Blog", link: "AllBlog" },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#DBD3D3" }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: "black",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: "#00000", }} />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            style={{
              fontFamily: "Special Elite",
              marginLeft: "5%",
              textAlign: "center",
            }}
          >
            <Link to={`/`} style={{ textDecoration: "none", color: "black" }}>
              Maps 'n Bags
            </Link>
          </Typography>

          <Tooltip title="Profile">
            <IconButton
              style={{
                marginLeft: "auto",
              }}
            >
              <Link to={`/Profile/${localStorage.getItem("userId")}`} style={{ textDecoration: "none" }}>
                <Avatar
                  alt="Profile Picture"
                  src={localStorage.getItem("userImage")}
                  sx={{ width: 32, height: 32 }}
                />
              </Link>
            </IconButton>
          </Tooltip>

        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}

      //sx={{ color: "rgba(225,249,27,1)" }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {iconData.map((icons, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Link to={`/${icons.link}`}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <icons.icon />

                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  </ListItemIcon>
                </Link>
                <ListItemText
                  primary={icons.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <Link to={`/createplan`}>
            {["Create Plan"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <EditCalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>

            ))}
          </Link>
        </List>

        <Divider />

        <List>
          <Link to={`/`}>
            <ListItem key={"Logout"} disablePadding sx={{ display: "block" }} onClick={() => { localStorage.clear(); }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <KeyboardReturnIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0, color: "red" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>

      </Drawer>

    </Box>
  );
}
