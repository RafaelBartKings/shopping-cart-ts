import { Messaging } from './services/messaging';
import { Order } from './entities/order';
import { Persistence } from './services/persistence';
import { Product } from './entities/product';
import { ShoppingCart } from './entities/shopping-cart';

const shoppingCart = new ShoppingCart();
const messaging = new Messaging();
const persistence = new Persistence();
const order = new Order(shoppingCart, messaging, persistence);

shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.9));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
order.checkout();
console.log(order.orderStatus);
