import styled from 'styled-components';

interface ButtonContainerProps {
  align?: 'flex-start' | 'flex-end';
}

export const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;
  justify-content: ${(props) => props.align || 'flex-end'};
  margin-bottom: 24px;
`;
