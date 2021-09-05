/* Price filtering for the Conran Shop website

https://www.conranshop.co.uk/outlet.html

*/

const extractNumberFromDiscountText = (text) => {
    /*  text will be a string in any of the following forms:

      - "-50%"
      - "NOW -50%"

    */
    if (text) {
        const discountPercentAsString = text.match(/(?!-)\d+(?=%)/);
        return parseInt(discountPercentAsString);
    } else {
        return NaN;
    }
}

const getProducts = () => {
    const LABEL_CLASS = 'product-item';
    return document.getElementsByClassName(LABEL_CLASS);
}

const getLabelElementForProduct = (product) => {
    const LABEL_CLASS = 'value';
    return product.getElementsByClassName(LABEL_CLASS)[0];
}

const getDiscountValue = (product) => {
    const label = getLabelElementForProduct(product);
    return label ? extractNumberFromDiscountText(label.textContent) : NaN;
}

const filter = (threshold) => {
    /*  threshold: only see items discounted by more than this (%)  */

    const counter = {
        hidden: 0,
        unhidden: 0,
        noValue: 0,
        aboveThreshold: 0,
        belowThreshold: 0
    };

    const products = getProducts();
    for (let product of products) {
        const discountValue = getDiscountValue(product);
        // use element.style.visibility as state instead of element.hidden
        // conran shop CSS overrides default element.hidden display properties
        if (!discountValue) {
            product.style.visibility = 'hidden';
            counter.hidden += 1;
        }
        if (discountValue >= threshold) {
            counter.aboveThreshold += 1;
            if (product.style.visibility === 'hidden') {
                product.style.visibility = 'visible';
                counter.unhidden += 1;
            }
        } else if (discountValue < threshold) {
            counter.belowThreshold += 1;
            if (product.style.visibility !== 'hidden') {
                product.style.visibility = 'hidden';
                counter.hidden += 1;
            }
        }
    }

    console.log(
        `set threshold to ${threshold}%, leaving ${counter.aboveThreshold} items visible (from an initial ${products.length}).\n` +
        `${counter.hidden} items were hidden and ${counter.unhidden} items were unhidden.`
    );
}