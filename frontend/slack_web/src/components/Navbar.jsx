import React from 'react'

import '../css/core.css'
import SilhouetteSVG from '../../assets/images/silhouette.svg'
import {useTranslation} from 'react-i18next'


const Navbar = () => {
    const {i18n,t} = useTranslation();

    return (
        <nav className='flex justify-end items-end pt-20 h-auto mr-28 space-x-10 mb-16 text-gray1 font-semibold text-xl '>
            <span>
            {t('components.searchbar.placeholder')}
            </span>
            <span>
            {t('components.navbar.my-gardens')}

            </span>

            <img src={SilhouetteSVG} alt="Silhouette" />
        </nav>
    );
}
 
export default Navbar;