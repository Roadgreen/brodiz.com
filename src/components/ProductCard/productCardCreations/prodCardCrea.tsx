import styles from "./prodCardCrea.module.css";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Function/cartContext";
import { useRouter } from "next/navigation";
import { ProductContext, useGlobalContext } from "@/app/Context/productStore";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

export default function ProdCardCrea({ id }: { id: number }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 
  const Cart = useContext(CartContext);
  const { productSearch, productArray, setProductArray, setSelectedProduct } =
    useGlobalContext();

  useEffect(() => {
    if (productArray.length !== 4) {
      const fetchProductData = async () => {
        const prod1: Array<Object> = await productSearch(
          {},
          "Hoodies",
          "Product"
        );
        const prod2: Array<Object> = await productSearch({}, "Baby", "Product");
        const prod3: Array<Object> = await productSearch({}, "Bain", "Product");
        const prod4: Array<Object> = await productSearch({}, "Pull", "Product");

      
        setProductArray([prod1, prod2, prod3, prod4]);
        setIsLoading(false);
      };
      fetchProductData();
    } else {
      setIsLoading(false);
    }
  }, []);
  console.log(productArray);
  // If still loading, show loading message or spinner
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loader}></div>
      </div>
    );
  }
  const handleClick = async (id: number, index: number, aed: string) => {
    async function collectionName() {
      let collection = "";
      switch (id) {
        case (id = 0):
          return (collection = "Hoodies");
        case (id = 1):
          return (collection = "Baby");
        case (id = 2):
          return (collection = "Bain");
        case (id = 3):
          return (collection = "Pull");
      }
    }

    const collection = await collectionName();
    setSelectedProduct(productArray[id][index]);
    router.push(`/creations/${collection}/${aed}`);
  };

  const cardProductMapping: any = () => {
    return productArray[id].map((x: any, i: number) => {
      const colors = x.color ? JSON.parse(x.color) : [];
      return (
        <div
          className={styles.cardContainer}
          key={i}
          onClick={() => handleClick(id, i, x.id)}
        >
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              src={x.img ? x.img[0][0] : []}
              alt={x.img ? x.img[0][1] : []}
              fill
            />
          </div>
          <div className={styles.iconContainer}>
            <AiFillHeart />
          </div>
          <h3>{x.Name}</h3>
          <div>{x.price}€</div>
          <div className={styles.colorContainer}>
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
        </div>
      );
    });
  };

  // Render the content when loading is done
  return (
    <div className={styles.Container}>
      {productArray[id].length > 1 ? (
        cardProductMapping()
      ) : (
        <div>Désolé il n'y a aucun article</div>
      )}
    </div>
  );
}