import type { Session } from '../Container';

type Props = {
    sessions: Session[];
    onEdit: (session: Session) => void;
};

export default function SessionTable({ sessions, onEdit }: Props) {
    return (
        <div className="card">
            <table className="session-table">
                <thead>
                    <tr>
                        <th>Ngày</th>
                        <th>Sân đánh</th>
                        <th>Loại thanh toán</th>
                        <th>Người trả tiền</th>
                        <th>Số người tham gia</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {sessions.map((session) => (
                        <tr key={session.id}>
                            <td>{session.date}</td>
                            <td>{session.court}</td>
                            <td>
                                <span
                                    className={`badge ${
                                        session.paymentType === 'Monthly'
                                            ? 'badge-primary'
                                            : 'badge-warning'
                                    }`}
                                >
                                    {session.paymentType}
                                </span>
                            </td>
                            <td>{session.payer}</td>
                            <td>{session.members.filter((m) => m.checked).length}</td>
                            <td className="text-right">
                                <button
                                    className="btn btn-outline btn-sm"
                                    onClick={() => onEdit(session)}
                                >
                                    Xem chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}