import React, { useRef } from "react";

import Card from '../components/Card'
import InputField from '../components/InputField'

const PasswordInfo = ({setPasswordInfoCard, setCardPage, translation}) => {
    const password = useRef();
    const verifyPassword = useRef();

    function createUser () {
        setPasswordInfoCard({password: password.current.value, verifyPassword: verifyPassword.current.value});
        setCardPage(1);
    }

    return (
        <Card className="w-4/6 mx-auto justify-self-center flex">
            <div className='flex flex-col items-center mx-auto'>
                <span className='text-xl font-semibold pb-8'>{translation("register.register")}</span>
                <span className='pb-2'>{translation("register.password")}</span>
                <InputField className='w-128' ref={password}></InputField>
                <span className='pb-2 pt-6'>{translation("register.verify-password")}</span>
                <InputField className='w-128' ref={verifyPassword}></InputField>
                <span className='pt-10'></span>
                <CapsuleButton className='h-9 w-44 text-base text-black' title={translation("register.create")} onClick={() => createUser()}></CapsuleButton>  
            </div>
            <span>2/2</span>
        </Card>
    )
}

export default PasswordInfo;