import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <div style={{textShadow: "1px 1px 3px #DDD"}} className='px-10'>
        <h1>Privacy Policy<br/>Diplomatica.ai</h1>
        <p><strong>Effective Date:</strong> July 31, 2024</p>
      </div>

      <section>
        <h2>1. Contact Information</h2>
        <p>For any privacy-related concerns, please contact us at:</p>
        <p>Email: <a href="mailto:amcgail2@gmail.com">amcgail2@gmail.com</a></p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <ul>
          <li><strong>Email Address:</strong> Collected during account registration via Google login or direct signup. Used for account management and communication.</li>
          <li><strong>Payment Information:</strong> Processed through Stripe. We do not store payment information on our servers.</li>
          <li><strong>Conversations:</strong> We store conversations you have with characters in our games.</li>
        </ul>
      </section>

      <section>
        <h2>3. Data Protection Measures</h2>
        <ul>
          <li><strong>Passwords:</strong> Encrypted to ensure security.</li>
          <li><strong>Database Access:</strong> Limited access to the production database for maintenance purposes.</li>
          <li><strong>General Data:</strong> Protected by access controls on our servers.</li>
        </ul>
      </section>

      <section>
        <h2>4. Use of Information</h2>
        <ul>
          <li><strong>Internal Use:</strong> Anonymized conversations are used for debugging, service improvement, and internal presentations. These will never be made public or shared with third parties.</li>
          <li><strong>Communication:</strong> We may send necessary account information. Will send informal updates if you have opted in. You may opt out of these at any time using the link provided in each email.</li>
        </ul>
      </section>

      <section>
        <h2>5. User Rights</h2>
        <ul>
          <li><strong>Access and Deletion:</strong> You can download your data and request account deletion at any time.</li>
          <li><strong>Rectification:</strong> You can update your account information as needed.</li>
        </ul>
      </section>

      <section>
        <h2>6. Cookies and Tracking</h2>
        <p><strong>Sessions:</strong> We use sessions to maintain your login status.</p>
        <p><strong>Analytics:</strong> We use Google Analytics to collect anonymous usage data to improve our service.</p>
      </section>

      <section>
        <h2>7. Data Retention</h2>
        <p>We retain your login and conversation data until you request account deletion.</p>
      </section>

      <section>
        <h2>8. International Data Transfer</h2>
        <p>Diplomatica.ai serves users globally. If you are in the European Economic Area (EEA), you have certain rights under the General Data Protection Regulation (GDPR):</p>
        <ul>
          <li>The right to access, correct, or delete your personal data</li>
          <li>The right to restrict or object to our processing of personal data</li>
          <li>The right to data portability</li>
          <li>The right to lodge a complaint with a supervisory authority</li>
        </ul>
        <p>We will process requests in accordance with applicable data protection laws.</p>
      </section>

      <section>
        <h2>9. Consent</h2>
        <p>We obtain your consent for data collection and processing through a checkbox with links to our policies during account creation.</p>
      </section>

      <section>
        <h2>10. Data Breach Notification</h2>
        <p>In the event of a data breach involving sensitive information, we will notify affected users immediately and unconditionally.</p>
      </section>

      <section>
        <h2>11. Dispute Resolution</h2>
        <p>For any privacy-related disputes or complaints, please contact us at <a href="mailto:amcgail2@gmail.com">amcgail2@gmail.com</a>. We will strive to resolve any issues promptly and fairly.</p>
      </section>

      <section>
        <h2>12. Updates to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. You will be notified of any significant changes via email. We encourage you to review this policy periodically.</p>
      </section>

      <p>By using our website, you acknowledge that you have read and understood this Privacy Policy. If you have any questions or concerns, please contact us at <a href="mailto:amcgail2@gmail.com">amcgail2@gmail.com</a>.</p>
    </div>
  );
};

export default PrivacyPolicy;