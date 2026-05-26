import {
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import type { Session } from '../Container';

type Props = {
    sessions: Session[];
    onEdit: (session: Session) => void;
};

export default function SessionTable({ sessions, onEdit }: Props) {
    return (
        <TableContainer component={Paper} className="card">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Sân</TableCell>
                        <TableCell>Loại thanh toán</TableCell>
                        <TableCell>Người thanh toán</TableCell>
                        <TableCell>Số người</TableCell>
                        <TableCell align="right" />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sessions.map((session) => (
                        <TableRow key={session.id} hover>
                            <TableCell>{session.id}</TableCell>
                            <TableCell>{session.date}</TableCell>
                            <TableCell>{session.court}</TableCell>

                            <TableCell>
                                <Chip
                                    label={session.paymentType}
                                    size="small"
                                    className={
                                        session.paymentType === 'Monthly'
                                            ? 'custom-chip-primary'
                                            : 'custom-chip-warning'
                                    }
                                />
                            </TableCell>

                            <TableCell>{session.payer}</TableCell>

                            <TableCell>
                                {session.members.filter((m) => m.checked).length}
                            </TableCell>

                            <TableCell align="right">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className="custom-button custom-button-outline custom-button-sm"
                                    onClick={() => onEdit(session)}
                                >
                                    Chi tiết
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}