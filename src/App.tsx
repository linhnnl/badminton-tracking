import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import MemberContainer from './Feature/Member/Container';
import SessionContainer from './Feature/Session/Container';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Product />} /> */}
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="members/*" element={<MemberContainer />} />
          <Route path="sessions/*" element={<SessionContainer />} />
          {/* <Route path="members/create" element={<CreateOrEdit />} />
          <Route path="members/edit/:id" element={<CreateOrEdit />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
}
