import styled from 'styled-components';
import Image from 'next/image';

export const Card = styled.div<{ displayed: boolean }>`
    display: ${(props) => (props.displayed ? 'flex' : 'none')};
    width: 100%;
    height: auto;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 8px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: #685b7c;
`;

export const CardHeader = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const User = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const UserImage = styled(Image)`
    background: cover;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 16px;
`;

export const UserName = styled.h3`
    margin-left: 8px;
    font-size: medium;
    color: #ffffff;
`;

export const PiuText = styled.p`
    font-size: medium;
    margin-top: 10px;
    color: #ffffff;
`;

export const CardF = styled.div`
    margin-top: 10px;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Buttons = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 8px;
    padding: 2px;

    :hover {
        background-color: #ff85a1;
        opacity: 100%;
        cursor: pointer;
    }
`;

export const DelButton = styled.button<{ mine: boolean }>`
    display: ${(props) => (props.mine === true ? 'flex' : 'none')};
    background: none;
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: space-around;
    border-radius: 8px;
    padding: 2px;
`;

export const ImgButtonL = styled(Image)`
    height: 30px;
    width: 30px;
`;
export const ImgButtonF = styled(Image)`
    height: 30px;
    width: 30px;
`;

export const LikeText = styled.p`
    margin-left: 8px;
    color: white;
`;

export const ImgButtonD = styled(Image)`
    height: 30px;
    width: 30px;
`;
