import React from 'react';
import paymentMethod from '../../../images/payment-method.jpg';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>STORE LOCATIONS</h4>
        <p>
          Branch1: Shop 826, Level 8, Multiplan Computer City Center, New
          Elephant Road
        </p>
        <p>
          Branch2: Shop 4-5, Ground Floor, Suvastu Arcade ICT Bhaban, New
          Elephant Road
        </p>
        <p>
          RMA Center: Suite 1116(A), Level 11, Multiplan Computer City Center,
          New Elephant Road
        </p>
      </div>
      <div className="midFooter">
        <h1>Blisstronics</h1>
        <p>High Quality is Our First Priority</p>
        <p>All rights reserved by Blisstronics &#169; 2022</p>
      </div>
      <div className="rightFooter">
        <h4>Pay Securely</h4>
        <p>Blisstronics provides with diverse payment systems</p>
        <img src={paymentMethod} alt="Blisstronics payment methods" />
      </div>
    </footer>
  );
};

export default Footer;
