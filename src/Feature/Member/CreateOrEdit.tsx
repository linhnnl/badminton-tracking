import { useEffect, useState } from "react";
import axios from "axios";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Member } from "../../types";

const StatusOption = [
  { id: 'active', name: "Active" },
  { id: 'inactive', name: "Inactive" },
]

// type Product = {
//   id?: number
//   name?: string
//   price?: number
//   description?: string
//   status?: number
// }

function CreateOrEdit (){
    const [form, setForm] = useState<Member>();
    const { id } = useParams<{ id: string }>();
    
    const navigate = useNavigate();
    const location = useLocation()
    
    const isOpen = location.pathname.includes("create") || Boolean(id);
    const closeDrawer = () => {
      navigate("/members");
    };

    useEffect(() => {
      if (!id) {
        setForm({ id: 0, name: "", status: 'active' } as Member);
        return;
      }
      (async () => {
        try {
          //const res = await axios.get(`/api/members/${id}`);
          const mockData = 
            { id: 1, name: "John Doe", status: 'active' }
          setForm(mockData as Member);
          //setForm(res.data);
        } catch {
          setForm({ id: 0, name: '', status: 'active' } as Member);
        }
      })();
      return;
    }, [id]);

    // const handleChange = (field: string, value: any) => {
    //   setForm((prev) => ({
    //     ...prev,
    //     [field]: value,
    //   }));
    // };

    const handleSubmit = async () => {
      if (!form) return;
      const payload = {
        name: form.name ?? "",
        // price: form.price ?? 0,
        // description: form.description ?? "",
        // status: form.status ?? 0,
      };
      try {
        if (id) {
          await axios.put(`/api/members/${id}`, payload);
        } else {
          await axios.post("/api/members", payload);
        }
        closeDrawer();
      } catch {
        // API error: giữ drawer mở để user sửa / thử lại
      }
    };
  return (
    <Drawer anchor="right" open={isOpen} onClose={closeDrawer}>
      <Box sx={{ width: 400, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {id ? "Edit Product" : "Create Product"}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={form?.name}
          variant="standard"
          //onChange={(e) => handleChange("name", e.target.value)}
        />
        {/* <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={form?.price}
          variant="standard"
          onChange={(e) => handleChange("price", Number(e.target.value))}
        /> */}
        {/* <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          value={form?.description}
          variant="standard"
          onChange={(e) => handleChange("description", e.target.value)}
        /> */}
        <TextField
          select
          label="Status"
          value={form?.status ?? ""}
          //onChange={(e) => handleChange("status", Number(e.target.value))}
          fullWidth
          margin="normal"
          variant="standard"
        >
          {StatusOption.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button onClick={closeDrawer} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} >
            {id ? "Save" : "Create"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CreateOrEdit;