import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ThemeProvider, useTheme } from './ThemeContext'; // Import ThemeProvider here
import Header from './components/Header';
import FormSection from './components/FormSection';
import LivePreview from './components/LivePreview';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Use the theme from props for background and color */
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
`;

const MainContent = styled.main`
  display: flex;
  flex-grow: 1;
  padding: 2rem;
  gap: 2rem;
  
  /* Responsive styles */
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const initialData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '123-456-7890',
    linkedin: 'linkedin.com/in/yourprofile',
    portfolio: 'yourportfolio.com',
  },
  education: [
    {
      institution: 'University of Example',
      degree: 'B.S. in Computer Science',
      duration: 'Aug 2020 - May 2024',
      description: 'Relevant coursework in data structures, algorithms, and web development.',
    },
  ],
  experience: [
    {
      company: 'Tech Solutions Inc.',
      role: 'Software Engineer Intern',
      duration: 'Jun 2023 - Aug 2023',
      description: 'Developed and maintained features for a large-scale web application using React and Node.js. Collaborated with a team of 10 engineers.',
    },
  ],
  skills: [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'CSS', level: 95 },
  ],
  projects: [
    {
      title: 'Dynamic Resume Builder',
      description: 'A responsive web app to create and download resumes in real-time.',
      techStack: 'React, styled-components, jspdf',
      link: 'github.com/your-repo',
    },
  ],
};

// A new component to consume the theme context
const ThemedApp = () => {
  const [resumeData, setResumeData] = useState(initialData);
  const { theme } = useTheme(); // Get theme from the context
  const previewRef = useRef();

  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <AppWrapper theme={theme}>
      <Header previewRef={previewRef} />
      <MainContent>
        <FormSection resumeData={resumeData} setResumeData={setResumeData} />
        <LivePreview ref={previewRef} resumeData={resumeData} />
      </MainContent>
    </AppWrapper>
  );
}

// The main App component now just provides the theme
function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;