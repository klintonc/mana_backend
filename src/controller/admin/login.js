import bcrypt from 'bcrypt';
import generateToken from '../../utils/helper/generateToken.js';
import userRepository from '../../repositories/UserRepository.js';
import adminValidation from '../../validations/admin/index.js';

const login = async (req, res) => {
  try {
    const { body } = req;

    const validated = adminValidation.login(body);
    if (typeof validated === 'object') return res.status(500).json({ message: validated });

    const user = await userRepository.findByUserId(body.username);

    if (!user) {
      return res.status(404).json({ message: 'The admin does not exists.' });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: 'The password is not correct' });
    }

    const token = generateToken({ username: body.username });
    res.status(200).json({ token: token });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default login;
