export const addPolyfill = () => {

    SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement ||        function(toElement) {

        return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());

    };

};

