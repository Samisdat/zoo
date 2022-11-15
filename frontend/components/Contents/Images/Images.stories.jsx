import React from 'react';
import {Images} from "./Images";

export default {
    title: 'Content/Images',
    component: Images,
    argTypes:{
        type: {
            table: {
                disable: true
            }
        }
    }
};

const Template = (args) => <Images {...args} />;

export const Two = Template.bind({});

Two.args = {
    images: [{"id":113,"title":"1772-24180.jpeg","copyright":"Zoo Zürich, Enzo Franchini","thumbnail":{"width":245,"height":138,"src":"/uploads/thumbnail_1772_24180_4be4b4f2fb.jpeg"},"small":{"width":500,"height":281,"src":"/uploads/small_1772_24180_4be4b4f2fb.jpeg"},"medium":{"width":750,"height":422,"src":"/uploads/medium_1772_24180_4be4b4f2fb.jpeg"},"large":{"width":1000,"height":563,"src":"/uploads/large_1772_24180_4be4b4f2fb.jpeg"},"focalPoint":{"x":50,"y":50},"caption":"Grumpy Cat? Warjun","alternativeText":"Grumpy Cat? Warjun"},{"id":112,"title":"1772-24228.jpeg","copyright":"Zoo Zürich, Peter Bolliger","thumbnail":{"width":245,"height":138,"src":"/uploads/thumbnail_1772_24228_643386c830.jpeg"},"small":{"width":500,"height":281,"src":"/uploads/small_1772_24228_643386c830.jpeg"},"medium":{"width":750,"height":422,"src":"/uploads/medium_1772_24228_643386c830.jpeg"},"large":{"width":1000,"height":563,"src":"/uploads/large_1772_24228_643386c830.jpeg"},"focalPoint":{"x":50,"y":50},"caption":"Gut getarnt im Fels","alternativeText":"Gut getarnt im Fels"}]
};
