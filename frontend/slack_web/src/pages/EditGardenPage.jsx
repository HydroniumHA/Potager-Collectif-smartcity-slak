import React, { useEffect, useRef, useState } from 'react'


import json from "../tests/data.json"

import Layout from './Layout';
import InputField from '../components/InputField';
import Container from '../components/Container';
import PlanViewer from '../components/PlanViewer';
import ScrollView from '../components/ScrollView';
import AffiliateCapsule from '../components/AffiliateCapsule';
import ZoneCapsule from '../components/ZoneCapsule';
import Pagination from '../components/Pagination';
import { twMerge } from 'tailwind-merge';

import Modal from '../components/Modal'
import Card from '../components/Card';

const affiliates = [
    {
        userID: 'fddsfdsfsdfsdf',
        name: 'Logan',
        firstName: 'Staelens',
        role: 'admin',
        affiliationID: 0
    },
    {
        userID: 'fddsfdsfsdfsdf',
        name: 'Adrian',
        firstName: 'Grosu',
        role: 'affiliate',
        affiliationID: 1
    },
    {
        userID: 'fddsfdsfsdfsdf',
        name: 'Emelyne',
        firstName: 'DEthinne',
        role: 'affiliate',
        affiliationID: 2
    },
    {
        userID: 'fddsfdsfsdfsdf',
        name: 'Killian',
        firstName: 'Charlier',
        role: 'affiliate',
        affiliationID: 3
    },
    {
        userID: 'fddsfdsfsdfsdf',
        name: 'Benjamin',
        firstName: 'Georges',
        role: 'affiliate',
        affiliationID: 4
    },
    {
        userID: 'fddsfdsfsdfsdf',
        name: 'Simon',
        firstName: 'Georges',
        role: 'affiliate',
        affiliationID: 4
    },
];

const zones = [
    {
        name:'Carrot'
    },
    {
        name:'Beetroot'
    }
];



