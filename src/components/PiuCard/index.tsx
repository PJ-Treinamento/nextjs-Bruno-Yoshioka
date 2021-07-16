import React from 'react';
import LikeR from '../../assets/LikeR.svg';
import StarA from '../../assets/StarA.svg';
import trash from '../../assets/trash.svg';
import * as S from './styles';

interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    about: string;
    photo: string;
    pius: Piu[];
    likes: PiuLike[];
    following: User[];
    followers: User[];
    favorites: Piu[];
}

export type Piu = {
    id: string;
    user: User;
    likes: number;
    text: string;
};

interface PiuLike {
    id: string;
    user: User;
    piu: Piu;
}

const PiuCard: React.FC<Piu> = ({ user, likes, text }) => {
    return (
        <>
            <S.Card>
                <S.CardHeader>
                    <S.User>
                        <S.UserImage src={user.photo} alt="user_photo" />
                        <S.UserName>{user.firstName}</S.UserName>
                    </S.User>
                    <S.Buttons>
                        <S.ImgButtonD src={trash} alt="Buttons" />
                    </S.Buttons>
                </S.CardHeader>
                <S.PiuText>{text}</S.PiuText>
                <S.CardF>
                    <S.Buttons>
                        <S.ImgButtonL src={LikeR} />
                        {likes} likes
                    </S.Buttons>
                    <S.Buttons>
                        <S.ImgButtonF src={StarA} />
                    </S.Buttons>
                </S.CardF>
            </S.Card>
        </>
    );
};

export default PiuCard;
