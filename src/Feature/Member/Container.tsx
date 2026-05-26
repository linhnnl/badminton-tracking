import { useState } from 'react';

import CommonTable, { renderChip } from '../../Component/CommonTable.tsx';
import type { Column, TableAction } from '../../Component/CommonTable.tsx';
import type { Member } from '../../types';
import CreateOrEdit from './CreateOrEdit';

const fakeMembers: Member[] = [
    { id: 1, name: 'Nguyễn Văn An', status: 'active' },
    { id: 2, name: 'Trần Thị Bình', status: 'active' },
    { id: 3, name: 'Lê Minh Cường', status: 'inactive' },
    { id: 4, name: 'Phạm Thị Dung', status: 'active' },
];

const columns: Column<Member>[] = [
    { field: 'id', headerName: 'ID'},
    { field: 'name', headerName: 'Tên'},
    {
        field: 'status',
        headerName: 'Trạng thái',
        render: renderChip<Member>('status', {
            getLabel: (value) => (value === 'active' ? 'Active' : 'Inactive'),
            getClassName: (value) =>
                value === 'active'
                    ? 'custom-chip-primary'
                    : 'custom-chip-warning',
        }),
    },
];

export default function MemberContainer() {
    const [members] = useState<Member[]>(fakeMembers);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [openModal, setOpenModal] = useState(false);

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

    const actions: TableAction<Member>[] = [
        {
            label: 'Chi tiết',
            onClick: handleEdit,
        },
    ];

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">List Member</h2>
                <button className="btn btn-primary" onClick={handleCreate}>
                    Add Member
                </button>
            </div>

            <CommonTable columns={columns} rows={members} actions={actions} />

            {openModal && (
                <CreateOrEdit member={selectedMember} onClose={handleClose} />
            )}
        </div>
    );
}
