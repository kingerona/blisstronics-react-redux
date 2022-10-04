import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './CheckoutSteps.css';

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: 'border-box',
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((step, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              icon={step.icon}
              style={{
                color: activeStep >= index ? 'tomato' : 'rgba(0,0,0,0.649)',
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
