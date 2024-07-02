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

  input, textarea {
    margin-bottom: 10px;
    padding: 10px;
    width: 300px;
    border: 1px solid #fff;
    border-radius: 5px;
    background-color: #111;
    color: #fff;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #2F9F84;  /* Updated button color */
    color: #000;
    font-size: 16px;
    cursor: pointer;
  }
`;

const SocialIcons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;

  a {
    margin: 0 15px;
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
  color: ${props => props.$success ? '#2F9F84' : '#ff6347'};  /* Green for success, red for error */
  font-size: 18px;
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
      await axios.post('http://localhost:3001/api/message ', formData);
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
    </ContactSection>
  );
};

export default Contact;
