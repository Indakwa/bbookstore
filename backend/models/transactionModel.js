
const transactionSchema = {
  TransactionID: Number,
  UserID: Number,
  TransactionDate: Date,
  PaymentMethod: String,
  TotalAmount: Number,
  TransactionStatus: String
};


module.exports = { transactionSchema };
