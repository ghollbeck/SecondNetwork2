import React, { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMicrophone, faLock, faBolt, faFistRaised, faPeace} from '@fortawesome/free-solid-svg-icons';

import flatEarthersGif from '../pictures/FlatEarthers.gif';
import EmojiDepression from     '../pictures/Emoji_Depression.png';
import EmojiSuicide from        '../pictures/Emoji_Suicide.png';
import EmojiTerrorist from      '../pictures/Emojies_Terrorist.png';
import EmojiGrandma from        '../pictures/EmojiGrandma.png';
import EmojiPersecution from     '../pictures/EMojiPersecution.png';
import trumpImage from           '../pictures/Trump.png';



const LandingPage = ({ convo_select, setPromptShow }) => {
  const base = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  console.log(process.env);

  const [selectedBox, setSelectedBox] = useState(null);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false); // Add state for button visibility
  const [secondPhraseVisible, setSecondPhraseVisible] = useState(false); // Add state for second phrase visibility
  const typewriterRef = useRef(null);

  const handleBoxClick = (box) => {
    if (box === 'prompt_own_persona') {
      setPromptShow(true);
      setSelectedBox(box);
    } else {
      setSelectedBox(box);
      convo_select(box);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('start-animation');
        }
      });
    });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    // Set a timeout to show the typewriter effect after 3 seconds
    const timeoutId = setTimeout(() => {
      setShowTypewriter(true);
    }, 4700);

    // Set a timeout to show the button after 2 seconds
    const buttonTimeoutId = setTimeout(() => {
      setButtonVisible(true);
    }, 4000);

    // Set a timeout to show the second phrase after 4 seconds
    const secondPhraseTimeoutId = setTimeout(() => {
      setSecondPhraseVisible(true);
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(buttonTimeoutId);
      clearTimeout(secondPhraseTimeoutId);
    };
  }, []);




  
  const getBoxClass = (box) => {
    return `bg-white text-gray-900 p-1       
    w-28 h-28      
    sm:w-32 sm:h-32
    md:w-36 md:h-36
    lg:w-40 lg:h-40
    xl:w-48 xl:h-48 
    max-w-xs 
    rounded-3xl 
    shadow-xl cursor-pointer ${selectedBox === box ? 'border-4 border-blue-500' : 'border-4 border-transparent'} box-sizing:border-box;`;
  };

  const firstPhrase = `<span style="font-family: 'Begaradond', serif; font-style: italic;"><i>Duolingo for Emotional Intelligence</i>   `;


  // -   <i>Leetcode for Therpists</i>   -   <i>Gandalf for Dimplomacy</i></span> <br />








  
  return (
    <div className="w-full">
      <div className="">
        <div className="">

          <div classname=" animate-on-scroll">

          <h2 className="text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-10 text-left ">How it works</h2>
          <div className="text-justify        text-sm md:text-xl lg:text-base xl:text-xl">
            A persona will be dynamically created to have a conversation with you.
            You choose a goal, something to attempt to convince them of.
            Once you're done with the conversation, the persona will reflect, and a third-party judge will evaluate the conversation.
            <br /><br />
            Choose a persona you want to have a conversation with. 
            Unlock further characters and levels by showing your EQ and completing at least one of the first 3.



            <div className="mt-20 w-[100%]   ">

            <h2 className="text-xl md:text-xl lg:text-2xl xl:text-2xl font-bold text-left mb-5 ">1. Choose between Diplomacy/EQ Situation</h2>

              <img 
              src={require('../assets/ScreenshotGame.png')} 
              alt="Screenshot of the game" 
              className="rounded-xl shadow-lg " 
            />
            </div>


            <div className="mt-20 w-[100%]   ">
            <h2 className="text-xl md:text-xl lg:text-2xl xl:text-2xl font-bold text-left mb-5 ">2. Choose Persona</h2>

              <img 
              src={require('../assets/ScreenshotGame2.png')} 
              alt="Screenshot of the game" 
              className="rounded-xl shadow-lg " 
            />
            </div>

            <div className="mt-20 w-[100%]   ">
            <h2 className="text-xl md:text-xl lg:text-2xl xl:text-2xl font-bold text-left mb-5 ">3. Choose 5-shot or infinite chat: Start Chatting!</h2>

              <img 
              src={require('../assets/ScreenshotGame3.png')} 
              alt="Screenshot of the game" 
              className="rounded-xl shadow-lg " 
            />
            </div>


          </div>

          </div>

     

        </div>

      
      </div>



    


{/* 


      <div className="flex items-center">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                                  gap-8
                                  md:gap-12
                                  lg:gap-12
                                  xl:gap-12
                                  px-auto mx-0 py-20 ">






        <div className="relative justify-center   animate-on-scroll">
          <div className={getBoxClass('climate_denier')} onClick={() => handleBoxClick('climate_denier')}>            
            <div className="flex justify-center ">
              <div className=" mb-1 lg:mt-4 md:mt-4 sm:mt-4 
                                text-2xl 
                                sm:text-2xl 
                                md:text-3xl 
                                lg:text-5xl 
                                
                                mb-1 
                                lg:mt-4 
                                md:mt-4 
                                sm:mt-2">
                🤒</div>
            </div>
            <div className="relative justify-center">
              <h3 className=" absolute lg:top-2 md:top-2 sm:top-2 lg:left-0 md:left-0 sm:left-0 right-0 m-auto font-bold mb-2 text-center
                                    text-[10px]
                                    sm:text-[12px]    sm:top-5    sm:left-0
                                    md:text-base      md:top-5    md:left-0
                                    lg:text-base      lg:top-5    lg:left-0
                                    ">Climate Denier</h3>
              <h3 className="absolute top-5 left-0 right-0 m-auto text-l sm:text-base md:text-l lg:text-l italic mb-2 text-center leading-tight
               text-[10px]
               sm:text-[12px]    sm:top-10    sm:left-0
               md:text-base      md:top-10    md:left-0
               lg:text-base      lg:top-10    lg:left-0 ">Convince them to love Greta</h3>
            </div>
          </div>
          </div>

        

          <div className=" animate-on-scroll">
            <div className={getBoxClass('Climate Activist')} onClick={() => handleBoxClick('Climate Activist')}>
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faFistRaised} className="text-2xl 
                                                                sm:text-2xl 
                                                                md:text-3xl 
                                                                lg:text-5xl 
                                                                
                                                                mb-1 
                                                                lg:mt-4 
                                                                md:mt-4 
                                                                sm:mt-2" />
              </div>
              <div className="relative justify-center">
                <h3 className="absolute top-5 left-0 right-0 m-auto font-bold mb-2 text-center
                                                                text-[10px]
                                                                sm:text-[12px]    sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0
                ">Climate Activist</h3>
                <h3 className="absolute top-9 left-0 right-0 m-auto italic mb-2 text-center leading-tight
                                                                text-[10px]
                                                                sm:text-[12px]
                                                                md:text-base
                                                                lg:text-base 
                "> Realize the deep state </h3>
              </div>
          </div>
          </div>
          <div className="animate-on-scroll">
          <div className={getBoxClass('trump_voter')} onClick={() => handleBoxClick('trump_voter')}>
            <div className="flex justify-center">
              <img src={trumpImage} alt="Trump" className="w-10 h-10 mb-1 mt-2
                                                          sm:w-10 sm:h-10 
                                                          md:w-12 md:h-12 
                                                          lg:w-16 lg:h-16 
                                                          xl:w-16 xl:h-16" />
            </div>
            <div className="relative justify-center">
              <h3 className="absolute top-1 left-0 right-0 m-auto  font-bold mb-2 text-center text-[10px]
                                                                
                                                                sm:text-[12px]    sm:top-2    sm:left-0
                                                                md:text-base      md:top-2    md:left-0
                                                                lg:text-base      lg:top-2    lg:left-0">Trump Voter</h3>
              <h3 className="absolute top-5 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight 
                                                                text-[10px]
                                                                sm:text-[12px]    sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">Convince them to forget to vote</h3>
            </div>
          </div>
          </div>
          

          <div className=" animate-on-scroll">
            <div className={getBoxClass('BidenVoter')} onClick={() => handleBoxClick('BidenVoter')}>
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faFistRaised} className="text-2xl 
                                                                sm:text-2xl 
                                                                md:text-3xl 
                                                                lg:text-5xl 
                                                                
                                                                mb-1 
                                                                lg:mt-4 
                                                                md:mt-4 
                                                                sm:mt-2" />
              </div>
              <div className="relative justify-center">
                <h3 className="absolute top-2 left-0 right-0 m-auto font-bold mb-2 text-center
                
                
                
                text-[10px]
                                                                sm:text-[12px]    sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0
                                                                
                                                                
                                                                ">Biden Voter</h3>
                <h3 className="absolute top-10 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  sm:text-[12px]    
                                                                  text-[10px]
                                                                  sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">Set them asleep</h3>
              </div>
          </div>
          </div>


          <div className=" animate-on-scroll">
            <div className={getBoxClass('racist')} onClick={() => handleBoxClick('racist')}>
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faFistRaised} className="text-2xl 
                                                                sm:text-2xl 
                                                                md:text-3xl 
                                                                lg:text-5xl 
                                                                
                                                                mb-1 
                                                                lg:mt-4 
                                                                md:mt-4 
                                                                sm:mt-2" />
              </div>
              <div className="relative justify-center">
                <h3 className="absolute top-2 left-0 right-0 m-auto font-bold mb-2 text-center   
                text-[10px]
                                                                sm:text-[12px]    sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0">Racist</h3>
                <h3 className="absolute top-10 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  
                                                                text-[10px]                                     
                                                                sm:text-[12px]    sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">Let them preach CRT</h3>
              </div>
          </div>
          </div>

          <div className=" animate-on-scroll">
            <div className={getBoxClass('PeaceNobelLaureate')} onClick={() => handleBoxClick('PeaceNobelLaureate')}>
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faPeace} className="text-2xl 
                                                                sm:text-2xl 
                                                                md:text-3xl 
                                                                lg:text-5xl 
                                                                
                                                                mb-1 
                                                                lg:mt-4 
                                                                md:mt-4 
                                                                sm:mt-2" />
              </div>
              <div className="relative justify-center">
                <h3 className="absolute top-2 left-0 right-0 m-auto font-bold mb-2 text-center
                text-[10px]
                sm:text-[12px]    sm:top-5    sm:left-0
                md:text-base      md:top-5    md:left-0
                lg:text-base      lg:top-5    lg:left-0
                
                ">Nobel Laureate</h3>
                <h3 className="absolute top-10 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  sm:text-[12px]    
                                                                text-[10px]
                                                                sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">Its all for nothing</h3>
              </div>
          </div>
          </div>


          <div className=" animate-on-scroll">
          <div className={getBoxClass('Terrorist')} onClick={() => handleBoxClick('Terrorist')}>
            <div className="flex justify-center">
            <img src={EmojiTerrorist} alt="Emoji Terrorist" className="w-12 h-12 mb-1  
                                                          sm:w-10 sm:h-10 
                                                          md:w-12 md:h-12 
                                                          lg:w-16 lg:h-16 
                                                          xl:w-16 xl:h-16" />
            </div>
            <div className="relative justify-center">
              <h3 className="absolute top-1 left-0 right-0 m-auto  font-bold mb-2 text-center 
              text-[10px]
               sm:text-[12px]    
                                                                sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0">Terrorist</h3>
              <h3 className="absolute top-5 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  
                                                                text-[10px]
                                                                sm:text-[12px]    sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">Love both - Shariya and consititution </h3>
            </div>
            </div>
            </div>
            


          <div className=" animate-on-scroll">
            <div className={getBoxClass('Nazi')} onClick={() => handleBoxClick('Nazi')}>
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faFistRaised} className="text-2xl 
                                                                sm:text-2xl 
                                                                md:text-3xl 
                                                                lg:text-5xl 
                                                                
                                                                mb-1 
                                                                lg:mt-4 
                                                                md:mt-4 
                                                                sm:mt-2" />
              </div>
              <div className="relative justify-center">
                <h3 className="absolute top-2 left-0 right-0 m-auto font-bold mb-2 text-center text-[10px]
                                                                sm:text-[12px]    sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0">Nazi</h3>
                <h3 className="absolute top-10 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  
                                                                text-[10px]
                                                                sm:text-[12px]    sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">Let them preach CRT</h3>
              </div>
          </div>
          </div>

          <div className=" animate-on-scroll">
            <div className={getBoxClass('LeftWingExtremist')} onClick={() => handleBoxClick('LeftWingExtremist')}>
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faFistRaised} className="text-2xl 
                                                                sm:text-2xl 
                                                                md:text-2xl 
                                                                lg:text-5xl 
                                                                
                                                                mb-1 
                                                                lg:mt-4 
                                                                md:mt-4 
                                                                sm:mt-2" />
              </div>
              <div className="relative justify-center">
                <h3 className="absolute top-2 left-0 right-0 m-auto font-bold mb-2 text-center text-[10px]
                                                                sm:text-[12px]    sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0">Radical Leftist</h3>
                <h3 className="absolute top-10 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  
                                                                text-[10px]
                                                                sm:text-[12px]    sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">XYZ</h3>
              </div>
          </div>
          </div>




          <div className=" animate-on-scroll">
            <div className={getBoxClass('HRActivist')} onClick={() => handleBoxClick('HRActivist')}>
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faFistRaised} className="text-2xl 
                                                                sm:text-2xl 
                                                                md:text-2xl 
                                                                lg:text-5xl 
                                                                
                                                                mb-1 
                                                                lg:mt-4 
                                                                md:mt-4 
                                                                sm:mt-2" />
              </div>
              <div className="relative justify-center">
                <h3 className="absolute top-2 left-0 right-0 m-auto font-bold mb-2 text-center text-[10px]
                                                                sm:text-[12px]    sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0">HR Activist</h3>
                <h3 className="absolute top-10 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  
                                                                text-[10px]
                                                                sm:text-[12px]    sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">XYZ</h3>
              </div>
          </div>
          </div>



            <div className="  animate-on-scroll">
          <div className={getBoxClass('depression')} onClick={() => handleBoxClick('depression')}>
            <div className="flex justify-center">
            <img src={EmojiDepression} alt="Emoji Depression" className="w-12 h-12 mb-0 mt-2 
                                                                        mt-[-5px] 
                                                                        sm:w-10 sm:h-10 
                                                                        md:w-12 md:h-12 
                                                                        lg:w-14 lg:h-14 
                                                                        xl:w-16 xl:h-16" />
            </div>
            <div className="relative justify-center">
              <h3 className="absolute top-0 left-0 right-0 m-auto font-bold mb-2 text-center text-[10px]
                                                                sm:text-[12px]    sm:top-2    sm:left-0
                                                                md:text-base      md:top-2    md:left-0
                                                                lg:text-base      lg:top-2    lg:left-0">Depression</h3>
              <h3 className="absolute top-5 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  
                                                                
                                                                text-[10px]
                                                                sm:text-[12px]    sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">Make them feel heard</h3>
            </div>
          </div>
          </div>

          <div className=" animate-on-scroll">
          <div className={getBoxClass('suicide')} onClick={() => handleBoxClick('suicide')}>
            <div className="flex justify-center">
            <img src={EmojiSuicide} alt="Emoji Suicide" className="w-16 h-16 mb-1 
                                                                        mt-[-5px] 
                                                                        sm:w-10 sm:h-10 
                                                                        md:w-12 md:h-12 
                                                                        lg:w-14 lg:h-14 
                                                                        xl:w-16 xl:h-16" />
            </div>
            <div className="relative justify-center">
              <h3 className="absolute top-[-20px] left-0 right-0 m-auto font-bold mb-2 text-center text-[10px]
                                                                sm:text-[12px]    sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0">Suicide</h3>
              <h3 className="absolute top-2 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  
                                                                  text-[10px]
                                                                  sm:text-[12px]    sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">Save their life</h3>
            </div>
          </div>
          </div>

          <div className=" animate-on-scroll">
          <div className={getBoxClass('persecution')} onClick={() => handleBoxClick('persecution')}>
            <div className="flex justify-center">
            <img src={EmojiPersecution} alt="Emoji Persecution" className="w-10 h-10 mb-1 
                                                                        mt-[-5px] 
                                                                        sm:w-10 sm:h-10 
                                                                        md:w-12 md:h-12 
                                                                        lg:w-14 lg:h-14 
                                                                        xl:w-16 xl:h-16" />            
            </div>
            <div className="relative justify-center">
              <h3 className="absolute top-1 left-0 right-0 m-auto font-bold mb-2 text-center text-[10px]
                                                                sm:text-[12px]    sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0">Persecution</h3>
              <h3 className="absolute top-9 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  
                                                                text-[10px]
                                                                sm:text-[12px]    sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">Lay off cognitive dissonance</h3>
            </div>
          </div>
          </div>

          <div className="  animate-on-scroll">
          <div className={getBoxClass('grandma')} onClick={() => handleBoxClick('grandma')}>
            <div className="flex justify-center">
            <img src={EmojiGrandma} alt="Emoji Grandma" className="w-10 h-10 mb-0
                                                                        mt-0 
                                                                        sm:w-8 sm:h-8 
                                                                        md:w-10 md:h-10 
                                                                        lg:w-12 lg:h-12 
                                                                        xl:w-14 xl:h-14" />
            </div>
            <div className="relative justify-center">
              <h3 className="absolute top-2 left-[-30px] right-[-30px]  m-auto font-bold mb-2 text-center text-[10px]
                                                                sm:text-[12px]    sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0">Lonely Grandma</h3>
              <h3 className="absolute top-7 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight  
                                                                  text-[10px]
                                                                  sm:text-[12px]    sm:top-10    sm:left-0
                                                                md:text-base      md:top-10    md:left-0
                                                                lg:text-base      lg:top-10    lg:left-0">Let them feel appreciated</h3>
            </div>
          </div>
          </div>

          <div className="  animate-on-scroll">
          <div className={getBoxClass('prompt_own_persona')} onClick={() => handleBoxClick('prompt_own_persona')}>
            
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faBolt} className=" mb-1 mt-4 text-2xl 
                                                                sm:text-2xl 
                                                                md:text-2xl 
                                                                lg:text-5xl 
                                                                
                                                                mb-1 
                                                                lg:mt-4 
                                                                md:mt-4 
                                                                sm:mt-2" /> 
              </div>
              <div className="relative justify-center">
                <h3 className="absolute top-1 left-0 right-0 m-auto font-bold mb-2 text-center text-[10px]
                                                                sm:text-[12px]    sm:top-5    sm:left-0
                                                                md:text-base      md:top-5    md:left-0
                                                                lg:text-base      lg:top-5    lg:left-0">Prompt your own Persona</h3>
                <h3 className="absolute top-10 left-0 right-0 m-auto text-l italic mb-2 text-center leading-tight"></h3>
                </div>
            </div>
          </div>
        </div> 
        </div>*/}
        </div>
        

      
  
  );
};

export default LandingPage;
