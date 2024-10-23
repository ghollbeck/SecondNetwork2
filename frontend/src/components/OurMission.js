// src/components/OurMission.js
import React from 'react';

const OurMission = () => {
  return (
    <div className="mission-container w-full">
      <h1 className="text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-10 w-full mt-28">THE MISSION</h1>
      
      {/* Removed the <p> tag that was incorrectly wrapping block elements */}
      <div className="text-sm md:text-xl lg:text-lg xl:text-xl">
        <div className="text-justify w-full md:w-full">
          {/* Your mission statement or content goes here */}
          <p>
            {/* Example content */}
            Our mission is to empower individuals by providing tools and resources that enhance their emotional intelligence and interpersonal skills. Through engaging interactions and insightful feedback, we aim to foster personal growth and professional development.
          </p>
        </div>
        
        <br /><br />

        <h2 className="text-2xl font-bold mt-8 mb-4">Future ideas:</h2>
        <ul className="list-disc space-y-2 ml-[2rem]">
          <li>SaaS for recruitment interviews for companies or to train their employees in soft skills.</li>
          <li>Machine-readable database for social scientists to understand how people argue and think.</li>
          <li>LeetCode for the social realm, users could gain credentials for a metric not represented yet.</li>
          <li>Simulator for Model United Nations and high-level diplomatic discourse.</li>
        </ul>
      </div>
    </div>
  );
};

export default OurMission;
