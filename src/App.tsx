import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Member from './Feature/Member';
import SessionContainer from './Feature/Session/Container';
import Court from './Feature/Court';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Product />} /> */}
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="courts" element={<Court />} />
          <Route path="members" element={<Member />} />
          <Route path="sessions/*" element={<SessionContainer />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
}
