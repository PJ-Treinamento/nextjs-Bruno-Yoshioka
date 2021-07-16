import styled from 'styled-components';
import Image from 'next/image';

export const Header = styled.header`
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    background-color: #685b7c;
    padding-left: 20px;
    padding-right: 20px;

    h1 {
        font: 500;
        color: #3f3d56;
    }

    @media (max-width: 650px) {
        h1 {
            display: none;
        }
    }
`;

export const Feed = styled.div`
    width: 100%;
    background-color: #3f3d56;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    > div:nth-child(1) {
        position: fixed;
        width: 700px;
        height: 140px;
        top: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background-color: #3f3d56;
        z-index: 1;
        border-bottom: 2px inset #98989f;

        > textarea {
            margin-top: 8px;
            height: 100%;
            width: 60%;
            resize: none;
            border: none;
            border-radius: 8px;
            padding: 8px;
        }

        > div {
            margin-top: 8px;
            width: 60%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding-left: 8px;
            > button {
                border: none;
                width: 30%;
                height: 100%;
                background-color: #ff477e;
                color: #ffffff;
                font-size: medium;
                cursor: pointer;
                border-radius: 8px;
                :hover {
                    color: #685b7c;
                }
            }
        }
    }

    > div:nth-child(2) {
        margin-top: 240px;
        width: 690px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 740px) {
        > div:nth-child(1) {
            width: 400px;
        }
        > div:nth-child(2) {
            width: 390px;
        }
    }
`;

export const Contagem = styled.p<{ overLimit: boolean }>`
    color: ${(props) => (props.overLimit ? 'red' : 'white')};
`;

export const Imagem = styled(Image)`
    height: 64px;
    width: 64px;
    cursor: pointer;
    animation: rotation 10s infinite linear;
    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
`;

export const Search = styled.input`
    height: 30px;
    width: 200px;
    border-radius: 8px;
    border: 1px solid #98989f;
    margin-right: 16px;
    padding-left: 8px;
    outline: none;
`;

export const Logout = styled.button`
    padding: 10px;
    background-color: #3f3d56;
    color: #f1f1f1;
    border-radius: 8px;
    cursor: pointer;
    border: none;
`;

export const Piar = styled.input`
    height: 200px;
    width: 200px;
    background-color: yellow;
`;

export const TxtArea = styled.textarea<{ overLimit: boolean }>`
    font-size: small;
    color: ${(props) => (props.overLimit ? 'red' : 'black')};
    outline: none;
`;
