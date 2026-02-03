import userRepository from '../../repositories/UserRepository.js';
import transacRepository from '../../repositories/TransacSumHistoryRepository.js';
import billValidations from '../../validations/bill/index.js';
import Line from '../line/index.js';

const send = async (req, res) => {
  try {
    const { body } = req;

    const validated = billValidations.send(body);
    if (typeof validated === 'object') return res.status(500).json({ message: validated });

    const userExists = await userRepository.userExists(body.userId);

    if (!userExists) {
      return res.status(404).json({ message: 'User is not in the organization' });
    }

    await transacRepository.createBill(body);

    Line.lineNotification(body);

    res.status(200).json({ message: 'Bill is stored' });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default send;
