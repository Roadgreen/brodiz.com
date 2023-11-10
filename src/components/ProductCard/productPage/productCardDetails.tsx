"use client";
import { useEffect, useState } from "react";
import styles from "./productCardDetails.module.css";
import Image from "next/image";
import { useGlobalContextCart } from "@/app/Context/cartContext";
interface product {
  id: string;
  name: string;
  img: Array<string>;
  price: string;
  price_ID: string;
  description: string;
  color:  Array<object>;
  size: Array<string>;
  category: Array<string>;
  tag: string;
  quantity: number;
}

export default function ProductCardDetails({ product }: { product: product }) {
  const { addToCart,addedToCart,setAddedToCart,cartItem } = useGlobalContextCart();
  const [imgSelection, setImgSelection] = useState([0, 1, 2, 3, 4, 5]);
  const [alertSelection, setAlertSelection] = useState<boolean>(false);
  const [sizeSelection, setSizeSelection] = useState<string>();
  const [sizeChangeCss, setSizeChangeCss] = useState<string[]>([]);
  const [colorChangeCss, setColorChangeCss] = useState<string[]>([]);
  const [colorSelection, setColorSelection] = useState<Object[]>();
  
  useEffect(() => {
    console.log(cartItem)
    // Initialize sizeChangeCss and colorChangeCss arrays with default classes
    if(product.color && product.size){
      const defaultSizeChangeCss = product.size.map(() => styles.sizeOption);
      const defaultColorChangeCss = product.color.map(() => styles.color);
      setSizeChangeCss(defaultSizeChangeCss);
      setColorChangeCss(defaultColorChangeCss);
    }
    
  }, [cartItem,product.color,product.size]);
  const imgChange = (x: any) => {
    setImgSelection((prevSelection) => {
      const newIndex = (prevSelection[0] + x) % 6;
      return [
        newIndex,
        (newIndex + 1) % 6,
        (newIndex + 2) % 6,
        (newIndex + 3) % 6,
        (newIndex + 4) % 6,
        (newIndex + 5) % 6,
      ];
    });
  };
  const handleClick = (info: string) => {
    if (info.length > 2) {
      setColorSelection([{"name":info}]);
      // Update the colorChangeCss array to add the "selected" class for the clicked color and remove it from others
      const newColorChangeCss = product.color.map((x: any, i: number) =>
        x.name === info ? styles.colorOptionSelected : styles.color
      );
      setColorChangeCss(newColorChangeCss);
    } else {
      setSizeSelection(info);
      // Update the sizeChangeCss array to add the "selected" class for the clicked size and remove it from others
      const newSizeChangeCss = product.size.map((x: any) =>
        x === info ? styles.sizeOptionSelected : styles.sizeOption
      );
      setSizeChangeCss(newSizeChangeCss);
    }
  };
  const handleClickAddToCart = () => {
    console.log(cartItem);
    // Vérifie que colorSelection et sizeSelection ne sont pas undefined
    if (colorSelection && sizeSelection) {
      // Copie le produit actuel
      const updatedProduct = { ...product };
      // Met à jour les sélections de couleur et de taille dans le produit
      updatedProduct.color = colorSelection;
      updatedProduct.size = [sizeSelection];
      updatedProduct.quantity = 1;
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
              <div
                onClick={() => imgChange(0)}
                className={styles.sidePhotosContainer}
              >
                <Image src={product.img[0][0]} alt={product.img[0][1]} fill />
              </div>
              <div
                onClick={() => imgChange(1)}
                className={styles.sidePhotosContainer}
              >
                <Image src={product.img[1][0]} alt={product.img[1][1]} fill />
              </div>
              <div
                onClick={() => imgChange(2)}
                className={styles.sidePhotosContainer}
              >
                <Image src={product.img[2][0]} alt={product.img[2][1]} fill />
              </div>
              <div
                onClick={() => imgChange(3)}
                className={styles.sidePhotosContainer}
              >
                <Image src={product.img[3][0]} alt={product.img[3][1]} fill />
              </div>
              <div
                onClick={() => imgChange(4)}
                className={styles.sidePhotosContainer}
              >
                <Image src={product.img[4][0]} alt={product.img[4][1]} fill />
              </div>
            </div>{" "}
            <div className={styles.bigImgContainer}>
              <Image
                className={styles.bigImg}
                src={product.img[imgSelection[0]][0]}
                alt={product.img[imgSelection[0]][1]}
                fill
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.descriptionContainer}>
          <h1>{product.name}</h1>
          <h3>{product.price}€</h3>
          <p className={styles.description}>{product.description}</p>
          <h3>Taille:</h3>
          <div className={styles.sizeContainer}>
            <div className={styles.sizeDiv}>
              {product.size.map((x: any, i: number) => {
                return (
                  <div
                    className={sizeChangeCss[i]}
                    onClick={() => handleClick(x)}
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
                  onClick={() => handleClick(x.name)}
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
