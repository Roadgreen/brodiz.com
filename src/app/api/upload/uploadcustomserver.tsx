import type { NextApiRequest, NextApiResponse } from 'next';

export type UploadImageResponse = {
  imagePath: string;
};
export type DeleteImageResponse = {
  success: boolean,
  message:string
};

export default async function handleUploadImage(file: File): Promise<UploadImageResponse | { error: string }> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://server.brodiz.com/uploadImg', {
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

export  async function handleDeleteUploadImage(imagePath: string): Promise<DeleteImageResponse | { error: string }> {
  try {
    

    const response = await fetch(`https://server.brodiz.com/deleteImage/${imagePath}}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const responseData: DeleteImageResponse = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      return { error: errorData.error || 'Erreur inconnue lors du delete image' };
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return { error: 'Erreur lors de l\'upload.' };
  }
}
