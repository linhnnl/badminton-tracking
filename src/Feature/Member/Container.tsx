import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Constants from "../../Common/Contanst";
import type { Member } from "../../types";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

export default function MemberContainer() {
  const [members, setMembers] = useState<Member[]>([]);

  const loadMembers = async () => {
    //const res = await axios.get("/api/members");
    //const res = await axios.get("http://localhost:5203/api/products");
    const mockData = [
      { id: 1, name: "John Doe", status: 'active' },
      { id: 2, name: "Jane Doe", status: 'inactive' },
    ]
    setMembers(mockData as Member[]);
    //setMembers(res.data);

  };

  useEffect(() => {
    loadMembers();
  }, []);

  const navigate = useNavigate();
  const handleClear = (id: number) => {
    const a = id
    return a
  }

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Member List
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={() => navigate(Constants.CREATE_PATH)}>
          Add Member
        </Button> 

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {members.map((p) => (
              <TableRow 
                key={p.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`${Constants.EDIT_PATH}/${p.id}`)}
              >
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                {/* <TableCell>{p.price}</TableCell> */}
                <TableCell
                  onClick={(e) => e.stopPropagation()} // 🔥 cực quan trọng
                >
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleClear(p.id)}
                  >
                    Clear
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}