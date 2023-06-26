import React from 'react'
import styles from './footer.module.css'
import Link from 'next/link'

export default function Footer(Text:any) {
  const text = Text.Text.Footer
  const textMenu = Text.Text.DesktopMenu;
  return (
    <div className={styles.container}>
<div><h3>{text.a}</h3>
<form action="/send-data-here" method="post">
  <input type="text" id="first" name="first" placeholder={text.b}/>
  <button type="submit">{text.c}</button>
</form>
</div>
<div>
  <div><h4>{text.d}</h4>
  <Link href={'/'}>{textMenu.a}</Link>
  <Link href={'/'}>{textMenu.b}</Link>
  <Link href={'/'}>{textMenu.c}</Link>
  <Link href={'/'}>{textMenu.d}</Link>
  <Link href={'/'}>{textMenu.e}</Link>
  </div>
  <div><h4>{text.e}</h4>
  <Link href={'/'}>{text.f}</Link>
  <Link href={'/'}>{text.g}</Link>
  <Link href={'/'}>{text.h}</Link>
  <Link href={'/'}>{text.i}</Link>
  </div>
  <div><h4>{text.e}</h4>
  <Link href={'/'}>{textMenu.a}</Link>
  <Link href={'/'}>{textMenu.b}</Link>
  <Link href={'/'}>{textMenu.c}</Link>
  <Link href={'/'}>{textMenu.d}</Link>
  <Link href={'/'}>{textMenu.e}</Link>
  </div>
</div>
<div><h4>© 2023 Brodiz</h4></div>
    </div>
  )
}
