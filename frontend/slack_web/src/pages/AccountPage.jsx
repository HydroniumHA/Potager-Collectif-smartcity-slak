import React, { useRef } from 'react'
import '../css/core.css'
import axios from 'axios';
import Layout from './Layout';
import CapsuleButton from '../components/CapsuleButton';
import Card from '../components/Card';
import InputField from '../components/InputField';
import {useTranslation} from 'react-i18next'

const AccountPage = () => {
    const {i18n,t} = useTranslation();

    const languageChange = (event) => {
        const newLanguage = event.target.value;
        i18n.changeLanguage(newLanguage);
      };

    return (
        <Layout>
           <Card className="relative w-full h-full flex flex-col flex-wrap items-center">
                <select 
                className="absolute top-0 right-0 mt-6 mr-6 bg-bg_gray w-1/6 h-8 focus:outline-none rounded-xl px-5 text-xl text-gray2 shadow-[inset_-5px_-5px_4px_0px_rgba(255,255,255,.5),inset_5px_5px_4px_0px_rgba(70,70,70,.12)]" 
                name="language" 
                id="language-select"
                onChange={languageChange}>
                    <option value="fr">{t('Francais')}</option>
                    <option value="en">{t('English')}</option>
            </select>

           <InputField className="w-1/4 mt-16" disabled={true}></InputField>
            <div className="mt-3">créé le [date de création]</div>

            <div className="mt-20 w-full flex flex-col items-center space-y-6">
                <div className="flex w-1/2">
                    <div className="">
                        <p>Email :</p>
                    </div> 
                    <div className="text-green2 mx-auto">
                        <p>adrian@slak.com</p>
                        </div>
                </div>
                <div className='flex w-1/2'>
                    <div className=''>
                        <p>Mot de passe :</p>
                    </div> 
                    <div className='mx-auto'>
                        <p>*******</p>
                    </div>
                </div>
            </div>
            
            <span className="mt-52">
                <CapsuleButton title="Se deconnecter" />
            </span>

        </Card>
        </Layout>
    );
}

export default AccountPage;

/* 
    <button onClick={() => i18n.changeLanguage("en")}> english </button>
    <button onClick={() => i18n.changeLanguage("fr")}> francais </button>
*/