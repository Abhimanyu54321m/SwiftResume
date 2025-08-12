import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { FaEnvelope, FaPhone, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { useTheme } from '../ThemeContext'; // Import the useTheme hook

// --- Styled Components (no changes here) ---
const PreviewWrapper = styled.div`
  flex: 1.5;
  background-color: #fff;
  color: #333;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Georgia', serif;
  line-height: 1.6;

  ${({ themeName, theme }) => {
    if (themeName === 'dark' || themeName === 'modern') {
      return css`
        background-color: ${theme.secondary};
        color: ${theme.text};
      `;
    }
  }}
`;

const Header = styled.header`
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
`;

const Name = styled.h1`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.primary};
  margin: 0;
  font-weight: 700;
  letter-spacing: 1px;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  flex-wrap: wrap;

  & > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const ItemHeader = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
`;

const ItemSubheader = styled.p`
  font-style: italic;
  color: #454040ff;
  margin: 0.2rem 0;
  ${({ themeName, theme }) => (themeName === 'dark' || themeName === 'modern') && css`color: ${theme.text}cc;`}
`;

const Description = styled.p`
  margin: 0.5rem 0 0 0;
`;

const Skill = styled.div`
  margin-bottom: 0.75rem;
`;

const SkillName = styled.span`
  font-weight: 500;
`;

const ProficiencyBar = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  height: 10px;
  margin-top: 0.3rem;
`;

const ProficiencyFill = styled.div`
  width: ${props => props.level}%;
  background-color: ${({ theme }) => theme.primary};
  height: 100%;
  border-radius: 5px;
`;

// --- Corrected Component ---
const LivePreview = forwardRef(({ resumeData }, ref) => {
  // CORRECT: Get theme directly from the context here
  const { theme, themeName } = useTheme(); 
    
  return (
    // Pass the correct theme and themeName to the styled component
    <PreviewWrapper ref={ref} themeName={themeName} theme={theme}>
      <Header theme={theme}>
        <Name theme={theme}>{resumeData.personalInfo.name}</Name>
        <ContactInfo>
          <div><FaEnvelope /> {resumeData.personalInfo.email}</div>
          <div><FaPhone /> {resumeData.personalInfo.phone}</div>
          <div><FaLinkedin /> {resumeData.personalInfo.linkedin}</div>
          <div><FaGlobe /> {resumeData.personalInfo.portfolio}</div>
        </ContactInfo>
      </Header>

      <Section>
        <SectionTitle theme={theme}>Education</SectionTitle>
        {resumeData.education.map((edu, i) => (
          <div key={i} style={{marginBottom: '1rem'}}>
            <ItemHeader>{edu.institution}</ItemHeader>
            <ItemSubheader themeName={themeName} theme={theme}>{edu.degree} | {edu.duration}</ItemSubheader>
            <Description>{edu.description}</Description>
          </div>
        ))}
      </Section>

      <Section>
        <SectionTitle theme={theme}>Experience</SectionTitle>
        {resumeData.experience.map((exp, i) => (
          <div key={i} style={{marginBottom: '1rem'}}>
            <ItemHeader>{exp.company}</ItemHeader>
            <ItemSubheader themeName={themeName} theme={theme}>{exp.role} | {exp.duration}</ItemSubheader>
            <Description>{exp.description}</Description>
          </div>
        ))}
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>Projects</SectionTitle>
        {resumeData.projects.map((proj, i) => (
          <div key={i} style={{marginBottom: '1rem'}}>
            <ItemHeader>{proj.title}</ItemHeader>
            <ItemSubheader themeName={themeName} theme={theme}>Tech: {proj.techStack}</ItemSubheader>
            <Description>{proj.description} (<a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{color: theme.primary}}>Link</a>)</Description>
          </div>
        ))}
      </Section>

      <Section>
        <SectionTitle theme={theme}>Skills</SectionTitle>
        {resumeData.skills.map((skill, i) => (
          <Skill key={i}>
            <SkillName>{skill.name}</SkillName>
            <ProficiencyBar theme={theme}>
              <ProficiencyFill level={skill.level} theme={theme}/>
            </ProficiencyBar>
          </Skill>
        ))}
      </Section>

    </PreviewWrapper>
  );
});

export default LivePreview;