import { Admin } from './admin.model';
import { TAdmin } from './admin.interface';

const createAdmin = async (payload: TAdmin): Promise<TAdmin> => {
  const result = await Admin.create(payload);
  return result;
};

const getAllAdmins = async (): Promise<TAdmin[]> => {
  return Admin.find();
};

const getSingleAdmin = async (id: string): Promise<TAdmin | null> => {
  return Admin.findById(id);
};

const updateAdmin = async (id: string, payload: Partial<TAdmin>): Promise<TAdmin | null> => {
  return Admin.findByIdAndUpdate(id, payload, { new: true });
};

const deleteAdmin = async (id: string): Promise<TAdmin | null> => {
  return Admin.findByIdAndDelete(id);
};

export const AdminService = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
