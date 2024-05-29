import type { NextApiRequest, NextApiResponse } from 'next';

export type UploadImageResponse = {
  imagePath: string;
};

export default async function handleUploadImage(file: File): Promise<UploadImageResponse | { error: string }> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('http://server.bordiz.com/uploadImg', {
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

