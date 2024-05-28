import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });
    const res = await request.json();
    console.log(res, 'ici normalement tu as le request', request);

    if (request.method === 'POST') {
        try {
            console.log('on rentre dans le try');
            const session = await stripe.checkout.sessions.retrieve(res.id, {
                expand: ['line_items']
            });

            console.log('On est dans le try');
            console.log(session.url);

            const URL: any = session.url;
            console.log(session.shipping_cost, session.shipping_details, session.shipping_options);

      

            const Head: any = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Request-Method": ["POST", "GET", "OPTIONS"],
            };

            return NextResponse.json({
                shipping_cost: session.shipping_cost?.amount_total,
                total_product_price: session.amount_total ? session.amount_total / 100 : 0 
            }, Head);
        } catch (err: any) {
            console.log('err du fichier route.tsx', err.message);
            return new Response(err.message, { status: 500 });
        }
    }
}
