import styles from './productCardDetails.module.css'

type product = {
Name:string
}

export default function ProductCardDetails({product}:{product:product}){
console.log(product);
    return(
        <div className={styles.Container}>
<div className={styles.productContainer}>
    <div className={styles.imgsContainer}>
      <div className={styles.photosContainer}>
      <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.bigImgContainer}></div>
    </div>
    <div className={styles.descriptionContainer}>
        <h1>{product.Name}</h1>
        <p></p>
        <div className={styles.colors}>

        </div>
        <button className={styles.buttonBuy}>Acheter</button>
    </div>

</div>
</div>
    )
}