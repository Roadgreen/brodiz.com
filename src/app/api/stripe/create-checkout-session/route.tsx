
import Stripe from 'stripe'
import { NextResponse } from 'next/server';

export  async function POST(request:Request,response:Response){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{apiVersion: '2022-11-15',})
    const res = await request.json();
    console.log(res);
    if(request.method === 'POST'){
        try {
            console.log('on rentre dans le try');
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    res
                ],
                mode: 'payment',
                success_url: 'http://localhost:3000/?success=true',
                cancel_url: `http://localhost:3000/?canceled=true`,
                automatic_tax:{enabled:false}
            });
            console.log('On est dans le try')
            console.log(session.url);
            const URL:any= session.url;
            const Head:any = {
                "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": ["POST", "GET", "OPTIONS"],
            }

            return await  NextResponse.json({URL:session.url},Head)
                    } catch (err:any){
            console.log('err du fichier route.tsx',err.message)
        return new Response(err,{status:500})
        }
    }
}