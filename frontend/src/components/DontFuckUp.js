import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';


const DontFuckUp = () => {
  const [showFirstPhrase, setShowFirstPhrase] = useState(true);
  const [showSecondPhrase, setShowSecondPhrase] = useState(false);
  const firstPhrase = 'Welcome, <br />   lets build your own  <br /> ';
  const secondPhrase = "PayPal Mafia";
  const typewriterRef = useRef(null);
  const base = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  const navigate = useNavigate();

  return (
    <div >
    

<div className="w-full text-left py-24 h-[400px] md:h-[450px] lg:h-[550px] xl:h-[500px] ">
    < div className=" w-full">
       <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-left mb-2 typewriter-text text-white">
          {showFirstPhrase && (
            <Typewriter
              options={{
                autoStart: true,
                loop: false,
                delay: 50,
                deleteSpeed: 30,
                cursor: '|',
              }}
              onInit={(typewriter) => {
                typewriterRef.current = typewriter;
                typewriter
                  .typeString(firstPhrase)
                  .callFunction(() => {
                    setShowFirstPhrase(false);
                    // Start the timer for showing the second phrase after the first is typed
                    setTimeout(() => {
                      setShowSecondPhrase(true);
                    }, 50);
                  })
                  .start();
              }}
            />
          )}
          {!showFirstPhrase && <span dangerouslySetInnerHTML={{ __html: firstPhrase }} />}
        </h2>
      </div>

      {showSecondPhrase && (
        <div className="w-full mt-8 md:mt-8 lg:mt-8 xl:mt-8">
          <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-left mb-2 typewriter-text text-white">
            <Typewriter
              options={{
                autoStart: true,
                loop: false,
                delay: 50,
                deleteSpeed: 30,
                cursor: '|',
              }}
              onInit={(typewriter) => {
                typewriterRef.current = typewriter;
                typewriter
                  .typeString(secondPhrase)
                  .callFunction(() => {
                    setTimeout(() => {
                      setShowSecondPhrase(true);
                    }, 50);
                  })
                  .start();
              }}
            />
            {/* This condition might no longer be necessary if the text is to remain indefinitely */}
            {!showSecondPhrase && <span dangerouslySetInnerHTML={{ __html: secondPhrase }} />}
          </h2>
        </div>
      )}

{/* <div className="background-div"></div> */}


      {/* <div className="w-full my-5">
        <h2 className={`text-sm md:text-xl lg:text-base xl:text-xl text-left pr-32 text-white text-black md:text-xl lg:text-xl mb-2 text-left typewriter-text transition-opacity duration-1000 ${showSecondPhrase ? 'opacity-100' : 'opacity-0'}`}>
           <span style={{ fontFamily: 'Begaradond, serif', fontStyle: 'italic' }}><i>Duolingo for Emotional Intelligence</i> </span>
        </h2>
      </div> */}

    </div>


        <div className={`flex items-start justify-start
         transition-opacity duration-1000 ${showSecondPhrase ? 'opacity-100' : 'opacity-0'}`}>

            <button 
              onClick={() => navigate('/login')} 
              className="text-white text-lg font-bold py-1 px-2 rounded-full mb-10
                hover:bg-gradient-to-r hover:from-[rgb(239,68,68)] hover:to-[rgb(236,72,153)] hover:scale-105 transition duration-200 xl:text-2xl xl:py-2 xl:px-4
                hover:cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 "
            >
              Join now!
            </button>


          
          </div>
          <div className="text-5xl font-bold text-white">
            User Count: <span style={{ background: 'linear-gradient(to right, rgb(59, 130, 246), rgb(139, 92, 246))', WebkitBackgroundClip: 'text', color: 'transparent' }}>#389</span>
          </div>
    </div>
    
  );
};

export default DontFuckUp;
