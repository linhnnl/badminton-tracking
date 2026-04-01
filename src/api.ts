// api.ts
import axios from 'axios';
import { Member, Session, Attendance, Payment } from './types';

const BASE_URL = 'https://script.google.com/u/0/home/projects/1r70u6WNDTnCjPu6jfXTTaqNStmvKbL9QmLbk3vHnuDG2VrWdlQgVrJD4/edit';

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