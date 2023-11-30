"use client"
import React, { useState,useEffect } from 'react'
import style from './customHoodies.module.css'
import Image from 'next/image'
import { useGlobalContextCart } from '@/app/Context/cartContext'

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
    description: string,
    color: Array<ColorObject>,
    size:Array<string>,
    category: Array<string>,
    tag: Array<string>,
    quantity:number,
  }

export default function CustomHoodies() {
    const sizeAvailable:Array<string> = ['S','M','L','XL','XXL'];
    const [text,setText] = useState(true);
    const [file,setFile] = useState({})
    const [price,setPrice] = useState(50.00);
    const [animals,setAnimals] = useState(1);
    const [textWrite,setWriteText] = useState('');
    const [size,setSize] = useState(['']);
    const {addedToCart} = useGlobalContextCart();
    const [color,setColor] = useState({name:'',color:''});
    const [product,setProduct] = useState({ id: 'id',
        name: 'Hoodies perso',
        img: ['',''],
        price:price,
        notes: 5,
        price_ID: 'price_id',
        description: 'description',
        color: color,
        size:size,
        category: ['perso'],
        tag: ['perso'],
        quantity:1});
   
        const handleSubmit = async  ()  => {
if(text){
    if(textWrite !== '' && size[0] !== '' && color.name !== ''){

    }
}
        }
    
    const handleChangeAnimal = async (a:string)=>{
        if(a === 'true'){
           setAnimals(1);
        } else {
           setAnimals(2);
        }
   }
   const handleColor = async (a:string) => {
    if(a === 'black'){
        setColor({name:'black',color:'black'})
    } else {
        setColor({name:'white',color:'white'})
    }
   }
    const handleChangeText = async (a:string)=>{
         if(a === 'true'){
            setText(true);
         } else {
            setText(false);
         }
    }
    useEffect(() => {
        const changePrice = () => {
            if(animals === 1 && text){
                setPrice(55.00)
            } else if(animals === 2 && text){
            setPrice(65.00)
            } else if(animals === 1 && !text){
            setPrice(50.00)
            }else if(animals === 2 && !text){
                setPrice(60.00);
            }
        }
        changePrice();
      }, [animals, text]);
  return (
    <div className={style.Container}>
        <div className={style.ContainerProduct}>
        <div className={style.ImgContainer}>
    <Image src={'/img/product/persoChien.jpg'} alt='photos dun hoodies chien' fill />
</div>
<div className={style.descriptContainer}>
    <h2>Hoodies personnalisé</h2>
    <p>Envie d&apos;un style unique avec votre(vos) meilleurs amis dessus? n&apos;hésitez plus et optez pour ce sweat personnalisé! </p>
    <h4>Donnez-nous votre image: </h4>
    <label>Vous pouvez choisir plusieurs images</label>
    <br/>
    <label className={style.LabelbuttonDownload}>
        Télécharger votre image
    <input onChange={(e)=>{setFile(e.target.value)}} className={style.buttonDownload} type='file' id='file' placeholder='votre image' multiple accept="image/png, image/jpeg"/>
    </label>
    <br/>
    <div>
    <input type="radio" onChange={(e)=>{handleChangeAnimal(e.target.value)}}  name="animal"  value={'true'} />
    <label>1 animal</label>
  </div>

  <div>
    <input type="radio" onChange={(e)=>{handleChangeAnimal(e.target.value)}} id="dewey" name="animal" value={'false'} />
    <label>2 animaux</label>
  </div>
  <br/>
    <div>
    <input type="radio" onChange={(e)=>{handleChangeText(e.target.value)}}  name="text"   value={'true'} />
    <label>Avec une écriture?</label>
  </div>

  <div>
    <input type="radio" onChange={(e)=>{handleChangeText(e.target.value)}} id="dewey" name="text" value={'false'} />
    <label>Sans écriture?</label>
  </div>
  <br/>

{text ? <textarea>Un petit mot? </textarea> : ''}
<div>
        <h3>Choisissez une couleur: </h3>
        <div className={style.containerColor}>
       {color.name === 'black'? <div onClick={()=>{handleColor('black')}} className={style.colorBlackActive}></div> : <div onClick={()=>{handleColor('black')}} className={style.colorBlack}></div>} 
       {color.name === 'white' ? <div onClick={()=>{handleColor('white')}} className={style.colorWhiteActive}></div>: <div onClick={()=>{handleColor('white')}} className={style.colorWhite}></div>} 
        </div>
       
    </div>
    <div className={style.sizeContainer}>
        <label>Choisissez une taille:</label>
        <br/>
        <select onChange={(e)=>{setSize([e.target.value])}}>
            {sizeAvailable.map((size:string,index:number)=>(
            <option key={index}>{size}</option>
        ))}</select>
    </div>
    <div>
    <p>{price}€</p>
    </div>
  
   <button className={style.buttonBuy}>Acheter</button>
</div>

        </div>

    </div>
  )
}
