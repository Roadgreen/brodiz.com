import { useContext, useState, useEffect } from "react";
import { useGlobalContextCart } from "@/app/Context/cartContext";
import { useGlobalContextCom } from "@/app/Context/commandeContext";
import styles from "./livraison.module.css";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { loadStripe } from "@stripe/stripe-js";
import { useGlobalContextUser } from "@/app/Context/UserAccountContext";
import { useGlobalContextAnalytics } from "@/app/Context/analyticsContext";

interface User {
  id: string;
  email: string;
  username: string;
  collection: string;
  date: string;
  newsletter: number;
  adress: [{ adresse: string; post: string; ville: string; pays: string }];
  name: string;
  surname: string;
}
interface LivraisonPartProps {
  User?: User | null;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function LivraisonPart({ User }: LivraisonPartProps) {
  const { sendPageview } = useGlobalContextAnalytics();
  const { AdressCheck, livPrice, tot, price, cartItem } =
    useGlobalContextCart();
  const { FindUser } = useGlobalContextUser();

  const { commandAdd } = useGlobalContextCom();
  const [connected, setConnected] = useState(false);
  const [sameAdress, SetSameAdress] = useState(true);

  useEffect(() => {
    sendPageview({
      url: "",
      referrer: "",
      userAgent: "",
      visitorId: "",
      userId: "",
      sessionId: "",
      timeOnPage: new Date(),
      screenResolution: "",
      product: {},
      pageCategory: "Livraison",
      data: {},
    });
    console.log(User);
    console.log(cartItem);

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
    if (User) {
      setConnected(true);
    }
  }, [cartItem, User]);
  const router = useRouter();
  const [adress, setAdress] = useState({
    adresse: "",
    post: "",
    ville: "",
    pays: "",
  });
  const [userNotConnectInfo, setUserNotConnectInfo] = useState({
    prenom: "",
    nom: "",
    email: "",
    tel: "",
  });
  const [command, setCommand] = useState({
    useremail: "",
    username: "",
    userlastname: "",
    userid: "",
    product: [{}],
    livraisonprice: 0,
    totalprice: 0,
    adress: { adresse: "", post: "", ville: "", pays: "" },
  });
  const [addOk, setAddOk] = useState(false);
  const [emailOk, setEmailOk] = useState<boolean>(false);

  const is_valid_email = (email: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  };

  const handleChangeAdd = (e: string, n: any) => {
    setAdress((adress) => ({
      ...adress,
      [n]: e,
    }));
  };

  const handleChangeUserInf = (e: string, n: any) => {
    setUserNotConnectInfo((userNotConnectInfo) => ({
      ...userNotConnectInfo,
      [n]: e,
    }));
  };

  const handleClick = async () => {
    console.log(adress);
console.log(livPrice);
    const itemsForCheckout = cartItem.map((item) => ({
      quantity: item.quantity,
      price: item.price_ID,
    }));
    console.log(itemsForCheckout, "ici le cartItem");
    if (
      adress.adresse !== "" &&
      adress.post !== "" &&
      adress.ville !== "" &&
      adress.pays !== ""
    ) {
      const check: any = await AdressCheck(adress);
      console.log(adress);
      console.log(check);
      console.log(command);
      if (check && is_valid_email(userNotConnectInfo.email)) {
        const params: any = {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
          body: JSON.stringify(itemsForCheckout),
        };
        if (User) {
          //command a traiter
          const command = {
            userid: User.id,
            useremail: User.email,
            username: User.name,
            userlastname: User.surname,
            adress: User.adress[0],
            product: cartItem,
            livprice: 0,
            totalprice: tot,
          };
          await commandAdd(command);
        } else {
          console.log(adress);
          const command = {
            userid: "",
            useremail: userNotConnectInfo.email,
            username: "",
            userlastname: userNotConnectInfo.nom,
            adress: adress,
            product: cartItem,
            livprice: 0,
            totalprice: tot,
          };
          await commandAdd(command);
        }

        const response: Response | void = await fetch(
          "/api/stripe/create-checkout-session",
          params
        );

        const data = await response.json(); // Parse the JSON data from the response
        const checkoutURL = data.URL;
        console.log(checkoutURL);
        router.push(`${checkoutURL}`);
      } else {
        setAddOk(true);
        if (!is_valid_email(userNotConnectInfo.email)) {
          setEmailOk(true);
        }
      }
    } else if (connected) {
      const params: any = {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        body: JSON.stringify(itemsForCheckout),
      };

      const response: Response | void = await fetch(
        "/api/stripe/create-checkout-session",
        params
      );

      const data = await response.json(); // Parse the JSON data from the response
      const checkoutURL = data.URL;
      console.log(checkoutURL);
      router.push(`${checkoutURL}`);
    } else {
      console.log("not ok adress");

      setAddOk(true);
    }
  };
  return (
    <div className={styles.Container}>
      <div className={styles.SecondContainer}>
        <div>
          <h3>Information de livraison</h3>
        </div>
        <div>
          {User && User.adress && sameAdress ? (
            <div className={styles.ContainerLivCon}>
              <button
                className={styles.buttonOn}
                onClick={() => {
                  SetSameAdress(false);
                }}
              >
                Changer mon adresse
              </button>
              <div>
                <p>{User.adress[0].adresse}</p>
                <p>{User.adress[0].ville}</p>
                <p>{User.adress[0].post}</p>
                <p>{User.adress[0].pays}</p>
              </div>
            </div>
          ) : (
            <form className={styles.Form}>
              <div>
                <input
                  placeholder="Prénom"
                  onChange={(e) =>
                    handleChangeUserInf(e.target.value, "prenom")
                  }
                ></input>
                <input
                  placeholder="Nom"
                  onChange={(e) => handleChangeUserInf(e.target.value, "nom")}
                ></input>
              </div>
              <div>
                <input
                  placeholder="Adresse postale"
                  onChange={(e) => handleChangeAdd(e.target.value, "adresse")}
                ></input>
                <input
                  placeholder="Ville"
                  onChange={(e) => handleChangeAdd(e.target.value, "ville")}
                ></input>
              </div>
              <div>
                <input
                  placeholder="Code postal"
                  onChange={(e) => handleChangeAdd(e.target.value, "post")}
                ></input>
                <input
                  placeholder="Pays"
                  onChange={(e) => handleChangeAdd(e.target.value, "pays")}
                ></input>
              </div>
              <div>
                <input
                  placeholder="Email"
                  style={emailOk ? { borderColor: "red" } : {}}
                  onChange={(e) => handleChangeUserInf(e.target.value, "email")}
                ></input>
                <input
                  placeholder="Numéro de téléphone(optionnel)"
                  onChange={(e) => handleChangeUserInf(e.target.value, "tel")}
                ></input>
              </div>
            </form>
          )}
          {addOk ? (
            <div className={styles.Wrongad}>
              <p style={{ color: "red" }}>Veuillez vérifier votre adresse!</p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <button
          className={styles.Button}
          onClick={() => {
            handleClick();
          }}
        >
          Allez au paiement
        </button>
      </div>
    </div>
  );
}
