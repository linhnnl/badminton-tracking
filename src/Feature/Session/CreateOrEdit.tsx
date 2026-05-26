import { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Tabs,
    Tab,
    Box,
} from '@mui/material';

import type { Session } from './Container';
import Information from './components/Information';
import Cost from './components/Cost';

type Props = {
    session: Session | null;
    onClose: () => void;
};

const defaultSession: Session = {
    id: 0,
    date: '',
    court: '',
    paymentType: 'No',
    payer: '',
    members: [
        { id: 1, name: 'Nguyễn Văn An', paymentType: 'No', checked: false },
        { id: 2, name: 'Trần Thị Bình', paymentType: 'No', checked: false },
        { id: 3, name: 'Lê Minh Cường', paymentType: 'Single', checked: false },
        { id: 4, name: 'Phạm Thị Dung', paymentType: 'Monthly', checked: false },
    ],
};

export default function CreateOrEdit({ session, onClose }: Props) {
    const isEdit = Boolean(session);
    const [tab, setTab] = useState(0);

    const formData = session ?? defaultSession;

    return (
        <Dialog
            open
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    overflow: 'hidden',
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                {isEdit ? 'Thông tin buổi chơi' : 'Thêm buổi chơi'}
            </DialogTitle>

            <Box sx={{ borderBottom: '1px solid #e5e7eb' }}>
                <Tabs
                    value={tab}
                    onChange={(_, value) => setTab(value)}
                    sx={{
                        px: 3,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                        },
                    }}
                >
                    <Tab label="Thông tin" />
                    <Tab label="Chi phí" />
                </Tabs>
            </Box>

            <DialogContent
                sx={{
                    bgcolor: '#f8fafc',
                    p: 3,
                    minHeight: 520,
                }}
            >
                {tab === 0 && <Information formData={formData} />}

                {tab === 1 && <Cost />}
            </DialogContent>

            <DialogActions sx={{ p: 2.5, borderTop: '1px solid #e5e7eb' }}>
                <Button variant="outlined" onClick={onClose}>
                    Hủy
                </Button>

                <Button variant="contained">
                    {isEdit ? 'Lưu' : 'Tạo mới'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}