import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';

import type { Member } from '../../types';

type Props = {
    member: Member | null;
    onClose: () => void;
};

const defaultMember: Member = {
    id: 0,
    name: '',
    status: 'active',
};

const statusOptions = [
    { id: 'active', name: 'Active' },
    { id: 'inactive', name: 'Inactive' },
] as const;

export default function CreateOrEdit({ member, onClose }: Props) {
    const isEdit = Boolean(member);
    const [form, setForm] = useState<Member>(member ?? defaultMember);

    useEffect(() => {
        setForm(member ?? defaultMember);
    }, [member]);

    const handleChange = <K extends keyof Member>(field: K, value: Member[K]) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            name: form.name,
            status: form.status,
        };

        try {
            if (isEdit && member) {
                await axios.put(`/api/members/${member.id}`, payload);
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
                        label="Tên"
                        fullWidth
                        size="small"
                        margin="normal"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />

                    <TextField
                        select
                        label="Trạng thái"
                        fullWidth
                        size="small"
                        margin="normal"
                        value={form.status}
                        onChange={(e) =>
                            handleChange(
                                'status',
                                e.target.value as Member['status'],
                            )
                        }
                    >
                        {statusOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
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
