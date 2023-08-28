import styles from './commandes.module.css'

function  Commandes(user:any){

    return (
        <div className={styles.Container}>
            <h1> Mes Commandes</h1>

            <div className={styles.articles}>
                <div className={styles.imgContainer}></div>
                <div className={styles.descripContainer}><p>Nom de l</p></div>
                <div className={styles.buttonContainer}><span className={styles.button}>Voir la commande</span>
                <span className={styles.button}>Acheter un modèles similaires</span></div>
            </div>
        </div>
    )
}


export default Commandes;