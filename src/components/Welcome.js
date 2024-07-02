import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const WelcomeWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #272828;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${css`${fadeIn} 0.5s ease-out`};
  ${({ fade }) => fade && css`${fadeOut} 0.5s ease-out forwards`};
`;

const WelcomeContent = styled.div`
  position: absolute;
  text-align: center;
  font-size: 4em;
  font-weight: bold;
  color: #FFFFFF;
  text-shadow: 0 0 10px #000000;
  font-family: "Roboto Mono", monospace;
  font-optical-sizing: auto;
  font-style: normal;

  @media (max-width: 768px) {
    font-size: 2em;
  }

  @media (max-width: 480px) {
    font-size: 1.5em;
  }
`;

const MatrixCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #272828;
`;

const Welcome = ({ onClose }) => {
  const [fade, setFade] = useState(false);
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawMatrix = () => {
      const columns = Math.ceil(canvas.width / 20);
      const drops = Array(columns).fill(1);

      const draw = () => {
        ctx.fillStyle = 'rgba(39, 40, 40, 0.1)'; // Use rgba to ensure opacity is not too high
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#2F9F84';
        ctx.font = '20px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = Math.random() > 0.5 ? '1' : '0';
          ctx.fillText(text, i * 20, drops[i] * 20);

          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      const intervalId = setInterval(draw, 33);
      return intervalId;
    };

    const intervalId = drawMatrix();

    const textAnimation = () => {
      const message = "Welcome to Jon Kutllovci's Page";
      let displayText = '';
      let currentIndex = 0;

      const updateText = () => {
        if (currentIndex < message.length) {
          displayText += message[currentIndex];
          textRef.current.innerHTML = displayText;
          currentIndex++;
          setTimeout(updateText, 100);
        } else {
          setTimeout(() => {
            setFade(true);
            setTimeout(onClose, 500); // Close after fade-out animation
          }, 2000);
        }
      };

      updateText();
    };

    textAnimation();

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [onClose]);

  return (
    <WelcomeWrapper fade={fade}>
      <MatrixCanvas ref={canvasRef} />
      <WelcomeContent ref={textRef}></WelcomeContent>
    </WelcomeWrapper>
  );
};

export default Welcome;
