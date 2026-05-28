import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import dayjs from 'dayjs';

import { useState } from 'react';
import { mockCourts, mockMembers, type MemberDto, type SessionDto, type SessionMemberDto } from '../../../Common/mockdata.ts';

type Props = {
    formData: SessionDto;
};

const commonColumn: Partial<GridColDef> = {
    headerAlign: 'center',
    align: 'center',
    flex: 1,
};

const columns: GridColDef<SessionMemberDto>[] = [
    { 
        ...commonColumn,
        field: 'member', 
        headerName: 'Họ và tên', 
        valueGetter: (_,row) => row.member?.name,
    },
    {
        ...commonColumn,
        field: 'fixedCost',
        headerName: 'Chi phí cố định',
        valueGetter: (_,row) => row.fixedCost,
    },
    {
        ...commonColumn,
        field: 'isAttend',
        headerName: 'Tham gia',
        renderCell: (params) => (
            <Checkbox
                checked={!!params.row.isAttend}
                size="small"
                sx={{ p: 0.5 }}
            />
        ),
    },
    {
        ...commonColumn,
        field: 'type',
        headerName: 'Chi phí khác',
        valueGetter: (_,row) => row.extraCost,
    },
    {
        ...commonColumn,
        field: 'paymentStatus',
        headerName: 'Trạng thái',
        //width: 180,
        renderCell: (params) => (
            <FormControl fullWidth size="small">
                <Select
                    value={params.row.paymentStatus}
                    sx={{
                        '& .MuiSelect-select': {
                            textAlign: 'center',
                        },
                    }}
                >
                    <MenuItem value="Paid">
                        Đã thanh toán
                    </MenuItem>
    
                    <MenuItem value="Unpaid">
                        Chưa thanh toán
                    </MenuItem>
                </Select>
            </FormControl>
        ),
    }
];

export default function Information({ formData }: Props) {
    const [selectedMembers, setSelectedMembers] = useState<MemberDto[]>([]);
    console.log('formData',formData)
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
                        {/* <InputLabel>Sân</InputLabel>

                        <Select value={formData.court} label="Sân">
                            <MenuItem value="">Chọn sân</MenuItem>
                            <MenuItem value="Sân E - Tân Bình">
                                Sân E - Tân Bình
                            </MenuItem>
                            <MenuItem value="Sân A - Phú Nhuận">
                                Sân A - Phú Nhuận
                            </MenuItem>
                        </Select> */}

                        <Autocomplete
                            fullWidth
                            options={mockCourts}
                            value={formData.court}
                            // onChange={(_, value) =>
                            //     updateItem(item.id, { payer: value })
                            // }
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    placeholder="Tìm theo tên"
                                />
                            )}
                        />
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
                            options={mockMembers}
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

                <DataGrid
                    rows={formData.members}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    sx={{
                        '& .MuiDataGrid-columnHeader': {
                            bgcolor: '#f1f5f9',
                        },
                
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 700,
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    disableColumnResize
                />

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
                            options={mockMembers}
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
                    <DataGrid
                        rows={formData.members}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        sx={{
                            '& .MuiDataGrid-columnHeader': {
                                bgcolor: '#f1f5f9',
                            },
                    
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 700,
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        disableColumnResize
                    />
                </Box>
            </Box>
        </Stack>
    );
}