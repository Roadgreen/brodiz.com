"use client";
import { useEffect, useState } from "react";
import styles from "./productCardDetails.module.css";
import Image from "next/image";
import { useGlobalContextCart } from "@/app/Context/cartContext";
import { useGlobalContextAnalytics } from "@/app/Context/analyticsContext";

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
export default function ProductCardDetails({ product }: { product: product }) {
  const { addToCart,addedToCart,setAddedToCart,cartItem } = useGlobalContextCart();
  const {sendPageview,sendEvent} = useGlobalContextAnalytics();
  const [imgSelection, setImgSelection] = useState(0);
  const [alertSelection, setAlertSelection] = useState<boolean>(false);
  const [sizeSelection, setSizeSelection] = useState<string>();
  const [sizeChangeCss, setSizeChangeCss] = useState<string[]>([]);
  const [colorChangeCss, setColorChangeCss] = useState<string[]>([]);
  const [colorSelection, setColorSelection] = useState<ColorObject[]>();
  const [custo,setCusto] = useState<string>(product.custom.customType === 'select' ? product.custom.customSelect[0] : '' );
  
  useEffect(() => {
    console.log(cartItem)
    // Initialize sizeChangeCss and colorChangeCss arrays with default classes
    if(product.color && product.size){
      const defaultSizeChangeCss = product.size.map(() => styles.sizeOption);
      const defaultColorChangeCss = product.color.map(() => styles.color);
      setSizeChangeCss(defaultSizeChangeCss);
      setColorChangeCss(defaultColorChangeCss);
    }
    sendPageview( {url: '',
    referrer: '',
    userAgent: '',
    visitorId: '',
    userId: '',
    sessionId: '',
    timeOnPage: new Date,
    screenResolution: '',
    product: {id:product.id},
    pageCategory: 'Product',
    data: {
    }});
   
  }, [cartItem,product,sendPageview]);

  
  
  const imgChange = (x: any) => {
    sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : `Selection_image_${x}`,clickCategorie: 'Product',product:product.id}})
    setImgSelection(x);
  };
  const handleClick = (info:{ name: string; color: string },size:{size:string}) => {

    if (info.name.length > 2) {
      sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : 'Changement_couleur',clickCategorie: 'Product',product:product.id,product_color:info.name}})
      setColorSelection([{name:info.name,color:info.color}]);
      // Update the colorChangeCss array to add the "selected" class for the clicked color and remove it from others
      const newColorChangeCss = product.color.map((x: any, i: number) =>
        x.name === info.name ? styles.colorOptionSelected : styles.color
      );
      setColorChangeCss(newColorChangeCss);
    } else {
      sendEvent({ url: '',
      eventName: 'click',
      sessionId:'',
      data:{clickName : 'Changement_taille',clickCategorie: 'Product',product:product.id,product_size:size.size}})
      setSizeSelection(size.size);
      // Update the sizeChangeCss array to add the "selected" class for the clicked size and remove it from others
      const newSizeChangeCss = product.size.map((x: any) =>
        x === size.size ? styles.sizeOptionSelected : styles.sizeOption
      );
      setSizeChangeCss(newSizeChangeCss);
    }
  };
  const handleClickAddToCart = () => {
    
    console.log(cartItem);
    // Vérifie que colorSelection et sizeSelection ne sont pas undefined
    if (colorSelection && sizeSelection) {
      sendEvent({ url: '',
    eventName: 'click',
    sessionId:'',
    data:{clickName : 'Add_to_cart',clickCategorie: 'Product',product:product.id,product_size: sizeSelection,product_color: colorSelection[0].name}})
      // Copie le produit actuel
      const updatedProduct = { ...product };
      // Met à jour les sélections de couleur et de taille dans le produit
      updatedProduct.color = colorSelection;
      updatedProduct.size = [sizeSelection];
      updatedProduct.quantity = 1;
      {product.custom.custom ?  updatedProduct.custom = {custom:true,customResult: custo,customInputPattern:'',customName:product.custom.customName,customSelect:product.custom.customSelect,customType:product.custom.customType} : ''}
     
      // Appelle addToCart du contexte global avec le produit mis à jour
      addToCart(updatedProduct);
      setAlertSelection(false);
      setAddedToCart(true);
    } else {
      // Affiche un message d'erreur ou effectue une action en cas d'erreur
      setAlertSelection(true);
      console.error("Veuillez sélectionner une couleur et une taille.");
    }
  };
  const handleMouseEnter = () => {
    // Ajoute la classe "zoomed" lorsque la souris est sur l'image
    const imgElement = document.querySelector(`.${styles.bigImg}`);
    if (imgElement) {
      imgElement.classList.add(styles.zoomed);
    }
  };

  const handleMouseLeave = () => {
    // Retire la classe "zoomed" lorsque la souris quitte l'image
    const imgElement = document.querySelector(`.${styles.bigImg}`);
    if (imgElement) {
      imgElement.classList.remove(styles.zoomed);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.productContainer}>
        {product.img && product.img[0] ? (
          <div className={styles.imgsContainer}>
            {" "}
            <div className={styles.photosContainer}>
              {product.img.map((item:any,index:number)=>(
                <div
                key={index}
                onClick={() => imgChange(index)}
                className={styles.sidePhotosContainer}
              >
                <Image src={product.img[index][0]} alt={product.img[index][1]} fill />
              </div>
              ))}
             
            </div>{" "}
            <div className={styles.bigImgContainer}>
              <Image
                className={styles.bigImg}
                src={product.img[imgSelection][0]}
                alt={product.img[imgSelection][1]}
                fill
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.descriptionContainer}>
          <h1>{product.name}</h1>
          <h3>{product.price}€</h3>
          <p className={styles.description}>{product.description.short}</p>
          {product.custom.custom === true && product.custom.customType === "select" ? (<div className={styles.SelectDiv}><h3>{product.custom.customName}</h3><select onChange={(e)=>{setCusto(e.target.value)}} className={styles.Select}>{product.custom.customSelect.map((item,i)=>(
            <option key={i} value={item}>{item}</option>
          ))}</select></div>) : ''}
           {product.custom.custom === true && product.custom.customType === "input" ? (<div className={styles.SelectDiv}><h3>{product.custom.customName}</h3><input type="text" onChange={(e)=>{setCusto(e.target.value)}}></input></div>) : ''}
          <h3>Taille:</h3>
          <div className={styles.sizeContainer}>
            <div className={styles.sizeDiv}>
              {product.size.map((x: any, i: number) => {
                return (
                  <div
                    className={sizeChangeCss[i]}
                    onClick={() => handleClick({name: '',color:''},{size:x})}
                    key={i}
                  >
                    {x}
                  </div>
                );
              })}
            </div>
          </div>
          <h3>Couleur:</h3>
          <div className={styles.colors}>
            {product.color.map((x: any, i: number) => {
              return (
                <div
                  className={colorChangeCss[i]}
                  style={{ backgroundColor: x.color }}
                  key={i}
                  onClick={() => handleClick({name: x.name,color: x.color},{size:''})}
                ></div>
              );
            })}
          </div>
          {alertSelection ? (
            <div className="">
              <p>Veuillez sélectionner une taille et une couleur</p>
            </div>
          ) : (
            ""
          )}

          <button
            className={styles.buttonBuy}
            onClick={() => {
              handleClickAddToCart();
            }}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
