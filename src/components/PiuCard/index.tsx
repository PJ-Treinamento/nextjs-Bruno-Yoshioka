import { User, PiuLike } from 'interfaces';
import { parseCookies } from 'nookies';
import React, { useState } from 'react';
import api from 'services/api';
import LikeR from '../../assets/LikeR.svg';
import StarA from '../../assets/StarA.svg';
import trash from '../../assets/trash.svg';
import profile from '../../assets/Profile.svg';
import * as S from './styles';

interface NovoPiu {
    id: string;
    user: User;
    likes: PiuLike[];
    text: string;
}

const PiuCard: React.FC<NovoPiu> = ({ id, user, likes, text }) => {
    let { photo } = user;
    if (photo === '.....') photo = profile;
    const { 'piupiuwerAuth.token': token } = parseCookies();
    const { 'piupiuwerAuth.username': username } = parseCookies();
    const [displayed, setDisplayed] = useState(true);

    const deletePiu = async () => {
        if (user.username === username) {
            await api.delete('/pius', {
                data: { piu_id: id },
                headers: { Authorization: `Bearer ${token}` }
            });
            setDisplayed(false);
        }
    };

    return (
        <>
            <S.Card displayed={displayed}>
                <S.CardHeader>
                    <S.User>
                        <S.UserImage
                            src={photo || profile}
                            alt="user_photo"
                            width={50}
                            height={50}
                        />
                        <S.UserName>{user.first_name}</S.UserName>
                    </S.User>
                    <S.Buttons onClick={() => deletePiu()}>
                        <S.ImgButtonD
                            src={trash}
                            alt="Buttons"
                            width={30}
                            height={30}
                        />
                    </S.Buttons>
                </S.CardHeader>
                <S.PiuText>{text}</S.PiuText>
                <S.CardF>
                    <S.Buttons>
                        <S.ImgButtonL src={LikeR} width={30} height={30} />
                        {likes.length} likes
                    </S.Buttons>
                    <S.Buttons>
                        <S.ImgButtonF src={StarA} width={30} height={30} />
                    </S.Buttons>
                </S.CardF>
            </S.Card>
        </>
    );
};

export default PiuCard;
