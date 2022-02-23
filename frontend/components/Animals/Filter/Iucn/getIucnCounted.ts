import {Animal} from "strapi-api/entity/animal/animal";

export const getIucnCounted = (animals: Animal[]) => {

    const iucnCounted = animals.reduce((uniqueAndCounted, animal) => {

        if (!animal.iucnStatus) {
            return uniqueAndCounted;
        }

        const already = uniqueAndCounted.find((prev) => {
                return (animal.iucnStatus === prev.key)
            }
        );

        if (undefined !== already) {
            already.count += 1;
        } else {
            const newElem = {
                key: animal.iucnStatus,
                count: 1,
            }

            uniqueAndCounted.push(newElem);
        }

        return uniqueAndCounted;
    }, []);

    return iucnCounted;

}