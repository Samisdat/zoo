import {Animal} from "../../../../strapi-api/entity/animal/animal";

export const getTaxonomyCounted = (animals: Animal[]) => {

    const taxonomyCounted = animals.reduce((uniqueAndCounted, animal) => {

        if (!animal.taxonomy.className) {
            return uniqueAndCounted;
        }

        const already = uniqueAndCounted.find((prev) => {
                return (animal.taxonomy.className === prev.key)
            }
        );

        if (undefined !== already) {
            already.count += 1;
        } else {
            const newElem = {
                key: animal.taxonomy.className,
                count: 1,
                members: []
            }

            uniqueAndCounted.push(newElem);
        }

        return uniqueAndCounted;
    }, []);

    const fillMembers = (className, filterClassname) => {

        const taxonomyClass = filterClassname.find((oneFilterClassname) => {
            return (className === oneFilterClassname.key)
        });

        const menbers = animals.reduce((uniqueAndCounted, animal) => {

            if (!animal.taxonomy.className) {
                return uniqueAndCounted;
            }

            if (!animal.taxonomy.order) {
                return uniqueAndCounted;
            }

            if (className !== animal.taxonomy.className) {
                return uniqueAndCounted;
            }

            const already = uniqueAndCounted.find((prev) => {
                    return (animal.taxonomy.order === prev.key)
                }
            );

            if (undefined !== already) {
                already.count += 1;
            } else {
                const newElem = {
                    key: animal.taxonomy.order,
                    count: 1,
                    members: []
                }

                uniqueAndCounted.push(newElem);
            }

            return uniqueAndCounted;
        }, []);

        taxonomyClass.members = menbers;

    };

    for (const filterClassname of taxonomyCounted) {
        fillMembers(filterClassname.key, taxonomyCounted);


    }

    taxonomyCounted.sort((valueA, valueB)=>{

        const firstCount = valueA.count;
        const secondCount = valueB.count;

        return (secondCount - firstCount);

    });

    for(const classCounted of taxonomyCounted){

        classCounted.members.sort((valueA, valueB)=>{

            const firstCount = valueA.count;
            const secondCount = valueB.count;

            return (secondCount - firstCount);

        });

    }


    return taxonomyCounted;

}