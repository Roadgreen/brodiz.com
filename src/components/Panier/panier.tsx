import Image from "next/image"
import styles from './panier.module.css'


interface product {
    products: {
        id:string,
      image: string;
      name: string;
      price: number;
category: string;
quantity: number;
color: string;
size: string;
alt:string;
    }[],
quantity: (id: string, quantity: number) => void
  }
 
export default function Cart({products,quantity}:product) {
    const product = products;
  return (
    <div className={styles.Container}>
        <h2>Panier</h2>
        <div>
{product.map((x) =>
    <div key={x.id} className={styles.Articles}><Image alt={x.alt} src={x.image} height={150} width={150}/>
    <div>
        <h4>{x.name}</h4>
        <p>{x.category}</p>
    <p>{x.color}</p>
    <div>
    <label>Quantité:</label>

<select onChange={e => quantity(x.id,Number(e.target.value))} name="quantity" id="quantity">
    <option value={x.quantity}>{x.quantity}</option>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
    <option value={6}>6</option>
</select>
<label>Couleur:</label>

<select name="size" id="size">
<option value={x.size}>{x.size}</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
</select>
    </div>
    </div>
    <div><p>{x.price}€ </p></div>
    </div>
    )}
        </div>
    </div>
  )
}
