import styled from 'styled-components';

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    font-size: 1.4rem;
    background: transparent;
    border: 0.5px solid var(--mainDark);
    border-color: ${props => props.cart ? "var(--mainOrange)" : "var(--mainDark)"};
    color: ${prop => prop.cart ? "var(--mainOrange)" : "var(--mainDark)"};
    border-radius: 5px;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem 0.5rem 0.2rem;
    transition:all 0.3s ease-in-out;
    &:hover {
        background: ${props => props.cart ? "var(--mainOrange)" : "var(--lightDark)"} ;
        color: var(--mainDark);
    }
    &:focus {
        outline: none;
    }
`;