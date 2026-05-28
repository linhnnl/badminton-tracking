import { useState } from 'react';
import CreateOrEdit from './CreateOrEdit';
import { mockMembers, type Member, type MemberDto } from '../../Common/mockdata.ts';
import CommonDataGrid from '../../Component/CommonDataGrid/index.tsx';
import EditIcon from '@mui/icons-material/Edit';
import type { GridColDef } from '@mui/x-data-grid';
import { Chip, IconButton } from '@mui/material';

export default function MemberContainer() {
    const [members] = useState<Member[]>(mockMembers);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const columns: GridColDef<MemberDto>[] = [
        {
            field: 'id', 
            headerName: 'ID', 
            flex: 0.2,
            valueGetter: (_,row) => row.id,
        },
        {
            field: 'username',
            headerName: 'Username',
            flex: 0.5,
            valueGetter: (_,row) => row.username,
        },
        {
            field: 'name',
            headerName: 'Tên',
            flex: 0.5,
            valueGetter: (_,row) => row.name,
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 0.5,
            renderCell: (params) => (
                <Chip
                    label={params.row.status}
                    className={
                        params.row.status === 'Active'
                            ? 'custom-chip-primary'
                            : 'custom-chip-warning'
                    }
                    size="small"
                />
            ),
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
    const handleCreate = () => {
        setSelectedMember(null);
        setOpenModal(true);
    };

    const handleEdit = (member: Member) => {
        setSelectedMember(member);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedMember(null);
    };

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">List Member</h2>
                <button className="btn btn-primary" onClick={handleCreate}>
                    Add Member
                </button>
            </div>

            <CommonDataGrid
                rows={members}
                columns={columns}
            />

            {openModal && (
                <CreateOrEdit member={selectedMember} onClose={handleClose} />
            )}
        </div>
    );
}
