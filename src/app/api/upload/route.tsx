import {join} from  'path'
import { writeFile } from "fs/promises";
import { NextResponse } from 'next/server';

export async function POST(request: Request,Response:NextResponse){
    console.log(request);//TODO Problème avec la requette erreur 500 trouver le problème peut etre du au fichier formdata
    const data = await request.formData();
    console.log('dans le post api',data);
    const file:File|null = data.get('file') as unknown as File
    if(!file){
        return NextResponse.json({success: false});
    }
const bytes = await file.arrayBuffer()
const buffer = Buffer.from(bytes);

const path = join('/public/img/product', file.name);
await writeFile(path,buffer);
return NextResponse.json({sucess:true,path});

}