import { InterfaceTimeline, ProcessedPiu } from 'interfaces';
import React, { useEffect, useState } from 'react';
import Like from 'assets/Like.svg';
import LikeR from 'assets/LikeR.svg';
import Star from 'assets/Star.svg';
import StarY from 'assets/StarY.svg';
import PiuCard from 'components/PiuCard';

const Timeline: React.FC<InterfaceTimeline> = ({ pius, search, user }) => {
    const [processedPius, setProcessedPius] = useState<ProcessedPiu[]>([]);

    useEffect(() => {
        const getProcessedPius = async () => {
            const array = [];
            for (let i = 0; i < pius.length; i++) {
                let liked = Like;
                pius[i].likes.forEach((like) => {
                    if (like.user.username === user?.username) liked = LikeR;
                });
                let favd = Star;
                user?.favorites?.forEach((fav) => {
                    if (fav.id === pius[i].id) favd = StarY;
                });
                let mine = false;
                if (pius[i].user.username === user?.username) mine = true;
                array.push({
                    id: pius[i].id,
                    user: pius[i].user,
                    likes: pius[i].likes,
                    text: pius[i].text,
                    favd,
                    liked,
                    mine
                });
            }
            setProcessedPius(array);
        };
        getProcessedPius();
    }, [pius, user?.username, user?.favorites]);

    return (
        <>
            {processedPius.forEach((piu) => {
                if (
                    search === '' ||
                    piu.user.first_name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    piu.user.username
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    piu.text.toLowerCase().includes(search.toLowerCase())
                ) {
                    return (
                        <PiuCard
                            id={piu.id}
                            user={piu.user}
                            likes={piu.likes}
                            text={piu.text}
                            liked={piu.liked}
                            favd={piu.favd}
                            mine={piu.mine}
                        />
                    );
                }
                return <></>;
            })}
        </>
    );
};

export default Timeline;
