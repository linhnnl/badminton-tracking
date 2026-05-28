import {
    Autocomplete,
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMemo, useState } from 'react';
import { mockMembers, type CostDto, type MemberDto } from '../../../Common/mockdata';
import CommonDataGrid from '../../../Component/CommonDataGrid';
import type { GridColDef } from '@mui/x-data-grid';

export type CostItem = {
    id: number;
    category: string;
    unitPrice: number;
    payer: MemberDto | null;
    note: string;
};

const fixedCostItems: CostItem[] = [
    {
        id: 1,
        category: 'Thuê sân',
        unitPrice: 400_000,
        payer: mockMembers[1],
        note: '2 giờ cao điểm',
    },
    {
        id: 2,
        category: 'Cầu + vợt',
        unitPrice: 80_000,
        payer: mockMembers[0],
        note: '1 hộp cầu, 2 vợt mượn',
    },
];

const variableCostItems: CostItem[] = [
    {
        id: 3,
        category: 'Nước uống',
        unitPrice: 45_000,
        payer: mockMembers[2],
        note: '6 chai nước suối',
    },
    {
        id: 4,
        category: 'Gửi xe',
        unitPrice: 20_000,
        payer: mockMembers[3],
        note: '',
    },
    {
        id: 5,
        category: 'Ăn nhẹ',
        unitPrice: 120_000,
        payer: mockMembers[4],
        note: 'Trà sữa + bánh mì',
    },
];

function formatCurrency(amount: number) {
    return `${amount.toLocaleString('vi-VN')} đ`;
}

function createEmptyItem(items: CostItem[]): CostItem {
    const nextId =
        items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

    return {
        id: nextId,
        category: '',
        unitPrice: 0,
        payer: null,
        note: '',
    };
}

export default function Cost() {
    const [fixedItems, setFixedItems] = useState(fixedCostItems);
    const [variableItems, setVariableItems] = useState(variableCostItems);

    const totalCost = useMemo(
        () =>
            [...fixedItems, ...variableItems].reduce(
                (sum, item) => sum + item.unitPrice,
                0,
            ),
        [fixedItems, variableItems],
    );

    return (
        <Stack spacing={3}>
            <CostSection
                title="Chi phí cố định"
                items={fixedItems}
                onItemsChange={setFixedItems}
            />
            <Box
                sx={{
                    bgcolor: '#ecfdf5',
                    border: '1px solid #bbf7d0',
                    borderRadius: 3,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography fontWeight={700}>
                    Tổng cố định
                </Typography>

                <Typography fontWeight={800} color="success.main">
                    {formatCurrency(totalCost)}
                </Typography>
            </Box>

            <CostSection
                title="Chi phí phát sinh"
                items={variableItems}
                onItemsChange={setVariableItems}
            />

            <Box
                sx={{
                    bgcolor: '#ecfdf5',
                    border: '1px solid #bbf7d0',
                    borderRadius: 3,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography fontWeight={700}>
                    Tổng phát sinh
                </Typography>

                <Typography fontWeight={800} color="success.main">
                    {formatCurrency(totalCost)}
                </Typography>
            </Box>
        </Stack>
    );
}

type CostSectionProps = {
    title: string;
    items: CostItem[];
    onItemsChange: (items: CostItem[]) => void;
};

function CostSection({ title, items, onItemsChange }: CostSectionProps) {
    const updateItem = (id: number, patch: Partial<CostItem>) => {
        onItemsChange(
            items.map((item) =>
                item.id === id ? { ...item, ...patch } : item,
            ),
        );
    };

    const addItem = () => {
        onItemsChange([...items, createEmptyItem(items)]);
    };

    const removeItem = (id: number) => {
        onItemsChange(items.filter((item) => item.id !== id));
    };
    
    const columns: GridColDef<CostDto>[] = [
        {
            field: 'category', 
            headerName: 'Danh mục', 
            renderCell: (params)=>(
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Danh mục"
                    value={params.row.category}
                    onChange={(e) =>
                        updateItem(params.row.id, {
                            category: e.target.value,
                        })
                    }
                />
            ),
        },
        {
            field: 'total',
            headerName: 'Số tiền',
            renderCell: (params)=>(
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Đơn giá"
                    value={
                        params.row.total
                            ? params.row.total.toLocaleString(
                                    'vi-VN',
                                )
                            : ''
                    }
                    onChange={(e) => {
                        const raw = e.target.value.replace(
                            /\D/g,
                            '',
                        );
                        updateItem(params.row.id, {
                            unitPrice: raw
                                ? Number(raw)
                                : 0,
                        });
                    }}
                />
            ),
        },
        {
            field: 'payer',
            headerName: 'Người thanh toán',
            cellClassName: 'autocomplete-cell',
            renderCell: (params) => (
                    <Autocomplete
                        fullWidth
                        options={mockMembers}
                        value={params.row.payer}
                        onChange={(_, value) =>
                            updateItem(params.row.id, { payer: value })
                        }
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

            ),
        },
        {
            field: 'paymentType',
            headerName: 'Loại thanh toán',
            renderCell: (params) => (
                <TextField
                    fullWidth
                    size="small"
                    value={params.row.description}
                    onChange={(e) =>
                        updateItem(params.row.id, {
                            note: e.target.value,
                        })
                    }
                />
            ),
        },
        {
            field: 'actions',
            headerName: '',
            flex: 0.3,
            renderCell: (params) => (
                <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeItem(params.row.id)}
                >
                    <DeleteOutlineIcon fontSize="small"/>
                </IconButton>
            ),
        }   
    ];

    return (
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
                    {title}
                </Typography>

                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    sx={{ textTransform: 'none' }}
                    onClick={addItem}
                >
                    Chi phí
                </Button>
            </Stack>

            <CommonDataGrid
                rows={items}
                columns={columns}
            />
        </Box>
    );
}
