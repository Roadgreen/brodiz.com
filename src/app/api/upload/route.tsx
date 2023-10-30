import { NextRequest,NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile } from 'fs/promises';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method === 'POST') {
      const data = await req.formData();
      const file = data.get('file') as File;

      if (!file) {
      return false
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Vous pouvez ajuster le chemin où l'image sera stockée dans le dossier "public"
      const imagePath = join('public', 'img', 'uploads', file.name);

    const upload =  await writeFile(imagePath, buffer);
    console.log(upload);

      return NextResponse.json({success: true,path: imagePath});
    } else {
    }
  } catch (error) {
    console.error(error);
  }
}
