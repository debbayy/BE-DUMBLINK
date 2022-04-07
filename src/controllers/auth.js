const { user } = require("../../models");

const Joi = require("joi");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const data = req.body;

    const schema = Joi.object({
      fullname: Joi.string().min(5).max(25).required(),
      email: Joi.string().email().min(6).max(25).required(),
      password: Joi.string().min(6).required().messages({
        "string.empty": `password gak boleh kosong`,
      }),
    });

    const { error } = schema.validate(data);

    if (error) {
      console.log(error);
      return res.status(400).send({
        status: "Bad request",
        message: error.details[0].message,
      });
    }

    const emailCheck = await user.findOne({
      where: { email: data.email },
    });

    if (emailCheck) {
      return res.status(400).send({
        message: "email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    console.log(hashPassword);

    const newData = await user.create({
      fullname: data.fullname,
      email: data.email,
      password: hashPassword,
    });

    const dataToken = {
      id: newData.id,
    };

    const SECRRET_KEY = process.env.TOKEN_KEY;
    const token = jwt.sign(dataToken, SECRRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        fullname: newData.fullname,
        email: newData.email,
      },
    });

    //tangkap errror
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "BAD REQUEST",
      message: "SERVER ERROR",
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  //tangkap error

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createAt", "updateAt"],
      },
    });

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "email or password can't finded",
      });
    }

    const dataToken = {
      id: userExist.id,
    };

    const SECRRET_KEY = process.env.TOKEN_KEY;
    const token = jwt.sign(dataToken, SECRRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        id: userExist.id,
        fullname: userExist.fullname,
        email: userExist.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "BAD REQUEST",
      message: "SERVER ERROR",
    });
  }
};
