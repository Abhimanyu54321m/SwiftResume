import React from 'react';
import styled from 'styled-components';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';

// --- STYLED COMPONENTS ---

const FormWrapper = styled.div`
  flex: 1;
  max-width: 600px;
  background-color: ${props => props.theme.secondary};
  padding: 2rem;
  border-radius: 12px;
  overflow-y: auto;
  max-height: calc(100vh - 150px); /* Adjust based on header height */
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.primary};
  border-bottom: 2px solid ${props => props.theme.borderColor};
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
  resize: vertical;
  min-height: 80px;
`;

const DynamicSection = styled.div`
    border: 1px solid ${props => props.theme.borderColor};
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.primary};
    cursor: pointer;
    font-size: 1.2rem;
    transition: color 0.2s ease;
    
    &:hover {
        color: #e94560; /* A contrasting color */
    }
`;


// --- FORM COMPONENT ---

const FormSection = ({ resumeData, setResumeData }) => {
    
  const handleChange = (e, section, index = null, field) => {
    const { value } = e.target;
    const newData = { ...resumeData };

    if (index !== null) {
      newData[section][index][field] = value;
    } else {
      newData[section][field] = value;
    }
    setResumeData(newData);
  };
  
  const handleAddItem = (section) => {
    const newItem = section === 'education' 
        ? { institution: '', degree: '', duration: '', description: '' }
        : section === 'experience'
        ? { company: '', role: '', duration: '', description: '' }
        : section === 'skills'
        ? { name: '', level: 50 }
        : { title: '', description: '', techStack: '', link: '' };

    setResumeData(prev => ({...prev, [section]: [...prev[section], newItem]}));
  };

  const handleRemoveItem = (section, index) => {
    const items = [...resumeData[section]];
    items.splice(index, 1);
    setResumeData(prev => ({...prev, [section]: items}));
  };

  return (
    <FormWrapper>
      {/* Personal Info */}
      <Section>
        <SectionTitle>Personal Information</SectionTitle>
        {Object.keys(resumeData.personalInfo).map(key => (
          <InputGroup key={key}>
            <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
            <Input
              type="text"
              value={resumeData.personalInfo[key]}
              onChange={e => handleChange(e, 'personalInfo', null, key)}
            />
          </InputGroup>
        ))}
      </Section>

      {/* Education */}
      <Section>
        <SectionTitle>Education</SectionTitle>
        {resumeData.education.map((edu, index) => (
          <DynamicSection key={index}>
             <ActionButton onClick={() => handleRemoveItem('education', index)} style={{float: 'right'}}><FaTrash /></ActionButton>
             {Object.keys(edu).map(key => (
                <InputGroup key={key}>
                    <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    <Input
                        type="text"
                        value={edu[key]}
                        onChange={e => handleChange(e, 'education', index, key)}
                    />
                </InputGroup>
            ))}
          </DynamicSection>
        ))}
        <ActionButton onClick={() => handleAddItem('education')}><FaPlusCircle /> Add Education</ActionButton>
      </Section>

      {/* Experience */}
      <Section>
        <SectionTitle>Experience</SectionTitle>
         {resumeData.experience.map((exp, index) => (
          <DynamicSection key={index}>
             <ActionButton onClick={() => handleRemoveItem('experience', index)} style={{float: 'right'}}><FaTrash /></ActionButton>
             {Object.keys(exp).map(key => (
                <InputGroup key={key}>
                    <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    {key === 'description' ? (
                       <TextArea value={exp[key]} onChange={e => handleChange(e, 'experience', index, key)} />
                    ) : (
                       <Input type="text" value={exp[key]} onChange={e => handleChange(e, 'experience', index, key)} />
                    )}
                </InputGroup>
            ))}
          </DynamicSection>
        ))}
        <ActionButton onClick={() => handleAddItem('experience')}><FaPlusCircle /> Add Experience</ActionButton>
      </Section>

      {/* Skills */}
      <Section>
        <SectionTitle>Skills</SectionTitle>
        {resumeData.skills.map((skill, index) => (
          <DynamicSection key={index}>
            <ActionButton onClick={() => handleRemoveItem('skills', index)} style={{float: 'right'}}><FaTrash /></ActionButton>
            <InputGroup>
                <Label>Skill Name</Label>
                <Input type="text" value={skill.name} onChange={e => handleChange(e, 'skills', index, 'name')} />
            </InputGroup>
            <InputGroup>
                <Label>Proficiency</Label>
                <Input type="range" min="0" max="100" value={skill.level} onChange={e => handleChange(e, 'skills', index, 'level')} />
            </InputGroup>
          </DynamicSection>
        ))}
         <ActionButton onClick={() => handleAddItem('skills')}><FaPlusCircle /> Add Skill</ActionButton>
      </Section>
      
      {/* Projects */}
       <Section>
        <SectionTitle>Projects</SectionTitle>
        {resumeData.projects.map((proj, index) => (
          <DynamicSection key={index}>
             <ActionButton onClick={() => handleRemoveItem('projects', index)} style={{float: 'right'}}><FaTrash /></ActionButton>
             {Object.keys(proj).map(key => (
                <InputGroup key={key}>
                    <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    <Input type="text" value={proj[key]} onChange={e => handleChange(e, 'projects', index, key)} />
                </InputGroup>
            ))}
          </DynamicSection>
        ))}
        <ActionButton onClick={() => handleAddItem('projects')}><FaPlusCircle /> Add Project</ActionButton>
      </Section>

    </FormWrapper>
  );
};

export default FormSection;