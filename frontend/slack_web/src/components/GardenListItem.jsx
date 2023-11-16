import React, {useState} from 'react'
import {FaPlus} from 'react-icons/fa6'

import CapsuleCard from './CapsuleCard';
import axios from 'axios';

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const GardenListItem = ({garden, stateContext, isEditable, isJoinable}) => {

    const {t} = useTranslation();

    const GetAddressSplitted = (address) => {
        return address.split("#");
    }

    const ToUpperCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    const ChangeStateContext = () => {
        if (stateContext) {
            if(stateContext.value == garden.id)
                stateContext.set(-1);
            else 
                stateContext.set(garden.id);
        }
    }

    const openGarden = () => {
        console.log(`openGarden ${garden.id}`);
    }

    const editGarden = () => {
        console.log(`editGarden ${garden.id}`);
    }

    const onAddGarden = (e) => {
        e.stopPropagation();
        axios.post("http://localhost:3001/garden/affiliation/join", {gardenID: garden.id})
        .then(()=> {
            toast(t('components.notification.affiliated'), {type:'success'});
        })
        .catch((reason)=> {
            if(reason.request.status === 403) {
                toast(t('components.notification.must_be_logged_in'), {type:'error'});  
            }
            else if(reason.request.status === 409) {
                toast(t('components.notification.already_affiliated'), {type:'error'});  
            }
        })
    }

    const addressSplitted = GetAddressSplitted(garden.address);
    const dateString = ToUpperCase(new Date(garden.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }));

    if(isJoinable && stateContext.value == garden.id) {
        return (
            <article onClick={ChangeStateContext} className="cursor-pointer flex flex-wrap items-end w-full bg-highlight_green mb-12 h-52 rounded-5xl pe-8 ps-8 pb-2 pt-6 shadow-[0px_0px_30px_5px_rgba(49,169,93,.2)]">
                <span className='text-gray1 text-2xl font-bold w-5/6 self-center'>{garden.name}</span>
                <button className='ml-auto w-12 h-12 rounded-5xl bg-green1 self-center flex items-center justify-center' onClick={(e) => onAddGarden(e)} ><FaPlus color='#fff' className='text-2xl' /></button>
                <div className='text-gray1 w-full -mt-6 self-center text-base font-normal'>{addressSplitted.map((a, index) => {return(<span key={index}>{a}<br/></span>);})}</div>
                <span className='text-black text-start w-1/2 font-medium text-sm'>{dateString}</span><span className='text-gray1 text-end w-1/2 font-medium text-sm'>{garden.id}</span>
                
            </article>
        );
    }
    else {
        return (
           <CapsuleCard onClickHandler={isJoinable ? ChangeStateContext : openGarden} gardenName={garden.name} meaningAddress={addressSplitted[1]} gardenID={garden.id} isEditable={isEditable} onEditClick={editGarden}/>
        );
    }
}
  
export default GardenListItem;