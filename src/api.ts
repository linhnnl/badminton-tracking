// api.ts
import axios from 'axios';
import type { Member, Session, Attendance, Payment } from './types';

const BASE_URL = 'https://script.google.com/macros/s/AKfycbxTnTX3QXNpkBGvdkf-abu2yx_0Yjo1z5jYjcfWDQGbsjHa46iJUsNr_DshbByEei_4dg/exec';

export const fetchMembers = async (): Promise<Member[]> => {
  const { data } = await axios.get(`${BASE_URL}?type=members`);
  return data;
};

export const fetchSessions = async (): Promise<Session[]> => {
  const { data } = await axios.get(`${BASE_URL}?type=sessions`);
  return data;
};

export const fetchAttendances = async (): Promise<Attendance[]> => {
  const { data } = await axios.get(`${BASE_URL}?type=attendances`);
  return data;
};

export const fetchPayments = async (): Promise<Payment[]> => {
  const { data } = await axios.get(`${BASE_URL}?type=payments`);
  return data;
};