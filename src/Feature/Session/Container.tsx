import { useState } from 'react';
import CreateOrEdit from './CreateOrEdit';
import { mockSessions, type SessionDto } from '../../Common/mockdata.ts';
import type { GridColDef } from '@mui/x-data-grid';
import { Chip, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import CommonDataGrid from '../../Component/CommonDataGrid/Container.tsx';

export type PaymentType = 'Monthly' | 'Single' | 'No';

export type Member = {
    id: number;
    name: string;
    paymentType: PaymentType;
    checked: boolean;
};

export type Session = {
    id: number;
    date: string;
    court: string;
    paymentType: PaymentType;
    payer: string;
    members: Member[];
};

export default function Container() {
    const [sessions] = useState<SessionDto[]>(mockSessions);
    const [selectedSession, setSelectedSession] = useState<SessionDto | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleCreate = () => {
        setSelectedSession(null);
        setOpenModal(true);
    };

    const handleEdit = (session: SessionDto) => {
        setSelectedSession(session);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedSession(null);
    };

    const columns: GridColDef<SessionDto>[] = [
        {
            field: 'id', 
            headerName: 'ID', 
            flex: 0.2,
            valueGetter: (_,row) => row.id,
        },
        {
            field: 'date',
            headerName: 'Ngày',
            flex: 0.5,
            valueGetter: (_,row) => dayjs(row.date).format('H:mm DD/MM/YYYY'),
        },
        {
            field: 'court',
            headerName: 'Sân',
            flex: 0.5,
            valueGetter: (_,row) => row.court?.name,
        },
        {
            field: 'paymentType',
            headerName: 'Loại thanh toán',
            flex: 0.5,
            renderCell: (params) => (
                <Chip
                    label={params.row.paymentType}
                    className={
                        params.row.paymentType === 'Monthly'
                            ? 'custom-chip-primary'
                            : 'custom-chip-warning'
                    }
                    size="small"
                />
            ),
        },
        {
            field: 'members',
            headerName: 'Số người',
            flex: 0.5,
            valueGetter: (_,row) => row.members.filter((m) => m.isAttend).length,
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

            <CommonDataGrid
                rows={sessions}
                columns={columns}
            />
            {openModal && (
                <CreateOrEdit
                    session={selectedSession}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}
