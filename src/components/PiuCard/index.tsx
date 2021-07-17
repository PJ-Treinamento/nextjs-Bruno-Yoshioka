import { ProcessedPiu } from 'interfaces';
import { parseCookies } from 'nookies';
import React, { useState } from 'react';
import api from 'services/api';
import Like from 'assets/Like.svg';
import LikeR from 'assets/LikeR.svg';
import Star from 'assets/Star.svg';
import StarY from 'assets/StarY.svg';
import trash from 'assets/trash.svg';
import profile from '../../assets/Profile.svg';
import * as S from './styles';

const PiuCard: React.FC<ProcessedPiu> = ({
    id,
    user,
    likes,
    text,
    liked,
    favd,
    mine
}) => {
    let { photo } = user;
    if (photo === '.....') photo = profile;
    const { 'piupiuwerAuth.token': token } = parseCookies();
    const { 'piupiuwerAuth.username': username } = parseCookies();
    const [isLiked, setIsLiked] = useState(liked);
    const [isFavd, setIsFavd] = useState(favd);
    const [likeCounter, setLikeCounter] = useState(likes.length);
    const [displayed, setDisplayed] = useState(true);

    const likePiu = async (piuId: string) => {
        const response = await api.post(
            '/pius/like',
            { piu_id: piuId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.operation === 'like') {
            setIsLiked(LikeR);
            setLikeCounter(likeCounter + 1);
        } else {
            setIsLiked(Like);
            setLikeCounter(likeCounter - 1);
        }
    };

    const favPiu = async (piuId: string) => {
        if (isFavd === Star) {
            setIsFavd(StarY);
            await api.post(
                '/pius/favorite',
                { piu_id: piuId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } else {
            setIsFavd(Star);
            await api.post(
                '/pius/unfavorite',
                { piu_id: piuId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        }
    };

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
            <S.Card displayed={displayed} key={id}>
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
                    <S.DelButton onClick={() => deletePiu()} mine={mine}>
                        <S.ImgButtonD
                            src={trash}
                            alt="Buttons"
                            width={30}
                            height={30}
                        />
                    </S.DelButton>
                </S.CardHeader>
                <S.PiuText>{text}</S.PiuText>
                <S.CardF>
                    <S.Buttons>
                        <S.ImgButtonL
                            onClick={() => likePiu(id)}
                            src={isLiked}
                            width={30}
                            height={30}
                        />
                        <S.LikeText>{likeCounter} likes</S.LikeText>
                    </S.Buttons>
                    <S.Buttons>
                        <S.ImgButtonF
                            onClick={() => favPiu(id)}
                            src={isFavd}
                            width={30}
                            height={30}
                        />
                    </S.Buttons>
                </S.CardF>
            </S.Card>
        </>
    );
};

export default PiuCard;
