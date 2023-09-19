"use client"
import { useEffect, useState } from 'react';
import styles from './productCardDetails.module.css'
import Image from 'next/image';

interface product{
  Name: string,
  img: Array<string>,
  price:string,
  description: string,
  color: string,
  size:string,

}

export default function ProductCardDetails({product}:{product:product}){
  const [imgSelection,setImgSelection] = useState([0,1,2,3,4,5]);
  useEffect(() => {
    console.log(product);
  }, [product]);
  const colors = product.color? JSON.parse(product.color) : [];
  const size = product.size? JSON.parse(product.size) : [];
  const imgChange = (x:Number) => {
   switch(x){
    case 0: 
    return setImgSelection([0,1,2,3,4,5]);
    case 1: 
    return setImgSelection([1,2,3,4,5,0]);
    case 2: 
    return setImgSelection([2,3,4,5,0,1]);
    case 3: 
    return setImgSelection([3,4,5,0,1,2]);
    case 4: 
    return setImgSelection([4,5,0,1,2,3]);
    case 5:
    return setImgSelection([5,0,1,2,3,4]);
    break;
   }
    }
  
console.log(product,'product');
    return(
        <div className={styles.Container}>
<div className={styles.productContainer}>
  
{product.img && product.img[0] ?    <div className={styles.imgsContainer}>  <div className={styles.photosContainer}>
      <div onClick={()=>imgChange(0)} className={styles.sidePhotosContainer}><Image src={product.img[0][0]} alt={product.img[0][1]} fill /></div>
      <div onClick={()=>imgChange(1)} className={styles.sidePhotosContainer}><Image src={product.img[1][0]} alt={product.img[1][1]} fill /></div>
      <div onClick={()=>imgChange(2)} className={styles.sidePhotosContainer}><Image src={product.img[2][0]} alt={product.img[2][1]} fill /></div>
      <div onClick={()=>imgChange(3)} className={styles.sidePhotosContainer}><Image src={product.img[3][0]} alt={product.img[3][1]} fill /></div>
      <div onClick={()=>imgChange(4)} className={styles.sidePhotosContainer}><Image src={product.img[4][0]} alt={product.img[4][1]} fill /></div>
      </div>   <div className={styles.bigImgContainer}>
        <Image className={styles.bigImg} src={product.img[imgSelection[0]][0]} alt={product.img[imgSelection[0]][1]} fill />
      </div>
    </div>
    : <></>}
    
    <div className={styles.descriptionContainer}>
        <h1>{product.Name}</h1>
        <h3>{product.price}€</h3>
        <p className={styles.description}>{product.description}</p>
        <div>
          <select name="size" id="size">
            {size.map((x:any,i:number) => {
              return(
                <option key={i} value={size[x]}>{size[x]}</option>
              )
            })} //TODO bien vérifier que le mapping de la taille fonctionne. reste la selection. 
          </select>
        </div>
        <div className={styles.colors}>
        {colors.map((x: any, i: number) => {
              return (
                <div
                  className={styles.color}
                  style={{ backgroundColor: x.color }}
                  key={i}
                ></div>
              );
            })}
        </div>
        <button className={styles.buttonBuy}>Acheter</button>
    </div>

</div>
</div>
    )
}