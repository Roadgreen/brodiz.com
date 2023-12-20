import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile } from 'fs/promises';

export default async function post(req: NextRequest, res: NextResponse): Promise<void | NextResponse> {
  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const file = data.get('file') as File;

      if (!file) {
        return NextResponse.json({ error: 'No file provided' });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Adjust the path where the image will be stored in the "public" folder
      const imagePath = join('public', 'img', 'uploads', file.name);

      await writeFile(imagePath, buffer);

      console.log('File uploaded:', imagePath);

      return NextResponse.json({ success: true, path: imagePath });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle other HTTP methods if needed
    return  // Method Not Allowed
  }
}
