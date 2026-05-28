import { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    Tabs,
    Tab,
    Box,
} from '@mui/material';

import Information from './components/Information';
import Cost from './components/Cost';
import type { SessionDto } from '../../Common/mockdata';

type Props = {
    session: SessionDto | null;
    onClose: () => void;
};

const defaultSession: SessionDto = {
    id: 0,
    date: new Date(),
    courtId: 0,
    paymentType: 'Single',
    members: [],
    costs: []
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
                        mt: 2
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