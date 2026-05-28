export const MemberStatus = {
    Ative: 'Active',
    InActive: 'InActive',
} as const;

export type MemberStatus =
    (typeof MemberStatus)[keyof typeof MemberStatus];

export type Member = {
    id: number;
    name: string;
    status: MemberStatus;
    username: string;
    password: string;
};

export const PaymentType = {
    Monthly: 'Monthly',
    Single: 'Single',
} as const;

export type PaymentType =
    (typeof PaymentType)[keyof typeof PaymentType];

export const MemberType = {
    Fixed: 'Fixed',
    Guest: 'Guest',
} as const;

export type MemberType =
    (typeof MemberType)[keyof typeof MemberType];

export const CostType = {
    Fixed: 'Fixed',
    Extra: 'Extra',
} as const;

export type CostType =
    (typeof CostType)[keyof typeof CostType];

export const PaymentStatus = {
    Unpaid: 'Unpaid',
    Paid: 'Paid',
    // Partial: 'Partial',
} as const;

export type PaymentStatus =
    (typeof PaymentStatus)[keyof typeof PaymentStatus];

export type Court = {
    id: number;
    name: string;
    address?: string;
};

export type SessionMember = {
    id: number;
    memberId: number;
    sessionId: number;

    type: MemberType;
    isAttend: boolean;

    fixedCost?: number;
    extraCost?: number;

    paymentStatus: PaymentStatus;
};

export type Session = {
    id: number;
    date: Date;
    courtId: number;
    paymentType: PaymentType;
};

export type Cost = {
    id: number;
    category: string;
    total: number;
    costType: CostType;
    description?: string;

    sessionId: number;

    payerId: number;
    payer?: Member;
};

// DTO
export type MemberDto =  Member & {
    ///...
};

export type CostDto = Cost & {
    payer?: MemberDto;
};

export type SessionMemberDto = SessionMember & {
    member?: MemberDto;
    memberName?: string;

};

export type SessionDto = Session & {
    court?: Court;
    members: SessionMemberDto[];
    costs: CostDto[];
};

// mock data
export const mockMembers: MemberDto[] = [
    {
        id: 1,
        name: 'Linh',
        username: 'linh',
        password: '123456',
        status: MemberStatus.Ative,
    },
    {
        id: 2,
        name: 'Minh',
        username: 'minh',
        password: '123456',
        status: MemberStatus.Ative,
    },
    {
        id: 3,
        name: 'Huy',
        username: 'huy',
        password: '123456',
        status: MemberStatus.InActive,
    },
];

export const mockCourts: Court[] = [
    {
        id: 1,
        name: 'Sân ABC',
        address: 'Hai Bà Trưng, Hà Nội',
    },
    {
        id: 2,
        name: 'Sân Mỹ Đình',
        address: 'Nam Từ Liêm, Hà Nội',
    },
];

export const mockSessionMembers: SessionMemberDto[] = [
    {
        id: 1,
        memberId: 1,
        member: mockMembers[0],
        sessionId: 1,

        type: MemberType.Fixed,
        isAttend: false,

        fixedCost: 120000,
        extraCost: 20000,

        paymentStatus: PaymentStatus.Paid,
    },
    {
        id: 2,
        memberId: 2,
        member: mockMembers[1],
        sessionId: 1,

        type: MemberType.Fixed,
        isAttend: true,

        fixedCost: 120000,

        paymentStatus: PaymentStatus.Paid,
    },
    {
        id: 3,
        memberId: 3,
        member: mockMembers[2],
        sessionId: 1,

        type: MemberType.Guest,
        isAttend: true,

        extraCost: 150000,

        paymentStatus: PaymentStatus.Unpaid,
    },
];

export const mockCosts: CostDto[] = [
    {
        id: 1,
        total: 300000,
        category: 'Tiền sân',
        costType: CostType.Fixed,
        description: 'Tiền sân',

        sessionId: 1,

        payerId: 1,
        payer: mockMembers[0],
    },
    {
        id: 2,
        total: 120000,
        category: 'Tiền cầu',
        costType: CostType.Extra,
        description: 'Tiền cầu',

        sessionId: 1,

        payerId: 2,
        payer: mockMembers[1],
    },
];

export const mockSessions: SessionDto[] = [
    {
        id: 1,
        date: new Date(),

        courtId: 1,
        court: mockCourts[0],

        paymentType: PaymentType.Monthly,

        members: mockSessionMembers,

        costs: mockCosts,
    },
    {
        id: 2,
        date: new Date(),

        courtId: 2,
        court: mockCourts[1],

        paymentType: PaymentType.Single,

        members: [],

        costs: [],
    },
];