export interface IUpcomingPayments {
  _id: String;
  user_id: String;
  shipment_id: String;
  net_payable: Number;
  numberOfInstallments: Number;
  payments: {
    payable: Number;
    paid: Boolean;
    paymentDeadline: string;
    paymentDate: String;
    defaults: Number;
    _id: String;
  };
  active: Boolean;
  __v: 0;
}

export interface ICreditScore {
  _id: String;
  user_id: String;
  score: Number;
  total_payments: Number;
  default_payments: Number;
  total_due: Number;
  allowed_balance: Number;
  used_balance: Number;
  total_full_loan_repayments: Number;
}
