const { user, grouplink } = require("../../models");

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
      idUser: req.user.id,
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
