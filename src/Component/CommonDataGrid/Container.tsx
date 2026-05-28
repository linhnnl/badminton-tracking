import { DataGrid } from '@mui/x-data-grid';
import type {
    DataGridProps,
    GridColDef,
} from '@mui/x-data-grid';

const defaultColumn: Partial<GridColDef> = {
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    filterable: false,
    flex: 1,
};

export default function CommonDataGrid(props: DataGridProps) {
    const columns: GridColDef[] = props.columns.map((col) => ({
        ...defaultColumn,
        ...col,
    }));

    return (
        <DataGrid
            rowHeight={60}
            columnHeaderHeight={50}
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnResize
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}
            pageSizeOptions={[5, 10, 20]}
            
            {...props}
            columns={columns}

            sx={{
                '& .MuiDataGrid-columnHeader': {
                        bgcolor: '#f1f5f9',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 700,
                },
                '& .MuiDataGrid-cell:focus': {
                    outline: 'none',
                },
                '& .MuiDataGrid-cell:focus-within': {
                    outline: 'none !important',
                },

                '& .MuiDataGrid-columnHeader:focus': {
                    outline: 'none',
                },
                '& .MuiDataGrid-columnSeparator': {
                    display: 'none',
                },
                '& .MuiDataGrid-cell': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '& .MuiDataGrid-cell .MuiAutocomplete-root': {
                    display: 'flex',
                    alignItems: 'center',
                },
                ...props.sx,
            }}
        />
    );
}