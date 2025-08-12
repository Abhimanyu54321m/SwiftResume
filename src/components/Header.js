import React from 'react';
import styled from 'styled-components';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaFilePdf } from 'react-icons/fa';
import ThemeSelector from './ThemeSelector';
import { useTheme } from '../ThemeContext'; // Import useTheme hook

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.headerBg};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid ${props => props.theme.primary};
  position: sticky;
  top: 0;
  z-index: 10;
  
  /* Responsive styles */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${props => props.theme.primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
`;

const DownloadButton = styled.button`
  /* Correctly use the theme prop for background color */
  background-color: ${props => props.theme.primary};
  /* Set a contrasting text color */
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const Header = ({ previewRef }) => {
  // Get the theme object from the context
  const { theme } = useTheme();

  const handleDownloadPDF = () => {
    const input = previewRef.current;
    if (!input) return;

    // Give the canvas a background color to avoid transparent PDFs
    const originalBackgroundColor = input.style.backgroundColor;
    input.style.backgroundColor = theme.secondary;

    html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: theme.secondary,
    }).then((canvas) => {
      // Restore original background color after capture
      input.style.backgroundColor = originalBackgroundColor;
        
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;
      
      let position = 0;
      let heightLeft = height;

      if (height > pdfHeight) {
        pdf.addImage(imgData, 'PNG', 0, position, width, height);
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      }
      
      pdf.save('resume.pdf');
    });
  };

  return (
    // Pass the theme object to the styled components
    <HeaderWrapper theme={theme}>
      <Title theme={theme}>Dynamic Resume Builder 📝</Title>
      <Controls>
        <ThemeSelector />
        <DownloadButton theme={theme} onClick={handleDownloadPDF}>
          <FaFilePdf />
          Download PDF
        </DownloadButton>
      </Controls>
    </HeaderWrapper>
  );
};

export default Header;