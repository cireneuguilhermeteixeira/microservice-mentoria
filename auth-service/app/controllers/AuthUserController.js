const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const handleError = require("../../utils/handler-error");
const handleSuccess = require("../../utils/handler-success");
const authJWT = require("../../secrets/auth.json");

function generateToken(params = {}) {
    return jwt.sign(params, authJWT.secret, {
        expiresIn: 86400,
    });
}

exports.save = async (req, resp) => {
    try {
        const userToSave = req.body;
        const userFounded = await User.find({ email: userToSave.email }).exec();

        if (userFounded.length > 0)
            return handleError(400, resp, {
                message: "já existe um usuário com esse e-mail",
            });

        const hash = await bcrypt.hash(userToSave.password, 10);
        userToSave.password = hash;

        const userSaved = await User.create(userToSave);
        userSaved.password = null;
        return handleSuccess(resp, {
            user: userSaved,
            token: generateToken({ id: userSaved.id }),
        });
    } catch (error) {
        return handleError(500, resp, error);
    }
};

exports.authentication = async (req, resp) => {
    try {
        const { email, password } = req.body;
        const userFounded = await User.findOne()
            .where("email")
            .equals(email)
            .select("-__v")
            .exec();

        if (!userFounded)
            return handleError(404, resp, { message: "Usuário não encontrado" });

        const result = await bcrypt.compare(password, userFounded.password);

        userFounded.password = null;

        if (!result) return handleError(401, resp, { message: "Senha inválida" });

        return handleSuccess(resp, {
            user: userFounded,
            token: generateToken({ id: userFounded.id }),
        });
    } catch (error) {
        return handleError(500, resp, error);
    }
};


exports.checkAuth = async (req, resp,) => {
    try {

    const authHeader = req.headers.authorization;
    console.log('authHeader',authHeader)
    if (!authHeader)
        return resp.status(401).send({ error: "No token provided" });

    const parts = authHeader.split(" ");
    if (!parts.length === 2)
        return resp.status(401).send({ error: "Token error" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return resp.status(401).send({ error: "Token malformatted" });

    jwt.verify(token, authJWT.secret, (err, decoded) => {
        if (err) return resp.status(401).send({ error: "Token invalid" });
        req.userId = decoded.id;
        // return next();
        return handleSuccess(resp, {
            userId: req.userId
        });
    });
    
    } catch (error) {
        console.log(error);
        return handleError(500, resp, error);
    }

}