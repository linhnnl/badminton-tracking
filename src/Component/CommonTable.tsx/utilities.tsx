import { Chip, TextField } from '@mui/material';
import type { ReactNode } from 'react';

import type { CellFormat, Column } from './types';

export type ChipRenderOptions<T> = {
    getLabel?: (value: T[keyof T], row: T) => string;
    getClassName?: (value: T[keyof T], row: T) => string;
};

export type TextFieldRenderOptions<T> = {
    placeholder?: string;
    multiline?: boolean;
    onChange: (row: T, value: string) => void;
};

export function formatCellValue(value: unknown, format: CellFormat = 'text') {
    if (value == null || value === '') return '-';

    switch (format) {
        case 'money':
            return `${Number(value).toLocaleString('vi-VN')} đ`;
        case 'number':
            return Number(value).toLocaleString('vi-VN');
        case 'date':
            return new Date(String(value)).toLocaleDateString('vi-VN');
        default:
            return String(value);
    }
}

export function renderChip<T>(
    field: keyof T,
    options?: ChipRenderOptions<T>,
): (row: T) => ReactNode {
    return (row) => {
        const value = row[field];
        return (
            <Chip
                label={options?.getLabel?.(value, row) ?? formatCellValue(value)}
                size="small"
                className={options?.getClassName?.(value, row)}
            />
        );
    };
}

export function renderTextField<T>(
    field: keyof T,
    options: TextFieldRenderOptions<T>,
): (row: T) => ReactNode {
    return (row) => (
        <TextField
            fullWidth
            size="small"
            placeholder={options.placeholder}
            multiline={options.multiline}
            value={row[field] == null ? '' : String(row[field])}
            onChange={(e) => options.onChange(row, e.target.value)}
        />
    );
}

export function renderCell<T>(column: Column<T>, row: T) {
    if (column.render) {
        const x = column.render(row);
        console.log('x',x)
        return column.render(row);
    }

    return formatCellValue(row[column.field], column.format);
}
