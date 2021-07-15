import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import PiuCard, { Piu } from '.';

export default {
    title: 'Commons/PiuCard',
    component: PiuCard,
    args: {
        user: {
            photo: 'https://i.imgur.com/162UmfZ.jpg',
            firstName: 'Bruno'
        },
        likes: 5,
        text: 'mano do ceu'
    }
} as Meta;

export const Default: Story<Piu> = (args) => <PiuCard {...args} />;
