import Image from 'next/image';
import styles from './productcard.module.css';

interface ProductCardProps {
    product: {
        image: string,
name: string,
price: number
    };
  }

function ProductCard({product}:ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.price}>{product.price}€</div>
      <h2 className={styles.productName}>{product.name}</h2>
    </div>
  );
}

export default ProductCard;
