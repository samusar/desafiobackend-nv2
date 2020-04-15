import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions
      .filter(item => item.type === 'income')
      .reduce((acu, cur) => acu + cur.value, 0);

    const outcomeSum = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((acumulator, current) => acumulator + current.value, 0);

    return {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };
  }

  public create({ value, type, title }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      value,
      title,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
