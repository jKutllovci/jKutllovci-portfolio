import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube, FaEnvelope, FaGithub, FaPhone } from 'react-icons/fa';
import ReactStars from 'react-stars';
import { database } from '../config/firebaseConfig';
import { ref, push, set } from 'firebase/database';

// Keyframes for animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContactSection = styled.section`
  padding: 60px 20px;
  text-align: center;
  background-color: #293D38;
  opacity: 0; /* Initially hidden */
  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 1s ease-out forwards; /* Slide-in animation applied */
    `}
  color: white;

  h2 {
    margin-bottom: 40px;
    font-size: 2.5em;
    color: #2F9F84;
  }

  @media (max-width: 768px) {
    padding: 40px 10px;

    h2 {
      font-size: 2em;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto 40px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  input, textarea {
    margin-bottom: 20px;
    padding: 15px;
    width: 100%;
    border: 1px solid #fff;
    border-radius: 5px;
    background-color: #111;
    color: #fff;
    font-size: 1em;

    @media (max-width: 768px) {
      padding: 10px;
    }
  }

  button {
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    background-color: #2F9F84;
    color: #000;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #27A97D;
    }

    @media (max-width: 768px) {
      padding: 10px 20px;
    }
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  h3 {
    margin: 0 15px 0 0;
    color: white;
    font-size: 1.2em;

    @media (max-width: 768px) {
      font-size: 1em;
      margin: 0 10px 0 0;
    }
  }
`;

const SocialIcons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  a {
    margin: 10px;
    color: #fff;
    font-size: 32px;
    transition: color 0.3s;

    &:hover {
      color: #2F9F84;
    }

    @media (max-width: 768px) {
      font-size: 28px;
      margin: 5px;
    }
  }
`;

const Message = styled.p`
  margin-top: 20px;
  color: ${props => props.$success ? '#2F9F84' : '#ff6347'};
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CVSection = styled.section`
  padding: 60px 20px;
  text-align: center;
  background-color: #272B29;
  color: white;
  margin-top: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 20px;
    font-size: 2.5em;
    color: #2F9F84;

    @media (max-width: 768px) {
      font-size: 2em;
    }
  }

  p {
    margin-bottom: 40px;
    font-size: 1.2em;
    color: #C5C6C7;

    @media (max-width: 768px) {
      font-size: 1em;
      margin-bottom: 30px;
    }
  }

  button {
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    background-color: #2F9F84;
    color: #000;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    text-decoration: none;

    &:hover {
      background-color: #27A97D;
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      padding: 10px 20px;
      font-size: 0.9em;
    }
  }
`;

const ContactFooter = styled.footer`
  padding: 40px 20px;
  background: linear-gradient(135deg, #2F9F84, #2A7D6B);
  color: #fff;
  text-align: center;
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 10px 10px;

  p {
    margin: 0;
    font-size: 1em;
    font-family: 'Lato', sans-serif;

    @media (max-width: 768px) {
      font-size: 0.9em;
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    margin: 20px 0;

    a {
      margin: 0 10px;
      color: white;
      text-decoration: none;
      font-size: 1em;
      transition: color 0.3s;

      &:hover {
        color: #293d38;
      }

      @media (max-width: 768px) {
        margin: 0 5px;
        font-size: 0.9em;
      }
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0
  });

  const [feedback, setFeedback] = useState({
    message: '',
    success: false
  });

  const [isVisible, setIsVisible] = useState(false);
  const contactSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (contactSectionRef.current) {
      observer.observe(contactSectionRef.current);
    }

    return () => {
      if (contactSectionRef.current) {
        observer.unobserve(contactSectionRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Capture the current date and time in a human-readable format
    const currentDate = new Date().toLocaleString();
    
    try {
      const newMessageRef = push(ref(database, 'messages')); // Create a reference to store the message
      await set(newMessageRef, { 
        ...formData,          // Existing form data
        date: currentDate     // Add the current date to the data
      });
      
      // Reset form and display feedback
      setFeedback({ message: 'Message sent successfully!', success: true });
      setFormData({ name: '', email: '', message: '', rating: 0 });  // Reset the form fields
      
    } catch (error) {
      console.error('There was an error sending the message:', error);
      setFeedback({ message: 'There was an error sending your message. Please try again.', success: false });
    }
  };
  
  

  const onDownloadCV = () => {
    fetch(require('../cv/JKCV.pdf')).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'JKCV.pdf';
        alink.click();
      });
    });
  };

  return (
    <>
      <ContactSection id="contact" ref={contactSectionRef} $isVisible={isVisible}>
        <h2>Contact</h2>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <RatingContainer>
            <h3>Rate how much you like my website</h3>
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={24}
              color2={'#ffd700'}
              value={formData.rating}
            />
          </RatingContainer>
          <button type="submit">Send Message</button>
        </Form>
        {feedback.message && (
          <Message $success={feedback.success}>{feedback.message}</Message>
        )}
        <SocialIcons>
          <a href="https://www.linkedin.com/in/jon-kutllovci-11245222b/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
       
       
          <a href="https://github.com/jKutllovci/" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="mailto:jon.kutllovci@gmail.com">
            <FaEnvelope />
          </a>
     
        </SocialIcons>
      </ContactSection>
      <CVSection>
        <h2>Download My CV</h2>
        <p>Click the button below to download my latest CV.</p>
        <button onClick={onDownloadCV}>Download CV</button>
      </CVSection>
      <ContactFooter>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Jon Kutllovci. All Rights Reserved.</p>
      </ContactFooter>
    </>
  );
};

export default Contact;
