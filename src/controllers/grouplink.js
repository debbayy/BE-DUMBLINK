const { user, links, grouplink } = require("../../models");

exports.addGrouplink = async (req, res) => {
  // code here

  /* const GrouplinkExise = await grouplink.findOne({
    where: {
      idUser: req.user.id,
    },
  });
  console.log(req.user.id);
  if (GrouplinkExise) {
    return res.status(201).send({
      status: "Failed",
      message: "transaksi sudah ada",
    });
  } */

  try {
    const data = req.body;
    const creategrouplink = await grouplink.create({
      ...data,

      /*  id: req.user.id, */
    });

    //console.log(createTrans);

    //    const transaction = JSON.parse(JSON.stringify(createTrans));
    const grouplinks = JSON.parse(JSON.stringify(creategrouplink));
    console.log(grouplinks);

    //console.log(data);

    res.send({
      status: "Success",
      ...grouplinks,
      /*  transferProof:
        "http://localhost:5000/uploads/transaksi/" + transaction.transferProof, */
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server error",
    });
  }
};

exports.getGrouplinks = async (req, res) => {
  try {
    // const transaction = await trans.findAll({
    const links = await grouplink.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        links,
        /*  links: req.data.links, */
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

exports.getGrouplink = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await grouplink.findOne({
      where: {
        id,
      },

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    console.log(data);
    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      //image: process.env.FILE_PATH + data.image,
    };

    //responx
    res.send({
      status: "success",
      data: data,
    });

    //tangkap errorny
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateGrouplink = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    await grouplink.update(data, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update grouplink id: ${id} finished`,
      data: req.body,
    });
  } catch (err) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteGrouplink = async (req, res) => {
  try {
    const { id } = req.params;

    await grouplink.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete grouplink id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
