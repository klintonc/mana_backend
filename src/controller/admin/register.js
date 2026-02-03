import userRepository from '../../repositories/UserRepository.js';
import adminValidation from '../../validations/admin/index.js';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
  try {
    const { body } = req;

    const validated = adminValidation.register(body);
    if (typeof validated === 'object') return res.status(500).json({ message: validated });

    const existingUser = await userRepository.findByUserId(body.username);

    if (existingUser) {
      return res.status(404).json({ message: 'This admin already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    await userRepository.createAdmin(body, hashedPassword);

    res.status(200).json({ message: 'Admin successfully registered.' });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default register;
