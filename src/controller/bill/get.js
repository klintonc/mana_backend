import transacRepository from '../../repositories/TransacSumHistoryRepository.js';

const get = async (req, res) => {
  try {
    const { branch } = req.query;

    const bills = branch ? await transacRepository.getBillsByBranch(branch) : await transacRepository.getAllBills();

    if (bills.length === 0) {
      return res.status(200).json({ message: 'No records found' });
    }

    const data = bills.map((bill) => ({
      transacSumId: bill.transacSumId,
      transferSum: bill.transferSum,
      cashSum: bill.cashSum,
      posSum: bill.posSum,
      receiptImg: bill.receiptImg,
      datetime: bill.datetime,
      branch: bill.user?.branch,
      firstName: bill.user?.firstName,
      lastName: bill.user?.lastName,
    }));

    res.status(200).json({ data });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default get;
