import React from 'react';
import Banner from '../Pages/Banner';
import HomeData from '../Pages/HomeData';
import Utilities from '../Pages/Utilities';

const billPromise = fetch('http://localhost:3000/recentBills')
 .then(res => res.json());

const Home = () => {
    return (
        <div className='max-w-5xl mx-auto  mb-5'>
            <Banner></Banner>
            <Utilities></Utilities>
             <HomeData billPromise = {billPromise}></HomeData>
        </div>
    );
};

export default Home;