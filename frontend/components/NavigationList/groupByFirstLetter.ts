import {NavigationListGroupInterface, NavigationListItemInterface} from "./NavigationListInterfaces";

interface GroupListItem{
    [index:string]:NavigationListItemInterface[];
}

export const groupByFirstLetter = (listKey:string, items:NavigationListItemInterface[]):NavigationListGroupInterface[] => {

    const seedGroup:GroupListItem = {};

    let group = items.reduce((r:GroupListItem, e) => {

        let firstLetter = e.text[0].toUpperCase();

        firstLetter = firstLetter
            .replace('Ä', 'A')
            .replace('Ü', 'U')
            .replace('Ö', 'O')
        ;

        if(undefined === r[firstLetter]) {
            r[firstLetter] = []
        }

        r[firstLetter].push(e);

        return r;

    }, seedGroup);

    const ordered:GroupListItem = {};
    Object.keys(group).sort().forEach(function(key) {
        ordered[key] = group[key];
    });

    const pinnedSubheaderListGroupProps:NavigationListGroupInterface[] = [];

    for(const key in ordered){

        const pinnedGroup: NavigationListGroupInterface = {
            key: `${listKey}-${key.toLowerCase()}`,
            text: key,
            items: ordered[key],
        };

        pinnedSubheaderListGroupProps.push(pinnedGroup);

    }

    return pinnedSubheaderListGroupProps;

}