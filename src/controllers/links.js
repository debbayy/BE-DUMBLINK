const { user, links } = require("../../models");

exports.addlinks = async (req, res) => {
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
