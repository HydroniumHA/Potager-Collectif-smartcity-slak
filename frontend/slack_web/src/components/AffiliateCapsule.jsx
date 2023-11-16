import React from 'react'

import Card from './Card'

import {FaTrash, FaCrown} from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge';

const AffiliateCapsule = ({affiliate, className}) => {

    const cardClasses = twMerge('w-full h-12 flex flex-row items-center pb-6 justify-between', className);

    if(affiliate.role === 'affiliate') 
        return (
            <Card className={cardClasses}>
                <span className='font-medium text-gray1'>{affiliate.name} {affiliate.firstName}</span>
                <div className='flex'>
                    <FaCrown className='fill-[#69696993] hover:fill-green1 mr-2 transition-colors duration-150 scale-110'/>
                    <FaTrash className='fill-highlight_red hover:fill-red transition-colors duration-150 scale-110'/>
                </div>
            </Card>
        );
    
    else return (
        <Card className={cardClasses}>
            <span className='font-medium text-gray1'>{affiliate.name} {affiliate.firstName}</span>
            <div className='flex'>
                <FaCrown className='fill-[#ffc400] scale-125'/>
            </div>
        </Card>
    );
}
 
export default AffiliateCapsule;