import React from 'react'

import BasicLogo from '../components/BasicLogo'
import Copyright from '../components/Copyright'
import Navbar from '../components/Navbar';
import '../css/core.css'

import ProtectedContentSecurity from '../components/ProtectedContentSecurity';

import { twMerge } from 'tailwind-merge';

//homeImage is only used in the home page
//
//To keep the same layout across different pages we choose to pass the element
//in a props and render it if it is not null

//If homeImage is null then we render the navbar instead

const Layout = ({children, homeImage, className, authRequired}) => {
    return (
        <div className='bg' >
            <main className='content'>
                <BasicLogo/>
                {homeImage &&
                    <>
                        {homeImage}
                        <div className='flex text-xl mb-16 space-x-10 h-36'></div>
                    </>
                
                } 
                {
                    !homeImage &&
                    <Navbar/>
                }
                
                <ProtectedContentSecurity authRequired={authRequired}>
                    <div className={twMerge("flex flex-col justify-center ps-20 pe-20 h-[70%] mb-2", className)}>        
                        {children}
                    </div>
                </ProtectedContentSecurity>
                
                
                
                <Copyright/>
            </main>  
            
        </div>  
    );
}
 
export default Layout;