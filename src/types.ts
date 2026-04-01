// types.ts
export interface Member {
    id: number;
    name: string;
    status: 'active' | 'inactive';
  }
  
  export interface Session {
    id: number;
    date: string; // YYYY-MM-DD
    type: 'fixed' | 'ad-hoc';
    cost: number;
  }
  
  export interface Attendance {
    sessionId: number;
    memberId: number;
    isAttend: boolean;
  }
  
  export interface Payment {
    memberId: number;
    month: string; // YYYY-MM
    amount: number;
    isPaid: boolean;
  }