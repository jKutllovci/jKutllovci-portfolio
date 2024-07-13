import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

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

const ProjectsSection = styled.section`
  padding: 60px 20px;
  text-align: center;
  background-color: #2f9f84;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(20px);
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${fadeInUp} 0.5s ease-out forwards;
    `}

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectItem = styled.div`
  background-color: #272b29;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  opacity: 0;
  transform: translateY(20px);
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${fadeInUp} 0.5s ease-out forwards;
    `}

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  h3 {
    margin-bottom: 10px;
    font-size: 1.5em;
    color: #ffffff;
  }

  p {
    color: #c5c6c7;
  }
`;

const Projects = () => {
  const [githubProjects, setGithubProjects] = useState([]);
  const [manualProjects] = useState([
    { title: 'Gjej.com', description: 'A platform providing information for every product or service of every business in Kosovo.' },
    { title: 'Kvik Booking', description: 'A booking application built with HTML, Bootstrap, CSS, JavaScript, and PHP.' },
    // Add more manual projects as needed
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const projectSectionRef = useRef(null);

  useEffect(() => {
    // Fetch GitHub repositories dynamically
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/jKutllovci/repos');
        if (response.ok) {
          const data = await response.json();
          setGithubProjects(data);
        } else {
          throw new Error('Failed to fetch repositories');
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (projectSectionRef.current) {
      observer.observe(projectSectionRef.current);
    }

    return () => {
      if (projectSectionRef.current) {
        observer.unobserve(projectSectionRef.current);
      }
    };
  }, []);

  return (
    <ProjectsSection id="projects" ref={projectSectionRef} isVisible={isVisible}>
      <h2>Projects</h2>
      <ProjectList>
        {/* Render GitHub projects */}
        {githubProjects.map((project, index) => (
          <ProjectItem key={`github-${index}`} isVisible={isVisible}>
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
              <h3>{project.name}</h3>
            </a>
            <p>{project.description}</p>
          </ProjectItem>
        ))}

        {/* Render manual projects */}
        {manualProjects.map((project, index) => (
          <ProjectItem key={`manual-${index}`} isVisible={isVisible}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </ProjectItem>
        ))}
      </ProjectList>
    </ProjectsSection>
  );
};

export default Projects;
