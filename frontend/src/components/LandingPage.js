// src/components/LandingPage.js
import React from 'react';

const LandingPage = ({ convo_select, setPromptShow }) => {
  const base = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  console.log(process.env);

  return (
    <div className="w-full">
      <div>
        <div>
          {/* Corrected `classname` to `className` */}
          <div className="">

            <h2 className="text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-10 text-left">
              How it works
            </h2>
            <div className="text-justify text-sm md:text-xl lg:text-base xl:text-xl">
              A persona will be dynamically created to have a conversation with you.
              You choose a goal, something to attempt to convince them of.
              Once you're done with the conversation, the persona will reflect, and a third-party judge will evaluate the conversation.
              <br /><br />
              Choose a persona you want to have a conversation with. 
              Unlock further characters and levels by showing your EQ and completing at least one of the first 3.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
