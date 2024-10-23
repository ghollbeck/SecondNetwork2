// src/components/Home.js
import React from 'react';
import DontFuckUp from './DontFuckUp';
import LandingPage from './LandingPage';
import OurMission from './OurMission';

const Home = () => {
  return (
    <div>
      <div className="px-0 normalcontainer">
        <DontFuckUp /> {/* Use the DontFuckUp component */}
      </div>
      <div className="App">
        <div className="bg-gradient-to-r from-white to-pink-100">
          <div className="normalcontainer">
            <LandingPage />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-white">
          <div className="pb-10 normalcontainer">
            <OurMission />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
