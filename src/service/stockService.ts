// ถ้าใช้ TypeScript:
export interface Stock {
  id: number;
  name: string;
  price: number;
}

export class StockService {
  private stocks: Stock[] = [
    { id: 1, name: 'Apple', price: 150 },
    { id: 2, name: 'Google', price: 2800 },
    { id: 3, name: 'Amazon', price: 3400 },
  ];

  getAll(): Stock[] {
    return this.stocks;
  }

  add(stock: Omit<Stock, 'id'>): Stock {
    const newStock = {
      ...stock,
      id: this.stocks.length ? this.stocks[this.stocks.length - 1].id + 1 : 1,
    };
    this.stocks.push(newStock);
    return newStock;
  }

  update(updated: Stock): Stock {
    this.stocks = this.stocks.map(stock =>
      stock.id === updated.id ? { ...stock, ...updated } : stock
    );
    return updated;
  }

  delete(id: number): void {
    this.stocks = this.stocks.filter(stock => stock.id !== id);
  }
}
