export interface Transactions {
    timestamp: String|Number;
    transaction_type:  String;
    token: String;
    amount: String|Number;
}

export interface TotalTransactionsRespons {
    token: String;
    amount: String|Number;
    value: Number;
}

