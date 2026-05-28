import { useState } from 'react';
import { mockCourts, type Court } from '../../Common/mockdata.ts';
import type { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CreateOrEdit from './CreateOrEdit.tsx';
import CommonDataGrid from '../../Component/CommonDataGrid/Container.tsx';

// const commonColumn: Partial<GridColDef> = {
//     headerAlign: 'center',
//     align: 'center',
//     sortable: false,
//     filterable: false,
// };

export default function Container() {
    const [courts] = useState<Court[]>(mockCourts);
    const [selectedCourts, setSelectedCourts] = useState<Court | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleCreate = () => {
        setSelectedCourts(null);
        setOpenModal(true);
    };

    const handleEdit = (court: Court) => {
        setSelectedCourts(court);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedCourts(null);
    };

    const columnss: GridColDef<Court>[] = [
        {
            field: 'id', 
            headerName: 'ID', 
            flex: 0.2,
            valueGetter: (_,row) => row.id,
        },
        {
            field: 'name',
            headerName: 'Tên',
            valueGetter: (_,row) => row.name,
        },
        {
            field: 'address',
            headerName: 'Địa chỉ',
            valueGetter: (_,row) => row.address,
        },
        {
            field: 'actions',
            headerName: '',
            flex: 0.2,
            renderCell: (params) => (
                <IconButton
                    color="primary"
                    onClick={() => handleEdit(params.row)}
                >
                    <EditIcon fontSize="small"/>
                </IconButton>
            ),
        }
    ];

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">List Session</h2>
                <button className="btn btn-primary" onClick={handleCreate}>
                    Add Session
                </button>
            </div>

            {/* <CommonTable columns={columns} rows={sessions} actions={actions} /> */}
            <CommonDataGrid
                rows={courts}
                columns={columnss}
            />
            {openModal && (
                <CreateOrEdit
                    court={selectedCourts}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}