import styled from 'styled-components';

export const StyledRoundCheckbox = styled.div<{ $isDisable?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 0.5rem;
    width: 6rem;
    
    label {
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 50%;
      height: 28px;
      left: 0;
      position: absolute;
      top: 0;
      width: 28px;
      cursor: ${(props) => props.$isDisable ? 'not-allowed' : 'pointer'}
    }
    
    label:after {
      border: 2px solid #fff;
      border-radius: 20px;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      top: 3px;
      opacity: 0;
      position: absolute;
      background: #2693e6;
    }
    
    input[type="checkbox"] {
      visibility: hidden;
    }
    
    input[type="checkbox"]:checked + label {
      background-color: #fff;
      border-color: #4c6db9;
    }
    
    input[type="checkbox"]:checked + label:after {
      opacity: 1;
    }
`;