import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwwt = process.env.JWT_Secret;
function verifyAdmin (req,res,next){
    // entête Authorization
const authorization = req.headers.authorization;
if(!authorization){
    return res.status(401).json({message: "authorization header manquant"});
}
const token = authorization.split(' ')[1];
if(!token){
    return res.status(401).json({message: "token manquant"});
}
try{
    const decode = jwt.verify(token,jwwt) // Vérification du token
    req.admin = decode; // Ajout des informations  de decode a la req comme  id de admin
    next();
}
catch(error){
    return res.status(403).json({message: "token invalide ou expiré"});
}
}
export default verifyAdmin;