import { OrderStatus } from './interfaces/order-status';
import { Messaging } from '../services/messaging';
import { Persistence } from '../services/persistence';
import { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistence: Persistence,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio!');
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com o total de R$${this.cart.total()} foi recebido!`,
    );
    this.persistence.saveOrder();
    this.cart.clear();
  }
}
