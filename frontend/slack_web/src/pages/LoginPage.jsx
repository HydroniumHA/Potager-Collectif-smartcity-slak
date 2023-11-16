import React, { useEffect, useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import {useTranslation} from 'react-i18next'

import Card from '../components/Card'
import Layout from './Layout';
import InputField from '../components/InputField'
import CapsuleButton from '../components/CapsuleButton'
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthProvider';

import { BiSolidErrorAlt } from "react-icons/bi";

const LoginPage = () => {
    const {t} = useTranslation();
    const email = useRef();
    const password = useRef();
    const errorMessageRef = useRef();
    const [pwdReqNeeded, setPwdReqNeeded] = useState(false);
    const navigate = useNavigate();
    const {token, setToken} = useAuth();

    const renderPasswordRequirements = () => {
        if (pwdReqNeeded) {
            return (
                <>
                    <span className=' text-red font-bold mt-6'>{t('login.error-password-title')}</span>
                    <ul className='mb-4 text-red font-medium list-disc list-outside'>
                        <li className='-ml-10'>{t('login.error-password-0')}</li>
                        <li className='-ml-10'>{t('login.error-password-1')}</li>
                        <li className='-ml-10'>{t('login.error-password-2')}</li>
                    </ul>
                </>
            );
        }

        return;
    }

    useEffect(() => {
        if(token) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [])

    const loginIn = async () => {
        
        if(errorMessageRef.current)
            errorMessageRef.current.innerHTML='';


        const emailRegExp = /^[a-zA-Z0-9_.+-âàéèêùûî]+@[a-zA-Z0-9-]+\.[\w-]{2,4}$/g;
        const passwordRegExp = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$/g;



        if(emailRegExp.test(email.current.value)) {
            if(passwordRegExp.test(password.current.value)) {
                if(pwdReqNeeded)
                    setPwdReqNeeded(false);
                axios.post("http://localhost:3001/user/login", {email: email.current.value, password: password.current.value})
                .then((response) => {
                    if(response.data) {
                        setToken(response.data);
                    }
                    toast(t('components.notification.login'), {type:'info'});  
                    navigate('/');
                }) 
                .catch((reason) => {
                    if(reason.code === "ERR_NETWORK") {
                        errorMessageRef.current.innerHTML = t('login.error-timeout');
                    }
                    else
                        if(reason.response.status === 403) 
                            errorMessageRef.current.innerHTML = t('login.error-failed-login');
                });
            
                
            }
            else {
                setPwdReqNeeded(true);
            }
        }
        else {
            errorMessageRef.current.innerHTML = t('login.error-email-invalid');
        }
    }

    if(token) {
        return (
            <Layout>
                <Card className='w-4/6 mx-auto flex flex-row flex-wrap h-[400px]'>
                        <div className='w-1/4 flex flex-row flex-wrap items-center border-r-2 border-highlight_red justify-center'>
                            <BiSolidErrorAlt className='fill-[#ff3333df] scale-150 md:text-7xl lg:text-8xl'/>
                        </div>
                        <div className='w-3/4 px-8 flex flex-col justify-around items-center'>
                            <span className='w-full text-center font-black text-gray1 text-2xl'>Vous etes deja connecte.</span>
                        </div>
                </Card>
            </Layout>
        );
    }
    else return (
        <Layout>
            <Card className="w-4/6 mx-auto justify-self-center flex">
                <div className='flex flex-col items-center mx-auto'>
                    <span className='text-xl font-semibold pb-8'>{t("login.my-account")}</span>
                    <span className='pb-2'>{t("login.email-address")}</span>
                    <InputField className='w-128' ref={email}></InputField>
                    <span className='pb-2 pt-6'>{t("login.password")}</span>
                    <InputField className='w-128' ref={password} type='password'></InputField>
                    {
                        !pwdReqNeeded 
                        &&
                        <span ref={errorMessageRef} className='text-red mb-4 mt-6'></span>
                    }

                    {
                       renderPasswordRequirements()
                    }
                    
                    <CapsuleButton onClick={loginIn} className='h-9 w-44 text-base' title={t("login.connection")}></CapsuleButton>
                    <span className='pb-6 pt-6 text-[0.78rem] font-semibold'>{t("login.text-inscription")}<span className='inline text-green2 hover:text-green1 hover:underline '><Link to='/register'>{t("login.text-register")}</Link></span></span>
                </div>
            </Card>
        </Layout>
    );
}

export default LoginPage;