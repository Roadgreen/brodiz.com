import dotenv from 'dotenv';
dotenv.config();
export type UploadImageResponse = {
  imagePath: string;
};

export default  async function HandleUploadProduct(file: File,productId?:string): Promise<UploadImageResponse | { error: string }> {
 console.log('dns le handleuploadproduct')
    let env = '';
       if(typeof window !== undefined && window.location.hostname === 
         "localhost"){
           env = 'dev'
         } else {
           env = 'prod'
         }
         let envAdress;
         if (env === 'dev') {
           envAdress = process.env.FETCHPRODUCTIMGUPLOADDEV|| '';
         } else {
           envAdress = process.env.FETCHPRODUCTIMGUPLOADPROD || '';
         }
   
     try {
       const formData = new FormData();
       formData.append('image', file);
   
       const response = await fetch(`${envAdress}${productId}`, {
         method: 'POST',
         body: formData,
       });
       console.log(response);
   
       if (response.ok) {
         const responseData: UploadImageResponse = await response.json();
         console.log(responseData)
         return responseData;
       } else {
         const errorData = await response.json();
         return { error: errorData.error || 'Erreur inconnue lors de l\'upload.' };
       }
     } catch (error) {
       console.error('Error uploading image:', error);
       return { error: 'Erreur lors de l\'upload.' };
     }
   }

   export   async function HandleUploadBlog(file: File,articleId:string): Promise<UploadImageResponse | { error: string } > {
    console.log('dns le handleuploadBlog', file)
       let env = '';
          if(typeof window !== undefined && window.location.hostname ===
            "localhost"){
              console.log('dev')
              env = 'dev'
            } else {
              env = 'prod'
            }
            let envAdress;
            if (env === 'dev') {

              envAdress = process.env.FETCHBLOGIMGDEV || '';

            } else {
              envAdress = process.env.FETCHBLOGIMGPROD || '';

            }
      
        try {
          const formData = new FormData();
          formData.append('image', file);
      
          const response = await fetch(`${envAdress}${articleId}`, {
            method: 'POST',
            body: formData,
          });
          if (response.ok) {
            const responseData: UploadImageResponse = await response.json();
            return responseData;
          } else {
            const errorData = await response.json();
            return { error: errorData.error || 'Erreur inconnue lors de l\'upload.' };
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          return { error: 'Erreur lors de l\'upload.' };
        }
      }
   