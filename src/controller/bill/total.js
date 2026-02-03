import transacRepository from '../../repositories/TransacSumHistoryRepository.js';

const getTotalDiff = async (_req, res) => {
  try {
    const data = await transacRepository.getTotalDiff();

    if (data.length === 0) {
      return res.status(200).json({ message: 'No records found' });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default getTotalDiff;
