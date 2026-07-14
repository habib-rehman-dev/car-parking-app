import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout'
import { Outlet } from 'react-router-dom';
const Home = () => {
    useEffect(()=>{
        // window.location.href = '/';

    },[])
    return (
        <Layout>
        
            <Outlet/>

        </Layout>
    )
}

export default Home
