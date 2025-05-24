const Users = require('../models/Users');

const resetPassword = async (email, newPassword) => {
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Apenas atualiza a senha, sem hashear (o schema já faz isso)
    user.password = newPassword;

    await user.save();

    return { message: 'Senha alterada com sucesso.' };
  } catch (error) {
    throw error;
  }
};

module.exports = resetPassword;
