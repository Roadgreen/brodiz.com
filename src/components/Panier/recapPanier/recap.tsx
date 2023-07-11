import styles from './recap.module.css'


interface product {
  products: {
    image: string;
    name: string;
    price: number;
category: string;
quantity: number;
color: string;
size: string;
alt:string;
  }[];
}
export default function Recap({products}:product) {
  function calculateTotalPrice(products:any) {
    let totalPrice = 0;
  
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const { quantity, price } = product;
  
      totalPrice += quantity * price;
    }
  
    return totalPrice;
  }
  
 const totalPrice = calculateTotalPrice(products);
 

  return (
    <div className={styles.Container}>
      <h4>Récapitulatif</h4>
      <p>Sous-total:  {totalPrice}</p>
    </div>
  )
}
