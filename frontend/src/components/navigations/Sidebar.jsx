"use client"; // Add this if you're in Next.js App Router

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/Inbox";
import style from "./style.module.css";

const drawerWidth = 240;

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: "Create Book",
      path: "/create-book",
      icon: <InboxIcon />,
    },
    {
      name: "View Books",
      path: "/view-books",
      icon: <MailIcon />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="h6" noWrap component="div">
            Book Management System
          </Typography>
        </Box>
        <Divider />
        <List>
          {tabs.map((tab) => (
            <ListItem key={tab.name} disablePadding>
              <ListItemButton
                onClick={() => router.push(tab.path)}
                selected={pathname === tab.path}
                className={pathname === tab.path ? style.active : ""}
              >
                <ListItemIcon>{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
