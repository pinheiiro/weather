import { NextComponentType } from 'next';
import Image from 'next/image';

import style from './Header.module.css';
import weather from '../../assets/tempo.png';

export const Header: NextComponentType = () => {
    return (
        <header className={style.header}>
            <div className={style.menu}>
                <Image
                    src={weather}
                    alt='logo'
                    width={45}
                    height={45}
                />
                <h1>Clima Agora</h1>
            </div>
        </header>
    )
}