import { Story, Meta } from '@storybook/react/types-6-0';
import { ProcessedPiu } from 'interfaces';
import React from 'react';
import LikeR from 'assets/LikeR.svg';
import StarY from 'assets/StarY.svg';
import PiuCard from '.';

export default {
    title: 'Commons/PiuCard',
    component: PiuCard,
    args: {
        user: {
            photo: 'https://i.imgur.com/162UmfZ.jpg',
            first_name: 'Bruno'
        },
        likes: [[], [], [], [], []],
        text: 'mano do ceu',
        favd: StarY,
        liked: LikeR,
        mine: true
    }
} as Meta;

export const Default: Story<ProcessedPiu> = (args) => <PiuCard {...args} />;
