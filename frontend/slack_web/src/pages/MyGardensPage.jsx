import React, { useState } from 'react'
import {useTranslation} from 'react-i18next'

import { simonGarden } from '../tests/simonGarden';
import { simonAffiliateGardens } from '../tests/simonAffiliateGardens';

import Layout from './Layout';
import ScrollView from '../components/ScrollView';
import Card from '../components/Card';
import CapsuleButton from '../components/CapsuleButton'
import GardenListItem from '../components/GardenListItem';

const MyGardensPage = () => {
    const {t} = useTranslation();

    if (simonGarden.length !== 0) {
        return (
            <Layout>
                <span className='w-full text-4xl font-medium text-gray1'>Mon potager</span>
                <div className='flex flex-row pb-10 pt-8 px-8'>
                    <GardenListItem key={simonGarden[0].id} garden={simonGarden[0]} isEditable={true}/>
                </div>
                <span className='w-full text-4xl font-medium text-gray1'>Mes affiliations</span>
                <div className='flex flex-row h-80 pb-10'>
                    {
                        simonAffiliateGardens.length === 0 ? (
                            <div className='w-full h-full flex flex-row justify-center items-center pt-8'>
                                Vous n'avez pas de potagers affiliés
                            </div>
                        ) : (
                            <ScrollView className='px-8 pt-8'>
                            {
                                //TODO Make request to backend to get user's affiliate gardens ->
                                simonAffiliateGardens.map((garden) => <GardenListItem key={garden.id} garden={garden}/>)
                            }
                            </ScrollView>
                        )
                    }
                </div>  
        </Layout>
        )
    }

    return (
        <Layout className='flex-row ps-10 pe-10'>
            <div className='flex-col flex w-1/3 px-8'>
                <Card className='space-y-12 h-96 w-full flex flex-col justify-center'>
                    <span className='font-bold text-xl text-center'>{t('browse.left.create-garden.title')}</span>
                    <p className='text-normal font-normal text-justify pb-8'>{t('browse.left.create-garden.body1')} <br /> {t('browse.left.create-garden.body2')}</p>
                    <CapsuleButton title={t('browse.left.create-garden.btn')} className="h-12 w-full text-sm" href="/"/>
                </Card>              
            </div>
            <div className='flex-col flex w-2/3'>
                <span className='w-full text-4xl font-medium text-gray1 ps-8'>Mes affiliations</span>
                    {
                        simonAffiliateGardens.length === 0 ? (
                            <div className='w-full h-full flex flex-row justify-center items-center pt-8'>
                                Vous n'avez pas de potagers affiliés
                            </div>
                        ) : (
                            <ScrollView className='px-8 pt-8'>
                            {
                                //TODO Make request to backend to get user's affiliate gardens ->
                                simonAffiliateGardens.map((garden) => <GardenListItem key={garden.id} garden={garden}/>)
                            }
                            </ScrollView>
                        )
                    }
                </div>  
        </Layout>
    );
}

export default MyGardensPage;