export type MenuItem = {
    label: string;
    path?: string;
    icon?: string; // sau này có thể thay bằng ReactNode (icon MUI)
    children?: MenuItem[];
    role?: string;
  };

export const menu: MenuItem[] = [
    {
        label: "Home",
        path: "",
        icon: "home",
    },
    {
        label: "Court",
        path: "courts",
        icon: "courts",
    },
    {
        label: "Members",
        icon: "members",
        path: "members",
    },
    {
        label: "Sessions",
        icon: "sessions",
        path: "sessions",
    },
];