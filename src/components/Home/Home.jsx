import React from 'react';
import Banner from '../Pages/Banner';
import HomeData from '../Pages/HomeData';

const Home = () => {
    return (
        <div className='max-w-5xl mx-auto mt-5 mb-5'>
            <Banner></Banner>
             <HomeData></HomeData>
        </div>
    );
};

export default Home;