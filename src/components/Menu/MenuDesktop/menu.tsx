'use client'
import { Oswald } from 'next/font/google';
import logo from '../../../../public/img/logo/Logo1.png'
import Image from 'next/image';
import style  from './menu.module.css';
import Link from 'next/link';
import { useState,useEffect } from 'react';
import { useGlobalContextCart } from "@/app/Context/cartContext";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { usePathname } from 'next/navigation'
import useWindowSize from '@/components/Function/usewindowsize';
const oswald = Oswald({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
});

export default function DesktopMenu(Text:any){
    const {cartItem,cartCheck} = useGlobalContextCart();
    const text = Text.Text.DesktopMenu;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartNumber,setCartNumber] = useState(0);
    const pathname = usePathname();
    console.log(pathname,useWindowSize());
    const windowSize = useWindowSize();

    useEffect(()=>{
      const numberQuantity = cartCheck()
      console.log('cartItem',cartItem);
      if(numberQuantity){
        setCartNumber(numberQuantity);
      }
    },[cartCheck])

    return (
        <div className={`${oswald.className} ${style.containerMenu}`}>
            <ul className={style.ul}><Link className={pathname === '/'? style.active : style.Liens} href={'/'}>{text.a}</Link>
            <Link className={pathname === '/creations'? style.active : style.Liens} href={'/creations'}>{text.b}</Link>
            <Link className={pathname === '/customisations'? style.active : style.Liens} href={'/customisations'}>{text.c}</Link>
            </ul>
            <div className={style.containerImg}> 
            <Image className={style.img} alt={`logo représentant l'entreprise Brodiz.com`} src={logo} fill/> 
            </div>
            <ul className={style.ul}>
            <Link className={pathname === '/blog'? style.active : style.Liens} href={'/blog'}>{text.d}</Link>
            <Link className={pathname === '/account'? style.active : style.Liens} href={'/account'}>{text.e}</Link>
            <Link className={pathname === '/panier'? style.active : style.Liens} href={'/panier'}>{text.f}</Link>
            {cartNumber > 0 ? <div className={style.numberMenu}><p>{cartNumber}</p></div> : ''}
            </ul>
            {isMenuOpen ? (
  <>
    <AiOutlineClose className={style.menuIcon} onClick={() => setIsMenuOpen(false)} />
    <div style={{height:windowSize.height}} className={`${style.mobileMenu} ${style.open}`}>
    <ul className={style.ulMobile}>
<li><Link onClick={() => setIsMenuOpen(false)} className={pathname === '/'? style.active : style.Liens} href={'/'}>{text.a}</Link></li>
<li><Link onClick={() => setIsMenuOpen(false)} className={pathname === '/creations'? style.active : style.Liens} href={'/creations'}>{text.b}</Link></li>
<li><Link onClick={() => setIsMenuOpen(false)} className={pathname === '/customisations'? style.active : style.Liens} href={'/customisations'}>{text.c}</Link></li>
<li><Link onClick={() => setIsMenuOpen(false)} className={pathname === '/blog'? style.active : style.Liens} href={'/blog'}>{text.d}</Link></li>
<li><Link onClick={() => setIsMenuOpen(false)} className={pathname === '/account'? style.active : style.Liens}  href={'/account'}>{text.e}</Link></li>
<li><Link onClick={() => setIsMenuOpen(false)} className={pathname === '/panier'? style.active : style.Liens} href={'/panier'}>{text.f}</Link></li>
</ul>
    </div>
  </>
) : (
<AiOutlineMenu className={style.menuIcon} onClick={() => setIsMenuOpen(true)} />
  
)}

        </div>
    )
}



