"use client";
import { useEffect, useState } from "react";
import styles from "./customProduct.module.css";
import Image from "next/image";
import { useGlobalContextCart } from "@/app/Context/cartContext";
import { useGlobalContextAnalytics } from "@/app/Context/analyticsContext";
import handleUploadImage from "@/app/api/upload/uploadcustomserver";
import {
  indie_flower,
  pacifico,
  vt323,
  orbitron,
  anton,
  comic_neue,
  lobster,
  press_start_2p,
  architects_daughter,
  baloo_tammudu_2,
  chewy,
  kalam,
  luckiest_guy,
  permanent_marker,
  rock_salt,
  satisfy,
  shadows_into_light,
  sigmar_one,
  domine,
  manrope,
  catamaran,
  patua_one,
  arvo,
  raleway,
  oswald,
  montserrat,
  lato,
  open_sans,
  nunito_sans,
  playfair_display,
  merriweather,
  roboto,
  poppins,
  work_sans,
  noto_sans,
} from '@/app/Context/fontContext';
import { fontOptions,fontNames } from "@/app/Context/fontContext";

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
  price_cost: number,
    price_revenue:number,
  price_ID: string,
  description: {short:string,long:string},
  color: Array<ColorObject>,
  size:Array<string>,
  category: Array<string>,
  tag: Array<string>,
  quantity:number,
  custom:Object
}
export default function CustomProduct({ product }: { product: product }) {
  const { addToCart,addedToCart,setAddedToCart,cartItem } = useGlobalContextCart();
  const {sendPageview,sendEvent} = useGlobalContextAnalytics();
  const [imgSelection, setImgSelection] = useState(0);
  const [alertSelection, setAlertSelection] = useState<boolean>(false);
  const [sizeSelection, setSizeSelection] = useState<string>();
  const [sizeChangeCss, setSizeChangeCss] = useState<string[]>([]);
  const [colorChangeCss, setColorChangeCss] = useState<string[]>([]);
  const [colorSelection, setColorSelection] = useState<ColorObject[]>();
  const [custoParcours,setCustoParcours] = useState<number>(1);
  const [textArea,setTextArea] = useState<string>('');
  //Pour l'upload d'image
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState('');
  const [fonts, setFonts] = useState([]);
  
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    sendEvent({ url: '',
    eventName: 'click',
    sessionId:'',
    data:{clickName : 'Upload_img',clickCategorie: 'custom_product'}})
    if (e.target.files) {
      const img = e.target.files
      const uploadResult = await handleUploadImage(img[0]);

      if ('error' in uploadResult) {
        setError(uploadResult.error);
      } else {
        setUploadedImagePath(uploadResult.imagePath);
        console.log(uploadResult.imagePath)
        setError(null);
      }
    } else {
      setError('Veuillez sélectionner une image.');
    }
  };
  
  const handleFontChange = (e:any) => {
    sendEvent({ url: '',
    eventName: 'click',
    sessionId:'',
    data:{clickName : 'Font_changed',clickCategorie: 'custom_product'}})
    setSelectedFont(e.target.value);
  };

 
 
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
      
      updatedProduct.custom =  {
          selectedFont,
          uploadedImagePath,
          textArea
      }
      console.log(updatedProduct);
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
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.descriptionContainer}>
          <h1>{product.name}</h1>
          <h3 className={styles.price}>{product.price}€</h3>
          <p className={styles.description}>{product.description.short}</p>
          <h3>Customisation:</h3>

      {/*Début du parcours de personnalisation*/}

          {custoParcours === 1 ? (
   <div className={styles.customisation}>
   <div>
   <h4>Votre Logo:</h4>
   <p>Lorsque votre logo s&apos;affiche, ou si vous ne voulez pas de logo cliquez sur suivant</p>
 {uploadedImagePath !== null ? (<Image src={`https://server.brodiz.com/uploadImg/getImage/${uploadedImagePath}`} alt="Image de logo" width={50} height={50} />) : ''}
 {error !== null ? <p>{error}</p> : ''}
 <input id="file" className={styles.Input} type="file" onChange={handleUpload} />
 <label htmlFor="file" className={styles.labelInputImg}>
   Choisissez une image
 </label>
   </div>
   <div className={styles.Suivant} onClick={()=>setCustoParcours(2)}>Suivant</div>
   </div>
          ): ''}
  {custoParcours === 2 ? (
   <div className={styles.customisation}>
   <div>
         <h4>Choisissez une police :</h4>
      <select id="fontSelector" className={styles.selectFont} value={selectedFont} onChange={handleFontChange}>
      {fontOptions.map((font,i) => (
          <option key={i} style={{fontSize:30}} className={font.className} value={fontNames[i]}>
            {`${fontNames[i]}`}
          </option>
        ))}
        {/* Ajoutez d'autres options selon les polices disponibles */}
      </select>
         </div>
         <div className={styles.Suivant} onClick={()=>setCustoParcours(3)}>Suivant</div>
   </div>
          ): ''}

{custoParcours === 3 ? (
   <div className={styles.customisation}>
    <div>
    <h4>Décrivez nous votre envie: </h4>
      <textarea onChange={(e)=>{setTextArea(e.target.value)}} className={styles.textArea}></textarea>
    </div>
         <div className={styles.Suivant} onClick={()=>setCustoParcours(4)}>Suivant</div>
   </div>
          ): ''}

{custoParcours === 4 ? (
   <div className={styles.customisation}>
<h4>Votre commande est prête à être ajouté au panier!</h4>    
   </div>
          ): ''}



      {/*Fin du parcours de personnalisation*/}

      <div className={styles.tailleColor} >
        <div>
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
        </div>
      <div>
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
      </div>
        
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
