// const jwt = require("jsonwebtoken");
// const { jwtSecret } = require("../../config/env");

// function rotaProtegida(req, res, next) {
//     let token = req.headers.authorization;
//     // if (!token) {
//     //     return res.status(401).send({
//     //         mensagem: "Token é obrigatório"
//     //     });
//     //     // return;
//     // } else {
//     //     token = token.split(" ")[1];
//     //     // token = jwt.sign({ foo: 'bar' }, process.env.SEGREDO);
//     //     // console.log(token);
        
//     //     jwt.verify(token, jwtSecret, function (err, decoded) {
//     //         if (err) {
//     //             res.status(401).send({
//     //                 mensagem: "Token inválido"
//     //             });
//     //             return;
                
//     //         }
//     //         next();
//     //     });
//     // }
//         if (!token) {
//         return res.status(401).json({ mensagem: "Token é obrigatório" });
//     }
    
//     token = token.split(" ")[1];
    
//     jwt.verify(token, jwtSecret, function (err, decoded) {
//         if (err) {
//             return res.status(401).json({ mensagem: "Token inválido" });
//         }
        
//         req.usuarioId = decoded.id;
//         req.usuario = decoded;
        
//         next();
//     });

// }

// module.exports = { rotaProtegida };


const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/env");
const AppError = require("../errors/AppError");

function rotaProtegida(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return next(new AppError("Token é obrigatório", 401));
    }
    token = token.split(" ")[1];
    if (!token) {
      return next(new AppError("Token é obrigatório", 401));
    }

    const decoded = jwt.verify(token, jwtSecret);
    
    req.usuarioId = decoded.id;
    req.usuarioToken = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError("Token expirado", 401));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError("Token inválido", 401));
    }
    next(error);
  }
}

module.exports = { rotaProtegida };