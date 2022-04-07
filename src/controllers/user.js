const { user } = require("../../models");

exports.addUser = async (req, res) => {
  // code here
  try {
    const data = req.body;
    const createdData = await user.create({
      ...data,
    });

    console.log(data);

    res.send({
      status: "success",
      data: {
        user: createdData.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    const data = users;
    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server error",
    });
  }
};
