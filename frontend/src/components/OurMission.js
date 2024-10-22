import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone ,faLock,faBolt } from '@fortawesome/free-solid-svg-icons';
const OurMission = () => {


  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  
  return (
    <div className="mission-container w-full">
      <h1 className="text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-10 w-full animate-on-scroll mt-28">OUR MISSION</h1>
      <p className="text-sm md:text-xl lg:text-lg xl:text-xl">
        
      <div className=" text-justify animate-on-scroll w-full md:w-full ">
        <p>
          As a large language model I cannot but delve into the ideas behind this project.
          This project aims to impact on 3 different dimensions:  <br /><br />
          
          <ul style={{listStyleType:'disc', marginLeft:'2rem', marginBottom:'1rem'}}>
          <li><strong>Training of EQ & Communication skills</strong></li>
          <li><strong>New Evals for soft skills</strong></li>
          <li><strong>Social divides & Cognitive bias</strong></li>
          </ul>

          This platform aims to introduce a new class of learning. While quantitative assessments, 
          trainings and competitions in technical fields like computer science,
          mathematics, etc. are broadly available and serve as a metric for economic as well as cognitive value, 
          emotional intelligence, soft skills, wisdom, kindness, and life experience 
          could hardly be measured or practiced in a similar way. While the former has been creating a 
          certain value system, one can assume that having an equal emphasis on the very basic nature of our humanness - 
          emotion, empathy, and communication - would tackle most global problems we face nowadays, individually and collectively. <br /><br />

          This tool tries to help with individual as well as group conflicts and situations that are hard to 
          learn without experience. Learning in these realms so far has been limited by social segregation, 
          therefore the pure chance of encountering specific situations, poor education or existence of role models, 
          the amount of books one could read. None of these are scalable or accessible to everyone nor is it pleasant to encounter opposing views and experience ranges. <br /> <br />

          Combining concepts like ELO rankings & puzzles from chess, gamification in form of levels and leaderboards 
          from <a href="https://gandalf.lakera.ai/" style={{  color: "blue"}} >Gandalf </a> or Duolingo with the advancements in NLP, 
          this tool offers an accessible way to do the same in the social realm. This is LeetCode for human decoding.
        </p>
    </div>
      
      
    <br /><br />




      <h2 className="text-2xl font-bold mb-4 animate-on-scroll">Summary:</h2>
        <ul className="list-disc text-sm md:text-xl lg:text-lg xl:text-xl space-y-2 animate-on-scroll ml-[2rem]">
          <li>A safe space for people to try out new things and take time to reflect without causing harm.</li>
          <li>Practice communication and pick up useful phrases or at least realize which ones are destructive.</li>
          <li>
            Simulate challenging conversations, such as those involving sensitive topics like rape, depression, 
            and death, without the need to talk to real people risking their or one's own emotional wellbeing.
          </li>
          <li>Aiming for more peace through self-education with immediate access to gamified practice.</li>
        </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4 animate-on-scroll">Future ideas:</h2>
        <ul className="list-disc space-y-2 animate-on-scroll ml-[2rem]">
          <li>SaaS for recruitment interviews for companies or to train their employees in soft skills.</li>
          <li>Machine-readable database for social scientists to understand how people argue and think.</li>
          <li>LeetCode for the social realm, users could gain credentials for a metric not represented yet.</li>
          <li>Simulator for Model United Nations and high lvl. diplomatic dicourse</li>
        </ul>

  






        <br /> <br />  <br /><br />

        <h2 className="text-2xl font-bold mb-4 animate-on-scroll">Persona Ideas:</h2> <br />   
      <div className="items-center animate-on-scroll"> 
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-0 bg-transparent text-black text-[11px]  md:text-sm lg:text-sm xl:text-sm  rounded-lg">          
          
          <div>
            <p>Climate activist</p>
            <p>Climate denier</p>
            <p>Nazi</p>
            <p>Left wing extremist</p>
            <p>Bully</p>
            <p>Average voter of xyz party</p>
            <p>Racist</p>
            <p>Vegans/Carnivores</p>
            <p>Criminal / prisoner</p>
            <p>Trump Voter, Biden Voter</p>
            <p>Fraudulent</p>
            <p>Putin Voter</p>
            <p>Murderer</p>
            <p>Cheater on wife</p>
            <p>Cheated on</p>
            <p>Rapist</p>
            <p>Cancerous person</p>
            <p>Just fired</p>
        
          </div>
          <div>
      
            <p>Refugee</p>
            <p>Pedophile</p>
            <p>Vegans/Carnivores</p>
            <p>Citizens of X country</p>
            <p>Homeless</p>
            <p>Alcoholic</p>
            <p>Fentanyl addict</p>
            <p>Deathrow</p>
            <p>  <br /></p>
            <p><strong>Subject to/victim of:</strong></p>
            <p>Suicide</p>
            <p>Betrayed</p>
            <p>Rape</p>
            <p>Death of relative</p>
            <p>Depression</p>
            <p>Schizophrenia</p>
            <p>Other mental disorders</p>
            <p>Different education levels</p>
          </div>
          <div>
          
            <p>12 year olds / 75 years olds</p>
            <p>Ultra rich / Private jet owner</p>
            <p>Ultra poor</p>
            <p>Sexualized person</p>
            <p>40yo virgin</p>
            <p>Women</p>
            <p>Single Mum</p>
            <p>POC, Asian, Hispanic, Jew, Palestinian</p>
            <p>Religious/atheist</p>
            <p>Disabled</p>
            <p>Gay</p>
            <p>LGBTQ</p>
            <p>Astronaut</p>
            <p>Politician</p>
            <p>Tall person</p>
            <p>Small person</p>
            <p>Holocaust survivor</p>

          </div>
        
          <div>
            <p>Leader some kind</p>
            <p>Dictator</p>

            <p>Child</p>
            <p>Your grandma</p>
            <p>Lonely person</p>
            <p>Popular person</p>
            <p>  <br /></p>
            <p><strong>How to:</strong></p>
            <p>Apologize</p>
            <p>Thank</p>
            <p>Take a thank</p>
            <p>Compliment</p>
            <p>Take a compliment</p>
            <p>How to listen</p>
            <p>Hold a speech (voice feature required)</p>
            <p>Congratulate</p>
          </div>
          
        </div>
      </div>

        <br /><br /><br /><br />
        <h2 className="text-2xl font-bold mb-4 animate-on-scroll">Dangers:</h2><br />


        <div className=" text-justify animate-on-scroll text-sm md:text-xl lg:text-lg xl:text-xl">
                While our mission is driven by impact, our care has to be driven by the risk of impact as well. 
        Certain personas provide a channeled port for misinformation, bad-faith arguments, or other harmful content, convincing people of incorrect or harmful ideas.. Others can be if trained wrong leading to fatal errors. <br /><br />
        Prompt failures and malfunctions may lead to nonsensical or unrealistic responses. Users might think they are learning about others, but it could be a mere hallucination. Generalization errors could arise from improperly generalizing specific persons' experiences.<br /><br />
        We wan to counteract these by creating disclaimers where needed and focusing on the "training" and the interaction with the personas, rather then the content.
        <br /><br /><br /><br /><br />
      
        </div>
      </p>
    </div>
  );
};

export default OurMission;
