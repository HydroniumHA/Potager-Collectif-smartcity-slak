import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import {useTranslation} from 'react-i18next';

import UserInfo from '../components/UserInfo';
import PasswordInfo from "../components/PasswordInfo";
import Layout from "./Layout";

const RegisterPage = () => {
    const {t} = useTranslation();
    const [currentCard, setCurrentCard] = useState(1);
    const [userInfoCard, setUserInfoCard] = useState({});
    const [passwordInfoCard, setPasswordInfoCard] = useState({});

    return (
        <Layout>
            {currentCard === 1 ? (
                <UserInfo 
                    setUserInfoCard={setUserInfoCard}
                    setCardPage={setCurrentCard} 
                    translation={t}
                />
            ) : (
                <PasswordInfo
                    setPasswordInfoCard={setPasswordInfoCard}
                    setCardPage={setCurrentCard} 
                    translation={t}
                />
            )}
        </Layout>
    );
}

export default RegisterPage;