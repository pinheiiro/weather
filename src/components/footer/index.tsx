import { NextComponentType } from 'next';
import style from './Footer.module.css';

export const Footer: NextComponentType = () => {
    return (
        <footer className={style.footer}>
            <h2>
                Desenvolvido por
                <a 
                    className={style.link} 
                    href="https://pinheiro.vercel.app/" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Gabriel Pinheiro
                </a>
            </h2>
        </footer>
    )
}