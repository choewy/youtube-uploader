import { Schema, model } from 'mongoose';

const CartSchema = new Schema({
  userId: String,
  goodsId: String,
  quantity: Number,
});

const Cart = model('Cart', CartSchema);

export default Cart;
