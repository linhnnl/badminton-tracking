import {
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer as MuiTableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import { renderCell } from './utilities';
import type { CommonTableProps } from './types';

function columnKey<T>(column: CommonTableProps<T>['columns'][number]) {
    return `${String(column.field)}-${column.headerName}`;
}

export default function TableContainer<T>({
    columns,
    rows,
    actions,
    className,
    size,
    getRowKey,
    tableSx,
    headCellSx,
    containerSx,
    variant = 'card',
}: CommonTableProps<T>) {
    const isPlain = variant === 'plain';

    return (
        <MuiTableContainer
            component={isPlain ? Box : Paper}
            className={isPlain ? className : (className ?? 'card')}
            sx={
                isPlain
                    ? {
                          border: '1px solid #e5e7eb',
                          borderRadius: 2,
                          ...containerSx,
                      }
                    : containerSx
            }
        >
            <Table size={size} sx={tableSx}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={columnKey(column)}
                                align={column.align}
                                sx={{ width: column.width, ...headCellSx }}
                            >
                                {column.headerName}
                            </TableCell>
                        ))}

                        {actions?.length ? (
                            <TableCell align="right" sx={headCellSx} />
                        ) : null}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow
                            key={getRowKey?.(row, rowIndex) ?? rowIndex}
                            hover
                        >
                            {columns.map((column) => (
                                <TableCell
                                    key={columnKey(column)}
                                    align={column.align}
                                >
                                    {renderCell(column, row)}
                                </TableCell>
                            ))}

                            {actions?.length ? (
                                <TableCell align="right">
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="flex-end"
                                    >
                                        {actions.map((action) => (
                                            <Button
                                                key={action.label}
                                                size="small"
                                                variant="outlined"
                                                color={
                                                    action.color ?? 'primary'
                                                }
                                                className="custom-button custom-button-outline custom-button-sm"
                                                startIcon={action.icon}
                                                onClick={() =>
                                                    action.onClick(row)
                                                }
                                            >
                                                {action.label}
                                            </Button>
                                        ))}
                                    </Stack>
                                </TableCell>
                            ) : null}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </MuiTableContainer>
    );
}
