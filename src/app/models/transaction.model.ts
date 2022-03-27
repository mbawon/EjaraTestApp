export class Transaction {
    date_creation!: number;
    transaction_type!: string;
    transaction_status!: string;
    emitter!: string;
    receiver!: string;
    amount_raw!: number;
    amount_net!: number;
    fiat_currency!: string;
    crypto_currency!: string;
    crypto_amount!: number;
}
