import React, { useState, useRef } from 'react';
import LandingPage from './components/LandingPage';

import DontFuckUp from './components/DontFuckUp';

import './index.css'; // Adjust the path as necessary
import OurMission from './components/OurMission';
import Footer from './components/Footer';


function App() {
 


  return (
    <div classname="">
    <div className= "px-0 normalcontainer">
    <DontFuckUp /> {/* Use the DontFuckUp component */}
  </div>
    <div className="App bg-gradient-to-r from-white-100 to-purple-300">
      
      
      
      
    

      {/* bg-gradient-to-r from-violet-200 to-pink-200 */}

      <div className="App bg-gradient-to-r from-purple-100 to-blue-100  pt-20 ">
      <div className="normalcontainer">
        <LandingPage convo_select={convo_select} setPromptShow={setPromptShow} />
      </div>
    


      {(promptShow && (
        <div className=" items-left mt-[-110px] pb-40  ">
          <CreatePersonaInput /> 
        </div>
      ))}
      


      {!convoHidden && (
        <div className=" pb-20 px-48 mb-32">
          <div className="grid grid-cols-2 gap-0 ">
        

            <div className="chat-container items-center">
              <div className=" items-left text-left mb-8">
              <p className="font-bold text-[20pt]">
                You are now conversing with {personaName ? personaName : '______'}.
              </p>
              {personaName && personaGoal && (
                <p>
                  Convince them that "{personaGoal}"
                </p>
              )}
                <p className="">
                  Facilitate, depolarize, be kind and consider the Tipps & Tricks and Disclaimer!
                </p>
              </div>



              <div className="" ref={chatWindowRef}>
                <ChatWindow messages={messages} />
              </div>

              <div className="text-input-container mt-[-49px] items-center justify-center w-[calc(100%)]">
                <TextInput handleSendMessage={handleSendMessage} scrollToChat={scrollToChat} />
              </div>

            </div>

            {(hasFeedback && (

              <div className="chat-container items-center pl-20">
            
                <div className=" items-left text-left mb-8">
                    <p className=" font-bold text-[20pt] mb-12 ">
                      Tips & Tricks 
                    </p>

                  
                  <ul className="list-disc list-inside text-lg text-black md:text-lg lg:text-lg space-y-2 mb-24 ">
                    <li>A safe space for people to try out new things  </li>
                    <li>Practice communication and pick </li>
                    <li>Aiming for more peace through self-education  </li>
                  </ul>

                  <p className=" font-bold text-[20pt]  mb-12 ">
                    Disclaimers
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>SaaS for recruitment interviews for companies</li>
                    <li>Machine-readable database for social </li>
                    <li>LeetCode for the social realm </li>
                  </ul>


                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className=" pb-10 normalcontainer " ref={chatWindowRef}>  
        <OurMission />
      </div>


      <Footer />


      </div>

    </div>
</div>
    

  );
}

export default App;
