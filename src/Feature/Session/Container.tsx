import { useState } from 'react';
import CreateOrEdit from './CreateOrEdit';
import SessionTable from './components/SessionTable';

export type PaymentType = 'Monthly' | 'Single'|'No';

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

const fakeSessions: Session[] = [
    {
        id: 1,
        date: '04/01/2026',
        court: 'Sân E - Tân Bình',
        paymentType: 'Monthly',
        payer: 'Trần Thị Bình',
        members: [
            { id: 1, name: 'Nguyễn Văn An', paymentType: 'Monthly', checked: true },
            { id: 2, name: 'Trần Thị Bình', paymentType: 'Monthly', checked: true },
            { id: 3, name: 'Lê Minh Cường', paymentType: 'No', checked: false },
            { id: 4, name: 'Phạm Thị Dung', paymentType: 'Monthly', checked: true },
        ],
    },
    {
        id: 2,
        date: '04/08/2026',
        court: 'Sân A - Phú Nhuận',
        paymentType: 'Single',
        payer: 'Nguyễn Văn An',
        members: [
            { id: 1, name: 'Nguyễn Văn An', paymentType: 'Single', checked: true },
            { id: 2, name: 'Trần Thị Bình', paymentType: 'Monthly', checked: true },
        ],
    },
];

export default function Container() {
    const [sessions] = useState<Session[]>(fakeSessions);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleCreate = () => {
        setSelectedSession(null);
        setOpenModal(true);
    };

    const handleEdit = (session: Session) => {
        setSelectedSession(session);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedSession(null);
    };

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">List Session</h2>
                <button className="btn btn-primary" onClick={handleCreate}>
                    Add Session
                </button>
            </div>

            <SessionTable
                sessions={sessions}
                onEdit={handleEdit}
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