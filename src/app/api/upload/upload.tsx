import { NextRequest, NextResponse } from "next/server";
import {join} from  'path'
import { writeFile } from "fs/promises";

export async function POST(request: NextRequest){
    const data = await request.formData();
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