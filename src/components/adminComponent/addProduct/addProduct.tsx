import React, { useState } from 'react'
import styles from './addProduct.module.css'
import { useGlobalContextAdmin } from '@/app/Context/adminContext';

interface FormData {
   id:string,name:string,img:Array<[string]>,notes:string,price: number,price_ID:string,model:string,category:Array<string>,tag:string,size:Array<string>,color:Array<Object>,description:string
}
export default function AddProduct() {
  const availableSizes = ['S','M','L','XL','XXL'];
  const {uploadImage} = useGlobalContextAdmin();
const [formData,setFormData] = useState<FormData>({
  id:'',name:'',img: [],notes:'',price: 0,price_ID:'',model:'',category:[],tag:'',size:[],color: [],description:''
})
const [imgData,setImgData] = useState([]);

const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
if(e.target.files !== null){
  const file = e.target.files[0];
  if(file){
    const result = await uploadImage(file);
    if(result.status){
      console.log(result.path);
      setFormData({...formData,img: [...formData.img,[result.path]]})
    }
  }
}
}
const handleSizeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const size = e.target.value;
  const updatedSizeArray = formData.size.includes(size)
    ? formData.size.filter((s) => s !== size)
    : [...formData.size, size];

  setFormData({
    ...formData,
    size: updatedSizeArray,
  });
};


  return (
    <div className={styles.container}>
        <h1>Ajouter un produit</h1>
        <form className={styles.ContainerAdd}>
          <div> <input type='text' placeholder='productId'/>
            <input type='text' placeholder='productName'/>
            <input type='file' onChange={handleFileUpload} placeholder='img1'/>
            <input type='text' placeholder='img1Alt'/>
            <input type='file'onChange={handleFileUpload} placeholder='img2'/>
            <input type='text' placeholder='img2Alt'/>
            <input type='file'onChange={handleFileUpload} placeholder='img3'/>
            <input type='text' placeholder='img3Alt'/>
            <input type='file'onChange={handleFileUpload} placeholder='img4'/>
            <input type='text' placeholder='img4Alt'/>
            <input type='file'onChange={handleFileUpload} placeholder='img5'/>
            <input type='text' placeholder='img5Alt'/></div>
           <div><input type='text' placeholder='productNotes'/>
            <input type='number' placeholder='productPrice'/>
            <input type='text' placeholder='productPriceId'/>
            <input type='text' placeholder='productModel'/>
            <input type='text' placeholder='productCategory'/>
            <input type='text' placeholder='productTag'/>
           <h3>Size</h3>
           {availableSizes.map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                value={size}
                checked={formData.size.includes(size)}
                onChange={handleSizeChange}
              />
              {size}
            </label>
          ))}
            <input type='text' placeholder='productColor'/>
            <input type='text' placeholder='productDescription'/></div>
            
<button>Envoyer le produit</button>
        </form>
    </div>
  )
}
