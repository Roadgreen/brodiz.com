// Import necessary libraries
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./homePersonnalisation.module.css";
import { fontOptions, fontNames } from "@/app/Context/fontContext";
import whiteImg from "@/productImg/Home/WhiteCusto.jpg";
import violetImg from "@/productImg/Home/violetcustom.jpg";
import jaune from "@/productImg/Home/jaunesweat.jpg";
import blackImg from "@/productImg/Home/Blacksweat.jpg";
import orangeImg from "@/productImg/Home/orangerouillesweat.jpg";
import { useGlobalContextAnalytics } from "@/app/Context/analyticsContext";
import { useGlobalContextCart } from "@/app/Context/cartContext";
import Img from "@/app/Context/logoCusto";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import handleUploadImage from '@/app/api/upload/uploadcustomserver'
import {UploadImageResponse} from '@/app/api/upload/uploadcustomserver'

interface ColorObject {
  color: string;
  name: string;
}
interface product {
  id: string;
  name: string;
  img: Array<[string, string]>;
  price: number;
  notes: number;
  price_ID: string;
  price_cost: number,
    price_revenue:number,
  description: {short:string,long:string};
  color: Array<ColorObject>;
  size: Array<string>;
  category: Array<string>;
  tag: Array<string>;
  quantity: number;
  custom: Object;
}
// Here is your Slide compnent
export default function HomePersonnalisation({width}:{width:number}) {


  const { addToCart } = useGlobalContextCart();
  const arrSize = ["XS", "S", "M", "L", "XL", "XXL"];
  const [chooseImg, setChooseImg] = useState<StaticImageData>(jaune);
  const [selectedFont, setSelectedFont] = useState<number>(0);
  const [chooseLogo, setChooseLogo] = useState<number>(0);
  const [Logo, setLogo] = useState(false);
  const [logoPosition, setLogoPosition] = useState(`${styles.logoContainer}`);
  const [custoPosition, setCustoPosition] = useState(true);
  const [sliderPosition, setSliderPosition] = useState<number>(30);
  const [text, setText] = useState<string>("");
  const [prix, setPrix] = useState<number>(39.99);
  const [buySize, setBuySize] = useState<boolean>(false);
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<ColorObject>({
    color: "#ECC931",
    name: "Jaune",
  });
  const [product, setProduct] = useState<product>({
    id: "",
    name: "",
    img: [],
    price: 0,
    notes: 5,
    price_cost: 0,
    price_revenue:0,
    price_ID: "",
    description: {short:'', long:''},
    color: [{name:'',color:''}],
    size: [""],
    category: [""],
    tag: [""],
    quantity: 1,
    custom: {},
  });

  const router = useRouter();
  const Canvas = useRef(null);

  const divMouve = useRef<HTMLDivElement>(null);
  const handlePrice = useCallback(async () => {
    if (Logo && text.length > 1 && custoPosition) {
      setPrix(59.99);
    } else if (!Logo && text.length > 1 && custoPosition) {
      setPrix(44.99);
    } else if (Logo && text.length === 0 && custoPosition) {
      setPrix(54.99);
    } else if (Logo && text.length > 1 && !custoPosition) {
      setPrix(49.99);
    } else if (!Logo && text.length > 1 && !custoPosition) {
      setPrix(39.99);
    } else if (Logo && text.length === 0 && !custoPosition) {
      setPrix(44.99);
    } else {
      setPrix(39.99);
    }
  }, [Logo, text, custoPosition]);

  useEffect(() => {
    console.log(width);
    handlePrice();
    if (divMouve && divMouve.current) {
    
    const slider = divMouve.current;
      let isDragging = false;

      slider.addEventListener("pointerdown", (e) => {
        isDragging = true;
        slider.setPointerCapture(e.pointerId);
      });

      slider.addEventListener("pointermove", (e) => {
        if (isDragging) {
          let max;
          if (custoPosition) {
            max = 20;
          } else {
            max = 18;
          }
          const newPosition = e.clientX - slider.getBoundingClientRect().left;
          setSliderPosition(Math.min(Math.max(0, newPosition), max));
        }
      });

      slider.addEventListener("pointerup", () => {
        isDragging = false;
      });

      return () => {
        slider.removeEventListener("pointerdown", () => {});
        slider.removeEventListener("pointermove", () => {});
        slider.removeEventListener("pointerup", () => {});
      };
    }
  }, [custoPosition, handlePrice, Logo, text]);
  const { sendEvent } = useGlobalContextAnalytics();

  
  


  const handleBuy = async (i: any) => {
    if (buySize) {
      const updatedProduct = { ...product };
      switch (prix) {
        case 59.99:
          updatedProduct.price_ID = "price_1OmGuPFEy7LAuyEsYm4uYvED";
          updatedProduct.id = "cust_home_hoodies_04";
          updatedProduct.name = "Custom SweatShirt Logo centre & texte";

          break;
        case 49.99:
          updatedProduct.price_ID = "price_1OmHlPFEy7LAuyEsIuVr3NZp";
          updatedProduct.id = "cust_home_hoodies_02";
          updatedProduct.name = "Custom SweatShirt Logo poitrine & texte";
          break;
        case 44.99:
          updatedProduct.price_ID = "price_1OmHn2FEy7LAuyEse0GZNkIu";
          updatedProduct.id = "cust_home_hoodies_01";
          updatedProduct.name = "Custom SweatShirt Logo poitrine";
          break;
        case 54.99:
          updatedProduct.price_ID = "price_1OmHprFEy7LAuyEsoSlipx2k";
          updatedProduct.id = "cust_home_hoodies_03";
          updatedProduct.name = "Custom SweatShirt Logo centre";
          break;
        case 39.99:
          updatedProduct.price_ID = "price_1OmHsTFEy7LAuyEspRpRpz5Z";
          updatedProduct.id = "cust_home_hoodies_05";
          updatedProduct.name = "Custom SweatShirt Logo centre & texte";
      }

      updatedProduct.color = [color];
      updatedProduct.size = [i];
 
      updatedProduct.img = [
        ["/img/uploads/WhiteCusto.jpg", "sweatshirt custom"],
      ];
      updatedProduct.price = prix;

      updatedProduct.custom = {
        Logo_custo: chooseLogo,
        Text: text,
        TextSize: sliderPosition,
        ScreenSize: width
      };

      sendEvent({
        url: "",
        eventName: "click",
        sessionId: "",
        data: {
          clickName: "Add_to_cart",
          clickCategorie: "Product",
          product: updatedProduct.id,
          product_color: updatedProduct.color[0].name,
        },
      });
      console.log(updatedProduct);
      addToCart(updatedProduct);
      router.push("/panier");
    } else {
      setBuySize(true);
    }
  };

  const handleLogo = (i: number) => {
    console.log(i, 'numéro du logo');
    setChooseLogo(i);
    setLogo(true);
    handlePrice();
  };

  const handleFontChange = (e: any) => {
    sendEvent({
      url: "",
      eventName: "click",
      sessionId: "",
      data: {
        clickName: "Font_changed",
        clickCategorie: "Home_custom_product",
      },
    });
    setSelectedFont(e.target.value);
    console.log(e.target.value);
  };
  const handleTextChange = (e: any) => {
    sendEvent({
      url: "",
      eventName: "click",
      sessionId: "",
      data: {
        clickName: "Text_changed",
        clickCategorie: "Home_custom_product",
      },
    });
    setText(e.target.value);
    handlePrice();
    console.log(text);
  };
  return (
    <div className={styles.slideContainer}>
      <div ref={Canvas} className={styles.ImgContainer}>
        {Logo ? (
          <div className={logoPosition}>
            <Image
              className={styles.logoImg}
              src={Img[chooseLogo]}
              alt="logo"
              fill
            />
          </div>
        ) : (
          ""
        )}

        {custoPosition ? (
          <div
            className={`${styles.textCenter} ${fontOptions[selectedFont].className}`}
          >
            {chooseImg === blackImg ? (
              <p
                style={{ fontSize: sliderPosition, margin: 0, color: "white" }}
              >
                {text}
              </p>
            ) : (
              <p style={{ fontSize: sliderPosition, margin: 0 }}>{text}</p>
            )}
          </div>
        ) : (
          <div
            className={`${styles.textPoitrine} ${fontOptions[selectedFont].className}`}
          >
            {chooseImg === blackImg ? (
              <p
                style={{ fontSize: sliderPosition, margin: 0, color: "white" }}
              >
                {text}
              </p>
            ) : (
              <p style={{ fontSize: sliderPosition, margin: 0 }}>{text}</p>
            )}
          </div>
        )}
        <Image
          className={styles.Img}
          src={chooseImg}
          alt="photos d'un sweatshirt"
          fill
        />
      </div>

      {buySize ? (
        <div className={styles.containerCustoSize}>
          {" "}
          <h2>Customise-moi</h2>
          <h1>Tailles:</h1>{" "}
          <div className={styles.Size}>
            {arrSize.map((item, i) => (
              <div
                onClick={() => {
                  handleBuy(item);
                }}
                className={styles.sizeBuble}
                key={i}
              >
                {item}
              </div>
            ))}
          </div>
          <div className={styles.containerCondi}>
            <Link className={styles.conditions} href={"/"}>Veuillez noter que le produit final peut légèrement différer de l&apos;image visualisée en ligne en raison de la personnalisation. Pour plus de détails, veuillez consulter nos Conditions Générales de Vente.</Link>
          </div>
          {/*<div  className={`${styles.buttonBuy} ${fontOptions[2].className}`} onClick={()=>{handleBuy()}}>
        Acheter
    </div>*/}
        </div>
      ) : (
        <div className={styles.containerCusto}>
          {" "}
          <h2>Customise-moi</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <div
              onClick={() => {
                setCustoPosition(false),
                  setLogoPosition(`${styles.logoPoitrine}`),
                  handlePrice();
              }}
              className={`${styles.selectPosition} ${fontOptions[2].className}`}
            >
              poitrine
            </div>
            <div
              onClick={() => {
                setCustoPosition(true),
                  setLogoPosition(`${styles.logoContainer}`),
                  handlePrice();
              }}
              className={`${styles.selectPosition} ${fontOptions[2].className}`}
            >
              centre
            </div>
          </div>
          <h4>Couleur</h4>
          <div className={styles.colorChange}>
            <div>
              <div
                onClick={() => {
                  setColor({ color: "#FFFFFF", name: "Blanc" }),
                    setChooseImg(whiteImg);
                }}
              ></div>
              <div
                onClick={() => {
                  setColor({ color: "#ECC931", name: "Jaune" }),
                    setChooseImg(jaune);
                }}
              ></div>
              <div
                onClick={() => {
                  setColor({ color: "#6B29B7", name: "Violet" }),
                    setChooseImg(violetImg);
                }}
              ></div>
              <div
                onClick={() => {
                  setColor({ color: "#000000", name: "Noir" }),
                    setChooseImg(blackImg);
                }}
              ></div>
              <div
                onClick={() => {
                  setColor({ color: "#BF5A02", name: "Orange" }),
                    setChooseImg(orangeImg);
                }}
              ></div>
            </div>
          </div>
          <h4>Choisissez une police :</h4>
          <select
            id="fontSelector"
            className={`${styles.selectFont} ${fontOptions[2].className}`}
            value={selectedFont}
            onChange={(e) => handleFontChange(e)}
          >
            {fontOptions.map((font, i) => (
              <option
                key={i}
                style={{ fontSize: 15, height: 90, overflow: "hidden" }}
                className={font.className}
                value={i}
              >
                {`${fontNames[i]}`}
              </option>
            ))}
            {/* Ajoutez d'autres options selon les polices disponibles */}
          </select>
          <h4>Logo</h4>
          <div>
            <div className={styles.containerLogoExt}>
              {Img.map((item, i) => (
                <div
                  key={i}
                  className={styles.containerLogo}
                  onClick={() => {
                    handleLogo(i);
                  }}
                >
                  <Image src={item} alt={"df"} fill />
                </div>
              ))}
            </div>
          </div>
          <h4>Votre Texte</h4>
         {width > 768 ? ( <textarea
            maxLength={sliderPosition > 18 ? 10 : 15}
            onChange={(e) => {
              handleTextChange(e);
            }}
            className={styles.areaText}
          />) : (
            <textarea
            maxLength={sliderPosition > 18 ? 5 : 13}
            onChange={(e) => {
              handleTextChange(e);
            }}
            className={styles.areaText}
          />
          )}
          <h4>Taille</h4>
          <div className={styles.sliderContainer} ref={divMouve}>
            <div className={styles.sliderRail}></div>
            <div
              className={styles.sliderButton}
              style={{ left: `${sliderPosition}px` }}
            ></div>
          </div>
          <div>
            <h4>Prix</h4>
            <h4>{prix}</h4>
          </div>
          <div
            onClick={() => {
              setCustoPosition(false),
                setLogo(false),
                setText(""),
                handlePrice();
            }}
            className={`${styles.buttonReset} ${fontOptions[2].className}`}
          >
            reset
          </div>
          <div
            className={`${styles.buttonBuy} ${fontOptions[2].className}`}
            onClick={() => {
              handleBuy('');
            }}
          >
            Acheter
          </div>
        </div>
      )}
    </div>
  );
}
