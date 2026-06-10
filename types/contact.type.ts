export interface IContact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  visa_type: string;
  message: string;
  isRead?: boolean;
  createdAt: string;
  updatedAt: string;
}
