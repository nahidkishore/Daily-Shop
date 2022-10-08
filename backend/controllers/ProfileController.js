
const UserModel = require('../models/User');

const { JWT_SECRET } = require('../config/envConfig');
/* module.exports.updateName = async (req, res) => {
  const { name, id } = req.body;
  if (name === '') {
    return res.status(400).json({ errors: [{ msg: 'Name is required' }] });
  } else {
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: id },
        { name: name },
        { new: true }
      );
      const token = createToken({id: user._id, name: user.name});
      return res.status(200).json({ token, msg: 'Your name has been updated' });
    } catch (error) {
      return res.status(500).json({ errors });
    }
  }
}; */
module.exports.updateName = async (req, res) => {
	const { name, id } = req.body;
	if (name === '') {
		return res.status(400).json({ errors: [{ msg: 'Name is required' }] });
	} else {
		try {
			const user = await UserModel.findOneAndUpdate(
				{ _id: id },
				{ name: name },
				{ new: true }
			);
			const token = jwt.sign({ user }, JWT_SECRET, {
				expiresIn: '24hr',
			});
			return res.status(200).json({ token, msg: 'Your name has been updated' });
		} catch (error) {
			return res.status(500).json({ error });
			
		}
	}
};