const EditGardenPage = () => {
  
    const saveButtonRef = useRef();
    const [currentZoneSelected, setCurrentZoneSelected] = useState(2);
    const [xCount, setXCount] = useState(undefined); 
    const [yCount, setYCount] = useState(undefined); 
    const [content, setContent] = useState(undefined); 

    const [affiliationCurrentPage, setAffiliationCurrentPage] = useState(1);
    const [animationAffiliationControllerClassName, setAnimationAffiliationControllerClassName] = useState(''); 
   
    const [zoneCurrentPage, setZoneCurrentPage] = useState(1);
    const [animationZoneControllerClassName, setAnimationZoneControllerClassName] = useState(''); 

    const [modalAddressOpened, setModalAddressOpened] = useState(false);


    useEffect(()=> {
        setTimeout(() => {
            setXCount(json.meta.sizeX);
            setYCount(json.meta.sizeY);
            setContent(json.content);

        }, 1000);
    }, []);

    const onSave = (jsonString) => {
        console.log(JSON.parse(jsonString));
    }

    const changePage = async (stateClassNameFn, statePageFn, pageIndex) => {
        stateClassNameFn('opacity-0');
        await new Promise(res => setTimeout(res, 400));
        statePageFn(pageIndex);
        stateClassNameFn('');
    }


    return (
        <>
            <Layout className='justify-start ps-28 pe-28'>
                <span className='w-full text-4xl font-medium text-gray1'>Editor Mode</span>
                <ScrollView className='flex flex-row flex-wrap px-0 mt-3'>
                    <div className='flex flex-row justify-between px-4'>
                        <div className='w-2/5 flex flex-row flex-wrap space-y-6'>
                            <span className='font-medium text-3xl text-gray1'>Garden</span>
                            <label htmlFor="#garden_name" className='ms-2 w-full'>Name</label>
                            <InputField id='#garden_name' className='w-full'/>
                            <label htmlFor="#address" className='ms-2'>Address</label>
                            <InputField id='#address' className='w-full h-36'disabled={true} onClick={() => setModalAddressOpened(true)}/>
                            <span className='font-medium text-xl'>Configs</span>
                            <div className='w-full flex flex-row flex-wrap items-center'>
                                <label htmlFor="#sizeX" className='me-5'>X</label>
                                <InputField id='#sizeX' className='w-28 text-center'/>
                                <span className='ms-5'>m</span>
                            </div>
                            <div className='w-full flex flex-row flex-wrap items-center'>
                                <label htmlFor="#sizeY" className='me-5'>Y</label>
                                <InputField id='#sizeY' className='w-28 text-center'/>
                                <span className='ms-5'>m</span>
                            </div>
                        </div>

                        <section className='w-2/5 h-[500px] space-y-4'>
                            <span className='font-medium text-3xl text-gray1'>Affiliates</span>
                            <div className={twMerge('transition-opacity opacity-100 ease-in duration-400 w-full h-[350px] flex flex-col space-y-6', animationAffiliationControllerClassName)}>
                            {
                                affiliates.slice((affiliationCurrentPage - 1) * 5, ((affiliationCurrentPage - 1) * 5) + 5).map((affiliate, index) => 
                                    <AffiliateCapsule key={index} affiliate={affiliate}/>
                                )
                            }
                            </div>
                            <Pagination rows={5} itemCount={affiliates.length} currentPageState={[affiliationCurrentPage, (pageIndex) => changePage(setAnimationAffiliationControllerClassName, setAffiliationCurrentPage, pageIndex)]}/>
                        </section>
                        
                    </div>

                    <section className='flex flex-row flex-wrap w-full mt-20 px-4 justify-between'>   
                        <div className='w-full flex flex-row flex-wrap justify-between mb-6'>
                            <span className='font-medium text-3xl text-gray1 w-1/2'>Plan</span>                   
                            <span className='font-medium text-3xl text-gray1 w-2/5'>Zones</span>
                        </div>
                        <Container className='w-1/2 aspect-video focus-within:border-4 focus-within:border-green1 '>
                            <PlanViewer editable={true} contentState={[content, setContent]} xCount={xCount} yCount={yCount} saveButtonRef={saveButtonRef} onSaveHandler={onSave} currentZoneSelected={currentZoneSelected}/>
                        </Container>
                        
                        <section className='w-2/5 h-[300px]'>
                            <div className={twMerge('transition-opacity opacity-100 ease-in duration-400 w-full h-[350px] flex flex-col space-y-6', animationZoneControllerClassName)}>
                            {
                                zones.slice((zoneCurrentPage - 1) * 5, ((zoneCurrentPage - 1) * 5) + 5).map((zone) => 
                                    <ZoneCapsule zone={zone}/>
                                )
                            }
                            </div>
                            <Pagination rows={5} itemCount={zones.length} currentPageState={[zoneCurrentPage, (pageIndex) => changePage(setAnimationZoneControllerClassName, setZoneCurrentPage, pageIndex)]}/>
                        </section>
                    </section>
                    
                </ScrollView>
            </Layout>     
            <button ref={saveButtonRef} className='z-20 absolute bottom-8 right-8 bg-white rounded-5xl w-16 h-16 max-2xl:bg-green1'>Save</button>
        
            <Modal showModal={modalAddressOpened} onCloseRequested={() => setModalAddressOpened(false)} className='flex-row bg-bg_gray'>
                <div className='w-full border-b-[1px] border-green1/50'>
                    <span className='pl-8 w-full text-2xl font-bold'>Address</span>
                </div>
                <div className='w-full flex flex-row flex-wrap items-center mt-4 justify-between'>
                    <label htmlFor="#street" className='me-5 font-medium text-gray1 text-lg'>Street</label>
                    <InputField id='#street' className='w-120 text-center'/>
                </div>
                <div className='w-full flex flex-row flex-wrap items-center mt-4 justify-between'>
                    <label htmlFor="#street" className='me-5 font-medium text-gray1 text-lg'>City</label>
                    <InputField id='#street' className='w-120 text-center'/>
                </div>
                <div className='w-full flex flex-row flex-wrap items-center mt-4 justify-between'>
                    <label htmlFor="#street" className='me-5 font-medium text-gray1 text-lg'>Postcode</label>
                    <InputField id='#street' className='w-120 text-center'/>
                </div>

                <div className='w-full flex flex-row justify-end space-x-6 mt-8'>
                    <button className='w-20 rounded-xl bg-green3 text-white font-medium p-2'>
                        Save
                    </button>

                    <button className='w-20 rounded-xl bg-red/80 text-white font-medium p-2'>
                        Close
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default EditGardenPage;