"use client";
import { useEffect, useState } from "react";
import styles from "./productCardDetails.module.css";
import Image from "next/image";
import { useGlobalContext } from "@/app/Context/cartContext";
interface product {
  id: string;
  name: string;
  img: Array<string>;
  price: string;
  description: string;
  color: string;
  size: string;
  category: string;
  tag: string;
  quantity: number;
}

export default function ProductCardDetails({ product }: { product: product }) {
  const { addToCart } = useGlobalContext();
  const [imgSelection, setImgSelection] = useState([0, 1, 2, 3, 4, 5]);
  const [alertSelection, setAlertSelection] = useState<boolean>(false);
  const [sizeSelection, setSizeSelection] = useState<string>();
  const [sizeChangeCss, setSizeChangeCss] = useState<string[]>([]);
  const [colorChangeCss, setColorChangeCss] = useState<string[]>([]);
  const [colorSelection, setColorSelection] = useState<string>();
  const colors = product.color ? JSON.parse(product.color) : [];
  const size = product.size ? JSON.parse(product.size) : [];
  useEffect(() => {
    // Initialize sizeChangeCss and colorChangeCss arrays with default classes
    const defaultSizeChangeCss = size.map(() => styles.sizeOption);
    const defaultColorChangeCss = colors.map(() => styles.color);
    setSizeChangeCss(defaultSizeChangeCss);
    setColorChangeCss(defaultColorChangeCss);
  }, []);
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
      setColorSelection(info);
      // Update the colorChangeCss array to add the "selected" class for the clicked color and remove it from others
      const newColorChangeCss = colors.map((x: any, i: number) =>
        x.name === info ? styles.colorOptionSelected : styles.color
      );
      setColorChangeCss(newColorChangeCss);
    } else {
      setSizeSelection(info);
      // Update the sizeChangeCss array to add the "selected" class for the clicked size and remove it from others
      const newSizeChangeCss = size.map((x: any) =>
        x.size === info ? styles.sizeOptionSelected : styles.sizeOption
      );
      setSizeChangeCss(newSizeChangeCss);
    }
  };
  const handleClickAddToCart = () => {
    // Vérifie que colorSelection et sizeSelection ne sont pas undefined
    if (colorSelection && sizeSelection) {
      // Copie le produit actuel
      const updatedProduct = { ...product };
      // Met à jour les sélections de couleur et de taille dans le produit
      updatedProduct.color = colorSelection;
      updatedProduct.size = sizeSelection;
      updatedProduct.quantity = 1;
      // Appelle addToCart du contexte global avec le produit mis à jour
      addToCart(updatedProduct);
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
              {size.map((x: any, i: number) => {
                return (
                  <div
                    className={sizeChangeCss[i]}
                    onClick={() => handleClick(x.size)}
                    key={i}
                  >
                    {x.size}
                  </div>
                );
              })}
            </div>
          </div>
          <h3>Couleur:</h3>
          <div className={styles.colors}>
            {colors.map((x: any, i: number) => {
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
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
}
