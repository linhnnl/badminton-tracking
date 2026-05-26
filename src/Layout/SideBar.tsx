import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Link,
} from 'react-router';
import { useLocation } from "react-router-dom";
import { menu } from './Menu';

type ListItemLinkProps = {
    to?: string;
    label: string;
    isParent?: boolean;
    open?: boolean;
    onClick?: () => void;
  };
  
function ListItemLink(props: ListItemLinkProps) {
  const location = useLocation();
  const { to, isParent, label, open, onClick, ...other } = props;
  const isActive = to
    ? location.pathname === `/${to}` ||
      location.pathname.startsWith(`/${to}/`)
    : false;

  return (
    <li>
      <ListItemButton
        component={Link}
        to={to ?? ""}
        onClick={onClick}
        {...other}
        selected={isActive}
      >
        <ListItemText primary={label} sx={{ pl: isParent ? 0 : 2 }} />
        {/* icon expand */}
        {isParent && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
    </li>
  );
}

export default function SideBar() {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  
    const handleClick = (label: string) => {
      setOpenMenu((prev) => (prev === label ? null : label));
    };
  
    return (
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 200,
          mt: 1,
        }}
      >
        {menu.map((item) => {
          const isOpen = openMenu === item.label;

          return (
            <div key={item.label}>
              <ListItemLink
                label={item.label}
                to={item.path ?? ""}
                isParent={!!item.children}
                open={isOpen}
                onClick={() => handleClick(item.label)}
              />

              {item.children && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List disablePadding >
                    {item.children.map((child) => (
                      <ListItemLink
                        key={child.path}
                        label={child.label}
                        to={child.path!}
                      />
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    );
}
