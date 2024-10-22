import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedinIn, faRedditAlien } from '@fortawesome/free-brands-svg-icons';

import {
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  LinkedinIcon,
  RedditIcon,
} from 'react-share';
import './Footer.css'; // Ensure you create this CSS file for custom styles


const Footer = () => {
  const url = 'https://diplomatica.ai/';
  const title = 'Simulating conversations, cool!';

  return (
    <footer className='footer-container flex-col'>
      <div className='contact-section'>
        <div className='contact-item'>
          <p>Gabor Hollbeck</p>
          <a href="https://x.com/gaborhollbeck" target="_blank" rel="noopener noreferrer">@gaborhollbeck</a><br />
          <a href="mailto:ghollbeck@ethz.ch">ghollbeck@ethz.ch</a>
        </div>

       <div className='contact-item right'>
          <p>Alec McGail</p>
          <a href="https://www.linkedin.com/in/alec-mcgail-80789469/" target="_blank" rel="noopener noreferrer">@alecmcgail</a><br />
          <a href="mailto:am2873@cornell.edu">am2873@cornell.edu</a>
        </div>
      </div>
      <div className='flex space-x-5 flex-row justify-center mb-[1rem] opacity-50'>
        <a href='/privacy'>Privacy</a>
        <a href='/terms'>Terms</a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeTR_44kRLy9x1NzsyeddyqN1njmu7Z35xMLaI0r0CpLbtGBw/viewform" target="_blank" rel="noopener noreferrer">Feedback</a>
      </div>
      

      <div className='center-section'>
            <div className='share-buttons'>
            <TwitterShareButton
              url={url}
              title={title}
              className='transition-transform ease-in-out transform hover:scale-125'
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" className="icon-grey-transparent" />
            </TwitterShareButton>
            <LinkedinShareButton
              url={url}
              title={title}
              className='transition-transform ease-in-out transform hover:scale-125'
            >
              <FontAwesomeIcon icon={faLinkedinIn} size="2x" className="icon-grey-transparent" />
            </LinkedinShareButton>
            <RedditShareButton
              url={url}
              title={title}
              className='transition-transform ease-in-out transform hover:scale-125'
            >
              <FontAwesomeIcon icon={faRedditAlien} size="2x" className="icon-grey-transparent" />
            </RedditShareButton>
            </div>
          </div>
    </footer>
  );
};

export default Footer;
