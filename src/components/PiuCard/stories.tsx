import { Story, Meta } from '@storybook/react/types-6-0';
import { Piu } from 'interfaces';
import React from 'react';
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
        text: 'mano do ceu'
    }
} as Meta;

export const Default: Story<Piu> = (args) => <PiuCard {...args} />;
