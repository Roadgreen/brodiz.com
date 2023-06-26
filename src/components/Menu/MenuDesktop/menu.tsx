'use client'
import { Oswald } from 'next/font/google';
import logo from '../../../../public/img/logo/Logo1.png'
import Image from 'next/image';
import style  from './menu.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const oswald = Oswald({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
});

export default function DesktopMenu(Text:any){
    const text = Text.Text.DesktopMenu;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={`${oswald.className} ${style.containerMenu}`}>
            <ul className={style.ul}><Link href={'/'}>{text.a}</Link>
            <Link href={'/'}>{text.b}</Link>
            <Link href={'/'}>{text.c}</Link>
            </ul>
            <div> 
            <Image className={style.img} alt={`logo représentant l'entreprise Brodiz.com`} src={logo} fill/> 
            </div>
            <ul className={style.ul}>
            <Link href={'/'}>{text.d}</Link>
            <Link href={'/'}>{text.e}</Link>
            <Link href={'/'}>{text.f}</Link>
            </ul>
            {isMenuOpen ? (
  <>
    <AiOutlineClose className={style.menuIcon} onClick={() => setIsMenuOpen(false)} />
    <div className={`${style.mobileMenu} ${style.open}`}>
    <ul>
<li><Link href={'/'}>{text.a}</Link></li>
<li><Link href={'/'}>{text.b}</Link></li>
<li><Link href={'/'}>{text.c}</Link></li>
<li><Link href={'/'}>{text.d}</Link></li>
<li><Link href={'/'}>{text.e}</Link></li>
<li><Link href={'/'}>{text.f}</Link></li>
</ul>
    </div>
  </>
) : (
  <AiOutlineMenu className={style.menuIcon} onClick={() => setIsMenuOpen(true)} />
)}

        </div>
    )
}



