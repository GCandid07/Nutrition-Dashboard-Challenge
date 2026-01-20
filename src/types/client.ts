export type ClientStatus = 'ACTIVE' | 'INACTIVE';

export interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  status: ClientStatus;
  createdAt: string;
}
