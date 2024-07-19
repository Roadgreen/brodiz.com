import styles from "./prodCardCrea.module.css";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
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

  useEffect(() => {
    if (productArray.length !== 4) {
      const fetchProductData = async () => {
        const prod1: Array<product> = await productSearch(
          {},
          "Hoodies",
          "Product"
        );
        const prod2: Array<product> = await productSearch({}, "Pull", "Product");
        const prod3: Array<product> = await productSearch({}, "Baby", "Product");
        const prod4: Array<product> = await productSearch({}, "Bain", "Product");

      
        setProductArray([prod1, prod2, prod3, prod4]);
        setIsLoading(false);
      };
      fetchProductData();
    } else {
      setIsLoading(false);
    }
  }, [productSearch,productArray,setProductArray]);
  console.log(productArray);
  // If still loading, show loading message or spinner
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

  const handleClick = async (id: number, index: number, aed: string) => {
    async function collectionName() {
      let collection = "";
      switch (id) {
        case (id = 0):
          return (collection = "Hoodies");
        case (id = 1):
          return (collection = "Pull");
        case (id = 2):
          return (collection = "Baby");
        case (id = 3):
          return (collection = "Bain");
      }
    }

    const collection = await collectionName();
    setSelectedProduct(productArray[id][index]);
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
    const filteredProducts = selectedCat !== ''
    ? productArray[id].filter((product: any) => product.category.includes(selectedCat))
    : productArray[id];
    console.log(productArray[id]);
    return filteredProducts.map((x: any, i: number) => {
      const colors = x.color;
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
