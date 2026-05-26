import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function Layout(){
  return (
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <SideBar />
  
        {/* Content */}
        <main style={{ padding: 20, backgroundColor: "#f5f5f5", flex: 1}}>
          <Outlet />
        </main>
      </div>
    );
}