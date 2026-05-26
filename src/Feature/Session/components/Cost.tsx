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
import { memberOptions, type MemberOption } from './Information';
import { useMemo, useState } from 'react';

export type CostItem = {
    id: number;
    category: string;
    unitPrice: number;
    payer: MemberOption | null;
    note: string;
};

const fixedCostItems: CostItem[] = [
    {
        id: 1,
        category: 'Thuê sân',
        unitPrice: 400_000,
        payer: memberOptions[1],
        note: '2 giờ cao điểm',
    },
    {
        id: 2,
        category: 'Cầu + vợt',
        unitPrice: 80_000,
        payer: memberOptions[0],
        note: '1 hộp cầu, 2 vợt mượn',
    },
];

const variableCostItems: CostItem[] = [
    {
        id: 3,
        category: 'Nước uống',
        unitPrice: 45_000,
        payer: memberOptions[2],
        note: '6 chai nước suối',
    },
    {
        id: 4,
        category: 'Gửi xe',
        unitPrice: 20_000,
        payer: memberOptions[3],
        note: '',
    },
    {
        id: 5,
        category: 'Ăn nhẹ',
        unitPrice: 120_000,
        payer: memberOptions[4],
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

            <Box
                sx={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <Box
                    display="grid"
                    gridTemplateColumns="1.4fr 1fr 1.4fr 2fr 48px"
                    sx={{
                        bgcolor: '#f1f5f9',
                        px: 2,
                        py: 1,
                        fontWeight: 700,
                        fontSize: 13,
                    }}
                >
                    <Box>Danh mục</Box>
                    <Box>Đơn giá</Box>
                    <Box>Người thanh toán</Box>
                    <Box>Ghi chú</Box>
                    <Box />
                </Box>

                {items.map((item) => (
                    <Box
                        key={item.id}
                        display="grid"
                        gridTemplateColumns="1.4fr 1fr 1.4fr 2fr 48px"
                        gap={1.5}
                        alignItems="center"
                        sx={{
                            px: 2,
                            py: 1.5,
                            borderTop: '1px solid #e5e7eb',
                        }}
                    >
                        <TextField
                            size="small"
                            placeholder="Danh mục"
                            value={item.category}
                            onChange={(e) =>
                                updateItem(item.id, {
                                    category: e.target.value,
                                })
                            }
                        />
                        <TextField
                            size="small"
                            placeholder="Đơn giá"
                            value={
                                item.unitPrice
                                    ? item.unitPrice.toLocaleString('vi-VN')
                                    : ''
                            }
                            onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, '');
                                updateItem(item.id, {
                                    unitPrice: raw ? Number(raw) : 0,
                                });
                            }}
                        />
                        <Autocomplete
                            fullWidth
                            options={memberOptions}
                            value={item.payer}
                            onChange={(_, value) =>
                                updateItem(item.id, { payer: value })
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
                        <TextField
                            size="small"
                            value={item.note}
                            onChange={(e) =>
                                updateItem(item.id, { note: e.target.value })
                            }
                        />

                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeItem(item.id)}
                        >
                            <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
