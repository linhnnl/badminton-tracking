import {
    Autocomplete,
    Box,
    Button,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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

const costTableHeadCellSx = {
    fontWeight: 700,
    fontSize: 16,
    bgcolor: '#f1f5f9',
    borderBottom: '1px solid #e5e7eb',
} as const;

const costTableSx = {
    tableLayout: 'fixed',
    width: '100%',
    '& .MuiTableCell-root': {
        px: 2,
        py: 1.25,
        textAlign: 'center',
        verticalAlign: 'middle',
    },
} as const;

const costActionCellSx = {
    width: 48,
    maxWidth: 48,
    minWidth: 48,
    px: 0.5,
} as const;

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

            <TableContainer
                sx={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 2,
                }}
            >
                <Table size="small" sx={costTableSx}>
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col style={{ width: 80 }} />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={costTableHeadCellSx}>
                                Danh mục
                            </TableCell>
                            <TableCell align="center" sx={costTableHeadCellSx}>
                                Đơn giá
                            </TableCell>
                            <TableCell align="center" sx={costTableHeadCellSx}>
                                Người thanh toán
                            </TableCell>
                            <TableCell align="center" sx={costTableHeadCellSx}>
                                Ghi chú
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ ...costTableHeadCellSx, ...costActionCellSx }}
                            />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id} hover>
                                <TableCell align="center">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Danh mục"
                                        value={item.category}
                                        onChange={(e) =>
                                            updateItem(item.id, {
                                                category: e.target.value,
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Đơn giá"
                                        value={
                                            item.unitPrice
                                                ? item.unitPrice.toLocaleString(
                                                      'vi-VN',
                                                  )
                                                : ''
                                        }
                                        onChange={(e) => {
                                            const raw = e.target.value.replace(
                                                /\D/g,
                                                '',
                                            );
                                            updateItem(item.id, {
                                                unitPrice: raw
                                                    ? Number(raw)
                                                    : 0,
                                            });
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
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
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={item.note}
                                        onChange={(e) =>
                                            updateItem(item.id, {
                                                note: e.target.value,
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell align="center" sx={costActionCellSx}>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
