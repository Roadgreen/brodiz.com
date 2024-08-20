import styles from "./prodCardCrea.module.css";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/Context/productStore";
import { AiFillHeart } from "react-icons/ai";

export default function ProdCardCrea({ id }: { id: number }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<string>('');
  const { productSearch, productArray, setProductArray, setSelectedProduct } = useGlobalContext();

  const fetchProductData = useCallback(async () => {
    try {
      const prod1 = await productSearch({}, "Hoodies", "Product");
      const prod2 = await productSearch({}, "Pull", "Product");
      const prod3 = await productSearch({}, "Tshirt", "Product");
      const prod4 = await productSearch({}, "Baby", "Product");
      const prod5 = await productSearch({}, "Bain", "Product");

      setProductArray([prod1, prod2, prod3, prod4, prod5]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }, [productSearch, setProductArray]);

  useEffect(() => {
    if (productArray.length === 0) {
      fetchProductData();
    } else {
      setIsLoading(false);
    }
  }, [productArray.length, fetchProductData]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  const handleCatChange = (category: string) => {
    setSelectedCat(category);
  };

  const handleClick = (id: number, index: number, aed: string, filteredProducts: any[]) => {
    const collectionName = (id: number) => {
      switch (id) {
        case 0: return "Hoodies";
        case 1: return "Pull";
        case 2: return "Tshirt";
        case 3: return "Baby";
        case 4: return "Bain";
        default: return "";
      }
    };

    const collection = collectionName(id);
    setSelectedProduct(filteredProducts[index]);
    router.push(`/creations/${collection}/${aed}`);
  };

  const filterSelection = () => {
    let filter: string[] = [];
    switch (id) {
      case 0:
      case 1:
      case 2:
        filter = ['Homme', 'Femme', 'Enfant'];
        break;
      case 4:
        filter = ['Serviette', 'Peignoir'];
        break;
    }

    return filter.map((filter, i) => (
      <div
        key={i}
        className={selectedCat === filter ? styles.ActivedFilter : styles.Filter}
        onClick={() => handleCatChange(filter)}
      >
        {filter}
      </div>
    ));
  };

  const cardProductMapping = () => {
    if (!productArray[id] || productArray[id].length === 0) {
      return <div>Désolé il n&apos;y a aucun article</div>;
    }

    const filteredProducts = selectedCat !== ''
      ? productArray[id].filter((product: any) => product.category.includes(selectedCat))
      : productArray[id];

    if (!filteredProducts || filteredProducts.length === 0) {
      return <div>Désolé il n&apos;y a aucun article</div>;
    }

    return filteredProducts.map((product: any, i: number) => {
      const colors = product.color || [];
      return (
        <div
          className={styles.cardContainer}
          key={i}
          onClick={() => handleClick(id, i, product.id, filteredProducts)}
        >
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              src={product.img ? product.img[0][0] : "/fallback-image.png"} // Provide a fallback image
              alt={product.img ? product.img[0][1] : "Product Image"}
              fill
            />
          </div>
          <div className={styles.iconContainer}>
            <AiFillHeart />
          </div>
          <h3>{product.name || "Unnamed Product"}</h3>
          <div>{product.price}€</div>
          <div className={styles.colorContainer}>
            {colors.map((color: any, j: number) => (
              <div
                className={styles.color}
                style={{ backgroundColor: color.color }}
                key={j}
              ></div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.ContainerMenu}>
      <div className={styles.Menu}>
        {filterSelection()}
      </div>
      <div className={styles.Container}>
        {cardProductMapping()}
      </div>
    </div>
  );
}
