import { Request, Response, NextFunction } from 'express';
import { SalesServices } from './sales.service';
import sendResponse from '../../utilits/sendResponse';
import httpStatus from 'http-status';



export const createSaleHandler = async (req: Request, res: Response, next: NextFunction) => {


    const sale = await SalesServices.createSale(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: sale,
  });



}

export const getSalesHistoryHandler = async (req: Request, res: Response, next: NextFunction) => {

    const period = req.query.period as 'daily' | 'weekly' | 'monthly' | 'yearly';

    if (!period) {
      return res.status(400).json({ success: false, message: 'Period query parameter is required' });
    }

    const sales = await SalesServices.getSalesHistory(period);
 sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: period,
    
  });
};


export const SalesControllers = {
    createSaleHandler,
    getSalesHistoryHandler
}