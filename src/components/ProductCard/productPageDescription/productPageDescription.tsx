import { useScroll } from '@/components/Function/useScroll';
import styles from './productPageDescription.module.css'
import { useState } from 'react';
import parse from 'html-react-parser';

interface ColorObject {
    color: string;
    name: string;
  }
  interface product {
    id: string,
    name: string,
    img: Array<[string,string]>,
    price:number,
    notes:number,
    price_ID: string,
    description: {
        short:string,
        long:string
    },
    color: Array<ColorObject>,
    size:Array<string>,
    category: Array<string>,
    tag: Array<string>,
    quantity:number,
    custom:{
      custom:Boolean,
      customName: string,
      customSelect: Array<string>,
      customType:string,
      customInputPattern:string,
      customResult:string
  
    }
  }
export default function ProductDesc({ product }: { product: product }){
    const [clic,setClic] = useState(false);
    const [cssAction,setCssAction]  = useState(false);

    const handleClick = () =>{
        if(clic === false){
            setClic(true);
            setCssAction(true)
        } else {
            setClic(false);
            setCssAction(false)
        }
    }
    return (
        <div className={clic ? styles.ContainerClicked : styles.Container} onClick={handleClick}>
            <div className={styles.button}>
            <h3>Description</h3>
            <h3  className={cssAction ? styles.plus : ''} style={{fontSize:'2em'}}>+</h3>
            </div>
           
            {
                clic ? (<div className={styles.ContainerDesc} dangerouslySetInnerHTML={{ __html: product.description.long }} />) : ''
            }
        </div>
    )
}