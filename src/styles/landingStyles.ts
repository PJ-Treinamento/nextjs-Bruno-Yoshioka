import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 100vh;
    width: 100vw;
    background-color: #e8e6f8;
    > div {
        height: 600px;
        width: 400px;
    }
    @media (max-width: 850px) {
        > div:nth-child(1) {
            display: none;
        }
    }
    @media (max-height: 650px) {
        > div {
            height: 400px;
        }
    }
`;

export const Esquerda = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

export const Imagem = styled(Image)`
    height: 200px;
    width: 200px;
`;

export const Nome = styled.h1`
    color: #ff477e;
`;

export const Slogan = styled.p`
    color: #000000;
`;

export const By = styled.p`
    color: #685b7c;
`;

export const Direita = styled.div`
    background-color: #ffffff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 16px;
`;

export const Log = styled.h2`
    color: #000000;
    font: bold;
    margin-bottom: 48px;
`;

export const Input = styled.input`
    width: 350px;
    height: 40px;
    margin-bottom: 16px;
    border: 1px solid black;
    border-radius: 4px;
`;

export const LogIn = styled.button`
    margin-top: 24px;
    width: 350px;
    height: 40px;
    background-color: #ff477e;
    color: #ffffff;
    font-size: large;
    cursor: pointer;
    border: none;
    border-radius: 8px;
`;
