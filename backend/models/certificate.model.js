const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  ownerAddress: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  studentId: { type: String },
  issueBy: { type: String },
  issueDate: { type: String },
  certificateName: { type: String },
  account: { type: String },
  imgHash: { type: String },
});

module.exports = mongoose.model("Certificate", CertificateSchema);
