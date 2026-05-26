import type { Session } from './Container';

type Props = {
    session: Session | null;
    onClose: () => void;
};

const defaultSession: Session = {
    id: 0,
    date: '',
    court: '',
    paymentType: 'Monthly',
    payer: '',
    members: [
        { id: 1, name: 'Nguyễn Văn An', paymentType: 'Monthly', checked: false },
        { id: 2, name: 'Trần Thị Bình', paymentType: 'Monthly', checked: false },
        { id: 3, name: 'Lê Minh Cường', paymentType: 'Single', checked: false },
        { id: 4, name: 'Phạm Thị Dung', paymentType: 'Monthly', checked: false },
    ],
};

export default function CreateOrEdit({ session, onClose }: Props) {
    const isEdit = Boolean(session);

    const formData = session ?? defaultSession;

    const selectedCount = formData.members.filter((m) => m.checked).length;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>
                        {isEdit ? 'Chỉnh sửa buổi đánh' : 'Tạo buổi đánh'}
                    </h2>

                    <button className="modal-close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Ngày</label>
                            <input
                                className="input"
                                value={formData.date}
                                placeholder="Chọn ngày"
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Sân đánh</label>
                            <select className="input" value={formData.court}>
                                <option value="">Chọn sân</option>
                                <option value="Sân E - Tân Bình">Sân E - Tân Bình</option>
                                <option value="Sân A - Phú Nhuận">Sân A - Phú Nhuận</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Loại thanh toán</label>
                            <select className="input" value={formData.paymentType}>
                                <option value="Monthly">Monthly</option>
                                <option value="Single">Single</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Người trả tiền</label>
                            <input
                                className="input"
                                value={formData.payer}
                                placeholder="Nhập người trả tiền"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mt-3">
                        <label className="form-label">Thành viên tham gia</label>

                        <div className="member-list mt-1">
                            {formData.members.map((member) => (
                                <div className="member-item" key={member.id}>
                                    <div className="member-info">
                                        <input
                                            type="checkbox"
                                            checked={member.checked}
                                            readOnly
                                        />

                                        <div className="avatar">
                                            {member.name.charAt(0)}
                                        </div>

                                        <span>{member.name}</span>
                                    </div>

                                    <span
                                        className={`badge ${
                                            member.paymentType === 'Monthly'
                                                ? 'badge-primary'
                                                : 'badge-warning'
                                        }`}
                                    >
                                        {member.paymentType}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <p className="selected-count">
                            Đã chọn {selectedCount} thành viên
                        </p>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-outline" onClick={onClose}>
                        Hủy
                    </button>

                    <button className="btn btn-primary">
                        {isEdit ? 'Lưu thay đổi' : 'Tạo mới'}
                    </button>
                </div>
            </div>
        </div>
    );
}