import { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    Typography,
} from '@mui/material';

import type { Court } from '../../Common/mockdata';

type Props = {
    court: Court | null;
    onClose: () => void;
};

const defaultCourt: Court = {
    id: 0,
    name: '',
    address: '',
};

export default function CreateOrEdit({ court, onClose }: Props) {
    const isEdit = Boolean(court);
    const [form, setForm] = useState<Court>(court ?? defaultCourt);

    const handleChange = <K extends keyof Court>(field: K, value: Court[K]) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            name: form.name,
            //status: form.status,
        };

        try {
            if (isEdit && court) {
                await axios.put(`/api/members/${court.id}`, payload);
            } else {
                await axios.post('/api/members', payload);
            }
            onClose();
        } catch {
            // API error: giữ modal mở để user thử lại
        }
    };

    return (
        <Dialog
            open
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    overflow: 'hidden',
                },
            }}
        >
            <Box sx={{ px: 3, pt: 3, pb: 1 }}>
                <Typography variant="h6" fontWeight={700}>
                    {isEdit ? 'Chi tiết thành viên' : 'Thêm thành viên'}
                </Typography>
            </Box>

            <DialogContent
                sx={{
                    bgcolor: '#f8fafc',
                    px: 3,
                    py: 2,
                }}
            >
                <Box
                    sx={{
                        bgcolor: '#fff',
                        borderRadius: 3,
                        p: 3,
                        border: '1px solid #e5e7eb',
                    }}
                >
                    <TextField
                        label="Username"
                        fullWidth
                        size="small"
                        margin="normal"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        size="small"
                        margin="normal"
                        value={form.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, borderTop: '1px solid #e5e7eb' }}>
                <Button variant="outlined" onClick={onClose}>
                    Hủy
                </Button>

                <Button variant="contained" onClick={handleSubmit}>
                    {isEdit ? 'Lưu' : 'Tạo mới'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
