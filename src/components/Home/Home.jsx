import React from 'react';
import Banner from '../Pages/Banner';
import HomeData from '../Pages/HomeData';
import Utilities from '../Pages/Utilities';
import Features from '../Pages/Features';

const billPromise = fetch('https://bill-management-db-api.vercel.app/recentBills')
 .then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner></Banner>
        <div className='max-w-7xl mx-auto  mb-5'>
            
            <Utilities></Utilities>
            <Features></Features>
             <HomeData billPromise = {billPromise}></HomeData>
        </div>
     </div>
            
        

    );
};

export default Home;