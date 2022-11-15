import React from 'react';
import {Text} from "./Text";

export default {
    title: 'Content/Text',
    component: Text,
    argTypes:{
        type: {
            table: {
                disable: true
            }
        }
    }
};

const Template = (args) => <Text {...args} />;

export const Two = Template.bind({});

Two.args = {
    text: 'Seit der [ersten Tierarztkontrolle](https://www.zoo.ch/de/zoonews/erster-tierarztcheck-der-jungen-schneeleoparden) am 20. Juni wissen wir, dass es sich bei den beiden Jungtieren um ein Weibchen und ein Männchen handelt. Ihre Namen haben wir im Rahmen einer [Online-Abstimmung](https://www.zoo.ch/de/zoonews/mitbestimmen-namen-fuer-die-schneeleoparden) ermittelt. Die meisten Stimmen erhielten Wajra für das Weibchen und Warjun für das Männchen.'
};
