import Stripe from 'stripe'
import { NextResponse } from 'next/server';


export  async function POST(request:Request,response:Response){

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{apiVersion: '2022-11-15',})
    const res = await request.json();
    console.log(res , 'ici normalement tu as le request',request);
    if(request.method === 'POST'){
        try {
            console.log('on rentre dans le try');
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                  shipping_options: [
                    {
                      shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                          amount: 0,
                          currency: 'eur',
                        },
                        display_name: 'Envoie gratuit',
                        delivery_estimate: {
                          minimum: {
                            unit: 'business_day',
                            value: 7,
                          },
                          maximum: {
                            unit: 'business_day',
                            value: 10,
                          },
                        },
                      },
                    },
                    {
                      shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                          amount: 1000,
                          currency: 'eur',
                        },
                        display_name: 'Envoie Rapide',
                        delivery_estimate: {
                          minimum: {
                            unit: 'business_day',
                            value: 2,
                          },
                          maximum: {
                            unit: 'business_day',
                            value: 3,
                          },
                        },
                      },
                    },
                  ],
                line_items: 
                    res,
                mode: 'payment',
                success_url: `http://localhost:3000/confirmation?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:3000/confirmation?canceled=true`,
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