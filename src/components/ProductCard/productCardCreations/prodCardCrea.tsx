import styles from './prodCardCrea.module.css';
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../Function/cartContext';
import { useRouter } from 'next/navigation'
import { ProductContext, useGlobalContext } from '@/app/Context/productStore';
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'

export default function ProdCardCrea({ id }: { id: number }) {
  const router = useRouter();
  const [prodType, setProdType] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // State to track loading state
  const Cart = useContext(CartContext);
 const {productSearch,productArray, setProductArray,setSelectedProduct} = useGlobalContext()

  useEffect(() => {
    if(productArray.length !== 4){
      const fetchProductData = async () => {
        const prod1:Array<Object> = await productSearch({}, 'Hoodies', 'Product');
        const prod2:Array<Object>  = await productSearch({}, 'Baby', 'Product');
        const prod3:Array<Object>  = await productSearch({}, 'Bain', 'Product');
        const prod4:Array<Object>  = await productSearch({}, 'Pull', 'Product');
  
        // Combine all the data into one array and set it to productArray
         // Set loading to false when data is fetched
      setProductArray([prod1,prod2,prod3,prod4])
      setIsLoading(false);
      };
      fetchProductData();
    } else {
      setIsLoading(false);

    }
    
  },[]);
console.log(productArray)
  // If still loading, show loading message or spinner
  if (isLoading) {
    return <div className={styles.loading}>
      <div className={styles.loader}></div>
    </div>;
  }
const handleClick = (id: number, index:number, aed: string) => {
setSelectedProduct(productArray[id][index])
router.push(`/creations/${aed}`)
}
  // Render the content when loading is done
  return (
    <div className={styles.Container}>
      {productArray[id].map((x: any, i: number) => {
        const colors = JSON.parse(x.color)
        return (
          <div className={styles.cardContainer} key={i} onClick={()=>handleClick(id, i, x.id)}>
            <div className={styles.imgContainer}>
          <Image className={styles.img} src={x.img[0][0]} alt={x.img[0][1]} fill/>
            </div>
            <div className={styles.iconContainer}><AiFillHeart/></div>
            <h3>{x.Name}</h3>
            <div>{x.price}€</div>
            <div className={styles.colorContainer}>
              {colors.map((x: any, i: number) => {
                return (
                  <div className={styles.color} style={{ backgroundColor: x.color }} key={i}>
                  </div>
                );
              })}
            </div>

          </div>
        );
      })}
    </div>
  );
}
