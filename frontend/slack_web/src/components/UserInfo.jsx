import React from "react";
import { useRef } from "react";

import Card from '../components/Card'
import InputField from '../components/InputField'
import CapsuleButton from "./CapsuleButton";

const UserInfo = ({setUserInfoCard, setCardPage, translation}) => {

    const email = useRef();
    const firstName = useRef();
    const lastName = useRef();

    function switchPage() {
        setUserInfoCard({email: email.current.value, firstName: firstName.current.value, lastName: lastName.current.value})
        setCardPage(2);
    }

    return (
        <Card className="w-4/6 mx-auto justify-self-center flex">
            <div className='flex flex-col items-center mx-auto'>
                <span className='text-xl font-semibold pb-8'>{translation("register.register")}</span>
                <span className='pb-2'>{translation("register.email-address")}</span>
                <InputField className='w-128' ref={email}></InputField>
                <span className='pb-2 pt-6'>{translation("register.first-name")}</span>
                <InputField className='w-128' ref={firstName}></InputField>
                <span className='pb-2 pt-6'>{translation("register.last-name")}</span>
                <InputField className='w-128' ref={lastName}></InputField>
                <span className='pt-10'></span>
                <CapsuleButton className='h-9 w-44 text-base text-black' title={translation("register.next")} onClick={() => switchPage()}></CapsuleButton>  
            </div>
            <span>1/2</span>
        </Card>
    )
}

export default UserInfo;