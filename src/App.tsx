// App.tsx
import React, { useEffect, useState } from 'react';
import { Member, Session, Attendance, Payment } from './types';
import { fetchMembers, fetchSessions, fetchAttendances, fetchPayments } from './api';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    async function loadData() {
      const [m, s, a, p] = await Promise.all([
        fetchMembers(),
        fetchSessions(),
        fetchAttendances(),
        fetchPayments()
      ]);
      setMembers(m);
      setSessions(s);
      setAttendances(a);
      setPayments(p);
    }
    loadData();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Badminton Tracker</Typography>

      <Typography variant="h6">Members</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map(m => (
            <TableRow key={m.id}>
              <TableCell>{m.id}</TableCell>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6" sx={{ mt: 3 }}>Sessions</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map(s => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.date}</TableCell>
              <TableCell>{s.type}</TableCell>
              <TableCell>{s.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;