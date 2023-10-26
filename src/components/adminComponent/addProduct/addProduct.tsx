import React from 'react'

export default function AddProduct() {
  return (
    <div>
        <h1>Ajouter un produit</h1>
        <form>
            <input type='text' placeholder='productId'/>
            <input type='text' placeholder='productName'/>
            <input type='file' placeholder='img1'/>
            <input type='file' placeholder='img2'/>
            <input type='file' placeholder='img3'/>
            <input type='file' placeholder='img4'/>
            <input type='file' placeholder='img5'/>
            <input type='text' placeholder='productNotes'/>
            <input type='number' placeholder='productPrice'/>
            <input type='text' placeholder='productPriceId'/>
            <input type='text' placeholder='productModel'/>
            <input type='text' placeholder='productCategory'/>
            <input type='text' placeholder='productTag'/>
            <input type='text' placeholder='productSize'/>
            <input type='text' placeholder='productColor'/>
            <input type='text' placeholder='productDescription'/>
<button>Envoyer le produit</button>
        </form>
    </div>
  )
}
