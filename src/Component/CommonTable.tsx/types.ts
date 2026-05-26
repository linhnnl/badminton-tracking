import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export type CellFormat = 'text' | 'number' | 'money' | 'date';

export type Column<T> = {
    field: keyof T;
    headerName: string;
    align?: 'left' | 'center' | 'right';
    width?: number | string;
    /** Định dạng khi không có `render` */
    format?: CellFormat;
    /** Chip, TextField, hoặc UI bất kỳ — dùng `renderChip` / `renderTextField` */
    render?: (row: T) => ReactNode;
};

export type TableAction<T> = {
    label: string;
    icon?: ReactNode;
    color?: 'primary' | 'error' | 'success' | 'warning';
    onClick: (row: T) => void;
};

export type CommonTableProps<T> = {
    columns: Column<T>[];
    rows: T[];
    actions?: TableAction<T>[];
    className?: string;
    size?: 'small' | 'medium';
    getRowKey?: (row: T, index: number) => string | number;
    tableSx?: SxProps<Theme>;
    headCellSx?: SxProps<Theme>;
    containerSx?: SxProps<Theme>;
    /** `card`: Paper + class card (list). `plain`: chỉ viền, dùng trong form */
    variant?: 'card' | 'plain';
};
