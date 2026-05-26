import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import dayjs from 'dayjs';

import type { Session } from '../Container';
import { useState } from 'react';

type Props = {
    formData: Session;
};

export type MemberOption = {
    id: number;
    name: string;
    avatar?: string;
};

export const memberOptions: MemberOption[] = [
    {
        id: 1,
        name: 'Nguyễn Văn An',
    },
    {
        id: 2,
        name: 'Trần Thị Bình',
    },
    {
        id: 3,
        name: 'Lê Minh Cường',
    },
    {
        id: 4,
        name: 'Phạm Thị Dung',
    },
    {
        id: 5,
        name: 'Hoàng Gia Huy',
    },
    {
        id: 6,
        name: 'Đỗ Minh Khôi',
    },
];



export default function Information({ formData }: Props) {
    //const selectedCount = formData.members.filter((m) => m.checked).length;
    const [selectedMembers, setSelectedMembers] = useState<MemberOption[]>([]);
    return (
        <Stack spacing={3}>
            <Box
                sx={{
                    bgcolor: '#fff',
                    borderRadius: 3,
                    p: 3,
                    border: '1px solid #e5e7eb',
                }}
            >
                <Typography fontWeight={700} mb={2}>
                    Thông tin buổi chơi
                </Typography>

                <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={2}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Thời gian"
                            value={formData.date ? dayjs(formData.date) : null}
                            format="DD/MM/YYYY HH:mm"
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    size: 'small',
                                },
                            }}
                        />
                    </LocalizationProvider>

                    <FormControl fullWidth size="small">
                        <InputLabel>Sân</InputLabel>

                        <Select value={formData.court} label="Sân">
                            <MenuItem value="">Chọn sân</MenuItem>
                            <MenuItem value="Sân E - Tân Bình">
                                Sân E - Tân Bình
                            </MenuItem>
                            <MenuItem value="Sân A - Phú Nhuận">
                                Sân A - Phú Nhuận
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                        <InputLabel>Loại thanh toán</InputLabel>

                        <Select
                            value={formData.paymentType}
                            label="Loại thanh toán"
                        >
                            <MenuItem value="Monthly">Monthly</MenuItem>
                            <MenuItem value="Single">Single</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Box
                sx={{
                    bgcolor: '#fff',
                    borderRadius: 3,
                    p: 3,
                    border: '1px solid #e5e7eb',
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                    spacing={2}
                >
                    <Typography fontWeight={700}>
                        Thành viên cố định
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                            width: 520,
                            maxWidth: '70%',
                        }}
                    >
                        <Autocomplete
                            multiple
                            fullWidth
                            options={memberOptions}
                            value={selectedMembers}
                            onChange={(_, value) => setSelectedMembers(value)}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    placeholder="Tìm theo tên"
                                />
                            )}
                        />

                        <Button
                            variant="contained"
                            disabled={selectedMembers.length === 0}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                bgcolor: '#eef2ff',
                                color: '#4f46e5',
                            }}
                            onClick={() => {
                                console.log(selectedMembers);
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </Button>
                        
                    </Stack>

                </Stack>

                <Box
                    sx={{
                        border: '1px solid #e5e7eb',
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        display="grid"
                        gridTemplateColumns="2fr 1fr 1fr 1fr 1fr"
                        sx={{
                            bgcolor: '#f1f5f9',
                            px: 2,
                            py: 1,
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        <Box>Họ và tên</Box>
                        <Box>Chi phí cố định</Box>
                        <Box>Tham gia</Box>
                        <Box>Chi phí khác</Box>
                        <Box>Trạng thái</Box>
                    </Box>

                    {formData.members.map((member) => (
                        <Box
                            key={member.id}
                            display="grid"
                            gridTemplateColumns="2fr 1fr 1fr 1fr 1fr"
                            alignItems="center"
                            sx={{
                                px: 2,
                                py: 1.2,
                                borderTop: '1px solid #e5e7eb',
                                '&:hover': {
                                    bgcolor: '#f8fafc',
                                },
                            }}
                        >
                            <Typography fontSize={14}>
                                {member.name}
                            </Typography>

                            <Typography fontSize={14}>
                                500,000 đ
                            </Typography>

                            <Checkbox checked={member.checked} size="small"/>

                            <Typography fontSize={14}>
                                0 đ
                            </Typography>
                            <FormControl fullWidth size="small">
                                <Select>
                                    <MenuItem value="Done">Đã thanh toán</MenuItem>
                                    <MenuItem value="Not">Chưa thanh toán</MenuItem>
                                </Select>
                            </FormControl>
                            
                        </Box>
                    ))}
                </Box>

            </Box>

            <Box
                sx={{
                    bgcolor: '#fff',
                    borderRadius: 3,
                    p: 3,
                    border: '1px solid #e5e7eb',
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography fontWeight={700}>
                        Khách vãng lai
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                            width: 520,
                            maxWidth: '70%',
                        }}
                    >
                        <Autocomplete
                            multiple
                            fullWidth
                            options={memberOptions}
                            value={selectedMembers}
                            onChange={(_, value) => setSelectedMembers(value)}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    placeholder="Tìm theo tên"
                                />
                            )}
                        />

                        <Button
                            variant="contained"
                            disabled={selectedMembers.length === 0}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                bgcolor: '#eef2ff',
                                color: '#4f46e5',
                            }}
                            onClick={() => {
                                console.log(selectedMembers);
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </Button>
                        
                    </Stack>
                </Stack>

                <Box
                    sx={{
                        border: '1px dashed #cbd5e1',
                        borderRadius: 2,
                        py: 4,
                        textAlign: 'center',
                        color: 'text.secondary',
                        bgcolor: '#f8fafc',
                    }}
                >
                    Chưa có khách vãng lai
                </Box>
            </Box>
        </Stack>
    );
}