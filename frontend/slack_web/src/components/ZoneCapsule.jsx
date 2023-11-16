import React from 'react'

import Card from './Card'

import {FaCrown} from 'react-icons/fa6'


const ZoneCapsule = ({zone, currentZoneState:[currentZoneSelected, setCurrentZoneSelected]}) => {

    const onClick = () => {
        if(currentZoneSelected === zone.index)
            setCurrentZoneSelected(-1);
        else
            setCurrentZoneSelected(zone.index);
    }

    if(currentZoneSelected === zone.index) {
        return  (
            <Card className='w-full h-12 flex flex-row items-center pb-6 justify-between bg-highlight_green' onClickHandler={onClick}>
                <div className='w-1/2 flex justify-between'>
                    <span className='font-bold text-green1 mr-10 w-10 text-center'>{zone.index}</span>
                    <span className='font-medium text-gray1 text-start w-48'>{zone.name}</span>
                </div>
                <div className='flex'>
                    <FaCrown className='fill-[#ffc400] scale-125'/>
                </div>
            </Card>
        );
    }
    else return (
        <Card className='w-full h-12 flex flex-row items-center pb-6 justify-between' onClickHandler={onClick}>
            <div className='w-1/2 flex justify-between'>
                <span className='font-bold text-green1 mr-10 w-10 text-center'>{zone.index}</span>
                <span className='font-medium text-gray1 text-start w-48'>{zone.name}</span>
            </div>
            <div className='flex'>
                <FaCrown className='fill-[#ffc400] scale-125'/>
            </div>
        </Card>
    );
}
 
export default ZoneCapsule;