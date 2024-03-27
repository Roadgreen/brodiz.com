import React, { useState,useEffect } from 'react'
import styles from './addProduct.module.css'
import { useGlobalContextAdmin } from '@/app/Context/adminContext';
import { useGlobalContext } from '@/app/Context/productStore';

interface ColorObject {
  color: string;
  name: string;
}
interface comments {
  username: string,
  date: Date,
  comments:string
  }
interface FormData {
   id:string,name:string,img:Array<[string,string]>,notes: number,price: number,price_ID:string,model:string,category:Array<string>,tag:Array<string>,size:Array<string>,color:ColorObject[],description:string,collection:string,comments:Array<comments>,custom:Object
}
export default function AddProduct() {
  const availableSizes = ['S','M','L','XL','XXL','Taille Unique'];
  const availableCategory = ['Hoodies','Manga','Famille','Customisation','Cuisine','Pull','Tablier','Homme','Femme','Enfant','Chaussette']
  const {productAdd} = useGlobalContext();
  const [tags,setTags] = useState(['']);
  const [custom,setCustom] = useState(false);
  const [customChoice,setCustomChoice]= useState('');
  const [customName,setCustomName] = useState('');
  const [alts,setAlts] = useState('');
  const [textCustom,setTextCustom] = useState('');
  const [customArray,setCustomArray] = useState<any>([]);
  const [error,setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const [colors,setColors] = useState({color:'',name:''});
  const {uploadImage} = useGlobalContextAdmin();
const [formData,setFormData] = useState<FormData>({
  id:'',name:'',img: [],notes: 0,price: 0,price_ID:'',model:'',category:[],tag:[],size:[],color: [],description:'',collection: '',comments:[],custom:{}
})
const [imgData,setImgData] = useState([]);
useEffect(() => {
  // Mise à jour des options du select lorsque customArray est mis à jour
  // Cela garantit que les options sont toujours à jour avec les données les plus récentes
}, [customArray]);
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
if(e.target.files !== null){
  const file = e.target.files[0];
  if(file && formData.id !== ''){
  
    try{

      const result = await uploadImage(file,formData.id);
      console.log(result)
      if(result){
        console.log(result);
        setFormData({...formData,img: [...formData.img,[result.imagePath,alts]]})
      }
    }catch(err){
      console.log(err);
    }
 
  }
}
}
const isFieldEmpty = async (fieldName:any) => {

if(fieldName === ''){
  console.log(false)
  return false
}  else if(fieldName === 0){
  console.log(false)

  return  false
}else if(fieldName.length === 0){
  console.log(false)

  return false
} else {
  console.log(true)

  return true
}


}
const handleAddProduct = async (e: React.FormEvent) =>{
  e.preventDefault();
 if(
 await isFieldEmpty(formData.id) &&
 await isFieldEmpty(formData.name) &&
 await isFieldEmpty(formData.img) &&
 await isFieldEmpty(formData.notes) &&
 await isFieldEmpty(formData.price) &&
 await isFieldEmpty(formData.price_ID) &&
 await isFieldEmpty(formData.model) &&
 await isFieldEmpty(formData.category) &&
 await isFieldEmpty(formData.tag) &&
 await isFieldEmpty(formData.size) &&
 await isFieldEmpty(formData.color) &&
 await isFieldEmpty(formData.description) &&
 await isFieldEmpty(formData.collection)&&
 await isFieldEmpty(formData.custom)
 ){
  setError(false);
  console.log(formData)
  const resultToAdd = await productAdd(formData);
  console.log(resultToAdd)
  if(resultToAdd === 202){
  console.log(resultToAdd)
setSuccess(true);
  }else {
    setSuccess(false);
    setError(true);
  }
  
 } else {
  console.log('dans le true', formData);
  setError(true);
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
const handleCatChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const category = e.target.value;
  const updatedCatArray = formData.size.includes(category)
    ? formData.category.filter((s) => s !== category)
    : [...formData.category, category];

  setFormData({
    ...formData,
    category: updatedCatArray,
  });
};
const handleColorChange = async () =>{
const updatedColor = [...formData.color,colors];

  setFormData({
    ...formData,
    color: updatedColor,
  });
  
  console.log(await formData.color);
}
const handleChangeCustomSelect = async (e:any) => {
  e.preventDefault();
  const valeurActuelle:string = textCustom;
  const dernierCaractere:string[] = valeurActuelle.split(';').map(item => item.trim());


    setFormData({...formData,custom:{custom: true, customType: 'select', customName:customName,customSelect:dernierCaractere}})
    console.log(dernierCaractere);
    console.log(customArray);
    console.log(formData);
    setCustomArray(dernierCaractere);
  
};
const handleChangeCustomInput = (e:any) => {
  const inputPattern = e.target.value;
  if(customName !== ''){
    setFormData({...formData,custom:{custom:true,customType:'input',customName: customName,customInputPattern:inputPattern}})

  } else {
    console.log('no name');
  }
}

  return (
    <div className={styles.container}>
        <h1>Ajouter un produit</h1>
        <form className={styles.ContainerAdd}>
          <div> <input type='text'onChange={(e)=>{setFormData({...formData,id:e.target.value})}} placeholder='productId'/>
            <input type='text' onChange={(e)=>{setFormData({...formData,name:e.target.value})}} placeholder='productName'/>
            <input type='text' placeholder='img1Alt' onChange={(e)=>{setAlts(e.target.value)}}/>
            <input type='file' onChange={handleFileUpload} placeholder='img1'/>
            <input type='text' placeholder='img2Alt' onChange={(e)=>{setAlts(e.target.value)}}/>
            <input type='file'onChange={handleFileUpload} placeholder='img2'/>
            <input type='text' placeholder='img3Alt' onChange={(e)=>{setAlts(e.target.value)}}/>
            <input type='file'onChange={handleFileUpload} placeholder='img3'/>
            <input type='text' placeholder='img4Alt' onChange={(e)=>{setAlts(e.target.value)}}/>
            <input type='file'onChange={handleFileUpload} placeholder='img4'/>
            <input type='text' placeholder='img5Alt' onChange={(e)=>{setAlts(e.target.value)}} />
            <input type='file'onChange={handleFileUpload} placeholder='img5'/>
            </div>
           <div><input type='number' onChange={(e)=>{setFormData({...formData,notes:e.target.valueAsNumber})}} placeholder='productNotes'/>
            <input type='number'onChange={(e)=>{setFormData({...formData,price:e.target.valueAsNumber})}} placeholder='productPrice'/>
            <input type='text' onChange={(e)=>{setFormData({...formData,price_ID:e.target.value})}} placeholder='productPriceId'/>
            <input type='text' onChange={(e)=>{setFormData({...formData,model:e.target.value})}} placeholder='productModel'/>
            <input type='text' onChange={(e)=>{setFormData({...formData,collection:e.target.value})}} placeholder='productCollection'/>

  <h3>Custom</h3>
  <div>
    <div>
    <label>
    <input onClick={()=>setCustom(true)} name='custom' value="true" type='radio' />
    Oui</label>
    </div>
   
<div>
<label>
    <input onClick={()=>setCustom(false)} name='custom'  value="false" type='radio' />
    Non</label>
</div>
{custom ? (<div>
  <h3>Selection custom Option</h3>
  <div>
<label>
    <input onClick={()=>setCustomChoice('select')} name='customChoice'  value="" type='radio' />
    Custom Selection</label>
</div>
<div>
<label>
    <input onClick={()=>setCustomChoice('input')} name='customChoice'  value="false" type='radio' />
    TextInput</label>
</div>

</div>) : ''}
{custom !== false && customChoice === 'select' ? (<div>
  <h3>Description custom pour selection : </h3>
  <input onChange={(e)=>setCustomName(e.target.value)}  />
  <h3>Séparer les selects avec un ';'</h3>
  <textarea
        value={textCustom}
        onChange={(e)=>{setTextCustom(e.target.value)}}
      />
      <button onClick={(e)=>{handleChangeCustomSelect(e)}}>Validé</button>
     
     
</div>) : ''}
{custom !== false && customChoice === 'input' ? (<div>
<h3>Description custom pour l'input : </h3>
  <input onChange={(e)=>setCustomName(e.target.value)}  />
  <h3>Input pattern:</h3>
  <input
        value={textCustom}
        onChange={handleChangeCustomInput}
      />
     
</div>): ''}
  

</div>
          <h3>Tag</h3>
          <div className={styles.list}>
          {formData.tag.map((e)=>(
            <h4 key={e}>{e}</h4>
          ))}
          </div>
       
          <input type='text' onChange={(e)=>{setTags([e.target.value])}} />
            <button onClick={(e)=>{e.preventDefault(), setFormData({...formData,tag:[ ...formData.tag , tags[0]]})}}>Ajouter</button>
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
          <h4>Categorie</h4>
          {availableCategory.map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                value={cat}
                checked={formData.category.includes(cat)}
                onChange={handleCatChange}
              />
              {cat}
            </label>
          ))}
          <h3>Colors</h3>
          <div className={styles.list}>
          {formData.color.map((item,index)=>{
            return(
              <div key={index}>
              <p>{item.color}</p>
                        <p>{item.name}</p>
                        </div>
            )
        
          })}
          </div>
          <div>
          <input type='text' onChange={(e)=>{setColors({...colors,color:e.target.value})}} placeholder='colorCss'/>
          <input type='text' onChange={(e)=>{setColors({...colors,name:e.target.value})}} placeholder='colorName'/>
          <div className={styles.button} onClick={handleColorChange}><p>Ajouter</p></div>
          </div>
           <h3>Product Description</h3>
           <textarea onChange={(e)=>{setFormData({...formData,description:e.target.value})}} className={styles.textArea}/></div>
            {error ? <p>Vérifiez les informations, il manque des données</p>: ''}
            {success ? <p>Produit ajouté</p>: ''}
            
<button onClick={handleAddProduct}>Envoyer le produit</button>
        </form>
    </div>
  )
}
