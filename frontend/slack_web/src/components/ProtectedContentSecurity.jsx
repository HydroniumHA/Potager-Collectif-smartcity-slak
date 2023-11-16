import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthProvider';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { BiSolidErrorAlt } from "react-icons/bi";

const ProtectedContentSecurity = ({children, authRequired}) => {
    
    const [timer, setTimer] = useState(3);
    const navigate = useNavigate();
    const {token} = useAuth();

    useEffect(()=> {
        if(authRequired && !token) {
            const intervalID = setInterval(()=> {
                setTimer((timer) => timer-1);
            }, 1000);

            return () => {
                clearInterval(intervalID);
            }
        }
    }, [])

    useEffect(() => {
        if(timer === 0) {
            navigate('/login');
        }
    }, [timer])



    if(authRequired) {
        const {token} = useAuth();

        if(token) {
            return children;
        }
        else {

            return (
                <div className='w-full h-[70%] flex flex-row justify-center items-center'>
                    <Card className='w-4/6 mx-auto flex flex-row flex-wrap h-[400px]'>
                        <div className='w-1/4 flex flex-row flex-wrap items-center border-r-2 border-highlight_red justify-center'>
                            <BiSolidErrorAlt className='fill-[#ff3333df] scale-150 md:text-7xl lg:text-8xl'/>
                        </div>
                        <div className='w-3/4 px-8 flex flex-col justify-around items-center'>
                            <span className='w-full text-center font-black text-gray1 text-2xl'>Vous devez etre connecte pour acceder a cette page.</span>
                            <span className='w-full text-center'>Redirection dans {timer} seccondes</span>
                        </div>
                    </Card>
                </div>
            );
        }
            
    }
    else
        return children;
    
}
 
export default ProtectedContentSecurity;