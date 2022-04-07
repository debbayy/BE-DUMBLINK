const { user, links, grouplink } = require("../../models");

exports.addlinks = async (req, res) => {
  try {
    const data = req.body;
    const createlink = await links.create({
      ...data,
    });

    //console.log(createTrans);

    //    const transaction = JSON.parse(JSON.stringify(createTrans));
    const link = JSON.parse(JSON.stringify(createlink));
    console.log(link);

    //console.log(data);

    res.send({
      status: "Success",
      ...link,
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

exports.getLinks = async (req, res) => {
  try {
    // const transaction = await trans.findAll({
    const link = await links.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        link,
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
