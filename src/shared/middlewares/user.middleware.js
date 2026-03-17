const UserRepository = require("../../modules/users/user.repository");
// const prisma = require("../../database/prisma");
const AppError = require("../../shared/errors/AppError");

const userRepository = new UserRepository();

async function validarUsuario(req, res, next) {
  try {
    const usuarioId = req.usuarioId;

    if (!usuarioId) {
      throw new AppError("Usuário não autenticado", 401);
    }

    const usuario = await userRepository.findById (usuarioId);

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    next(error);
  }
}

async function verificarEmailConfirmado(reqm, res, next) {
  try {
    if(!req.usuario) {
      throw new AppError("Usuário não autenticado", 401);
    }
    if (!req.usuario.emailVerificado) {
      throw new AppError("Confirme seu email antes de acessar", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
}


module.exports = {
  validarUsuario,
  verificarEmailConfirmado,
};