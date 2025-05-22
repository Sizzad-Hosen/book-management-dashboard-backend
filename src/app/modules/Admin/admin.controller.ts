import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utilits/catchAsync';
import { AdminService } from './admin.service';

export const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.createAdmin(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllAdmins();
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admins retrieved successfully',
    data: result,
  });
});

export const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getSingleAdmin(req.params.id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  });
});

export const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.updateAdmin(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

export const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.deleteAdmin(req.params.id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});


export const AdminControllers = {
    createAdmin,
    getAllAdmins,
    deleteAdmin,
    getSingleAdmin
}