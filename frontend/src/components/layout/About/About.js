import React from 'react';
import './aboutSection.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import logo from '../../../images/logo.png';

const About = () => {
  const visitInstagram = () => {
    window.location = 'https://instagram.com/#';
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src={logo}
              alt="Blisstronics"
            />
            <Typography>Blisstronics</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>This is an Ecommerce website made by @Arif.</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://www.youtube.com/#" target="blank">
              <Instagram className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/#" target="blank">
              <Facebook className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
