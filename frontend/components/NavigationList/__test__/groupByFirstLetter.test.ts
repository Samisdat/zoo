import {groupByFirstLetter} from "../groupByFirstLetter";
import {PinnedSubheaderListGroupProps, PinnedSubheaderListItemProps} from "../PinnedSubheaderList";

describe('groupByFirstLetter', () => {

    test('groupByFirstLetter', () => {

        const items:PinnedSubheaderListItemProps[] = [
            {
                key: 'two',
                href: '/two',
                text: 'Two'
            },
            {
                key: 'one',
                href: '/one',
                text: 'One'
            },
        ];

        const expectation:PinnedSubheaderListGroupProps[] = [{
            key: 'a-list-o',
            text: 'O',
            items: [items[1]],
            },{
            key: 'a-list-t',
            text: 'T',
            items: [items[0]],
        }
        ];

        expect(groupByFirstLetter('a-list', items)).toStrictEqual(expectation);


    });

});