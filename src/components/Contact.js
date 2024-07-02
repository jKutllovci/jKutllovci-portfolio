import React, { useState } from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube, FaEnvelope, FaGithub, FaPhone } from 'react-icons/fa';
import ReactStars from 'react-stars';
import axios from 'axios';

const ContactSection = styled.section`
  padding: 40px 0;
  text-align: center;
  background-color: #293D38;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  input, textarea {
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    border: 1px solid #fff;
    border-radius: 5px;
    background-color: #111;
    color: #fff;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #2F9F84;
    color: #000;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #27A97D;
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
  }
`;

const Message = styled.p`
  margin-top: 20px;
  color: ${props => props.$success ? '#2F9F84' : '#ff6347'};
  font-size: 18px;
`;

const ContactFooter = styled.footer`
  padding: 20px;
  background-color: #111;
  color: #fff;
  text-align: center;
  margin-top: 20px;

  p {
    margin: 0;
    font-size: 14px;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      setFeedback({ message: 'Message sent successfully!', success: true });
      setFormData({ name: '', email: '', message: '', rating: 0 });
    } catch (error) {
      console.error('There was an error sending the message:', error);
      setFeedback({ message: 'There was an error sending your message. Please try again.', success: false });
    }
  };
  

  return (
    <ContactSection id="contact">
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
        <div style={{ marginBottom: '10px' }}>
          <h3>Rate how much you like my website</h3>
          <ReactStars
            count={5}
            onChange={handleRatingChange}
            size={24}
            color2={'#ffd700'}
            value={formData.rating}
          />
        </div>
        <button type="submit">Send Message</button>
      </Form>
      {feedback.message && (
        <Message $success={feedback.success}>{feedback.message}</Message>
      )}
      <SocialIcons>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="mailto:jon.kutllovci@gmail.com">
          <FaEnvelope />
        </a>
        <a href="tel:+38348383837">
          <FaPhone />
        </a>
      </SocialIcons>
      <ContactFooter>
        <p>&copy; {new Date().getFullYear()} Jon Kutllovci. All Rights Reserved.</p>
      </ContactFooter>
    </ContactSection>
  );
};

export default Contact;
