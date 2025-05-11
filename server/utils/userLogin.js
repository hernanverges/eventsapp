import User from '../models/User.js';

const loginUser = async (req, res) => {
  const { mail, password } = req.body;  

  try {
    const user = await User.findOne({ mail });

    if (!user || !user.verified) {
      return res.status(400).json({ message: "Usuario no verificado o no encontrado" });
    }

    res.status(200).json({ message: "Usuario encontrado y verificado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export default loginUser;
