import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

export default function Layout() {
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                minHeight: '100%',
                overflow: 'hidden',
            }}
        >
            <SideBar />

            <main
                style={{
                    flex: 1,
                    padding: 20,
                    backgroundColor: '#f5f5f5',
                    overflowY: 'auto',
                }}
            >
                <Outlet />
            </main>
        </div>
    );
}