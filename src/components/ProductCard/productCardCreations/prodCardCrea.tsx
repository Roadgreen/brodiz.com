import styles from "./prodCardCrea.module.css";
import Image from "next/image";
import { useContext, useState, useEffect,useCallback } from "react";
import { CartContext } from "../../../app/Context/cartContext";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/Context/productStore";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

interface ColorObject {
  color: string;
  name: string;
}
interface comments {
  username: string,
  date: Date,
  comments:string
  }
  interface product {
    id: string,
    name: string,
    img: Array<[string,string]>,
    price:number,
    price_cost: number,
    price_revenue:number,
    notes:number,
    price_ID: string,
    description: {short:string,long:string},
    color: Array<ColorObject>,
    comments: Array<comments>,
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
export default function ProdCardCrea({ id }: { id: number }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 
  const [selectedCat,setSelectedCat] = useState<string>('');
  const { productSearch, productArray, setProductArray, setSelectedProduct } =
    useGlobalContext();

    const fetchProductData = useCallback(async () => {
      const prod1: Array<product> = await productSearch({}, "Hoodies", "Product");
      const prod2: Array<product> = await productSearch({}, "Pull", "Product");
      const prod3: Array<product> = await productSearch({}, "Tshirt", "Product");
      const prod4: Array<product> = await productSearch({}, "Baby", "Product");
      const prod5: Array<product> = await productSearch({}, "Bain", "Product");
  
      setProductArray([prod1, prod2, prod3, prod4, prod5]);
      setIsLoading(false);
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
  const handleCatChange = async (i:string)=>{
    setSelectedCat(i);
  }

  const handleClick = async (id: number, index: number, aed: string,filterProduct: product[]) => {
    async function collectionName() {
      let collection = "";
      switch (id) {
        case 0:
          return (collection = "Hoodies");
        case 1:
          return (collection = "Pull");
        case 2:
          return (collection = "Tshirt");
          case 3:
            return (collection = "Baby");
        case 4:
          return (collection = "Bain");
          
      }
    }

    const collection = await collectionName();
    console.log('ici le selected product L103' , 'id', id, 'index',index, 'productarray', productArray )
    setSelectedProduct(filterProduct[index]);
    console.log('routerpush : ', collection,aed );
    router.push(`/creations/${collection}/${aed}`);
  };

  const filterSelection = () =>{
    let filter:Array<string> = [];
    switch(id){
      case 0: 
      filter = ['Homme','Femme','Enfant'];
      break;
      case 1:
        filter = ['Homme','Femme','Enfant'];
        break;
        case 2:
          filter = ['Homme','Femme','Enfant'];
          break;
      case 4:
        filter = ['Serviette','Peignoir'];
        break;
    }

    return filter.map((filter:string,i:number)=>{
      return (
<div key={i} className={selectedCat === filter ? styles.ActivedFilter : styles.Filter} onClick={()=>{handleCatChange(filter)}}>{filter}</div>
      )
    })
  }

  const cardProductMapping: any = () => {
    console.log('selectedcat L131',selectedCat)
    const filteredProducts = selectedCat !== ''
    ? productArray[id].filter((product: any) => product.category.includes(selectedCat))
    : productArray[id];
    console.log(filteredProducts, 'L133 cardcrea');

    return filteredProducts.map((x: any, i: number) => {
      const colors = x.color;
      return (
        <div
          className={styles.cardContainer}
          key={i}
          onClick={() => handleClick(id, i, x.id,filteredProducts)}
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
    <div className={styles.ContainerMenu}>
      <div className={styles.Menu}>
{filterSelection()}
      </div>
     
  <div className={styles.Container}>
      
      {productArray[id].length > 0 ? (
        cardProductMapping()
      ) : (
        <div>Désolé il n&apos;y a aucun article</div>
      )}
    </div>
    </div>
  
  );
}
