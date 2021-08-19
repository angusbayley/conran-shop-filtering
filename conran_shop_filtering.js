/* Price filtering for the Conran Shop website

https://www.conranshop.co.uk/outlet.html


*/

const extractNumberFromDiscountText = (text) => {
    /*  text will be a string in the form "-50%"  */
    substring = text.substr(1, text.indexOf("%")-1);
    return parseInt(substring);
}

const filter = (threshold) => {
    /*  threshold: only see items discounted by more than this (%)  */

    const counter = {
        hidden: 0,
        unhidden: 0,
        aboveThreshold: 0,
        belowThreshold: 0
    };

    // TODO: extract DOM parsing rules for easier reading/updating...

    const discountLabels = document.getElementsByClassName('discount-label');
    for (let label of discountLabels) {
        parent = label.parentElement.parentElement;
        if (extractNumberFromDiscountText(label.innerText) >= threshold) {
            counter.aboveThreshold += 1;
            if (parent.hidden) {
                parent.hidden = false;
                counter.unhidden += 1;
            }
        }
        if (extractNumberFromDiscountText(label.innerText) < threshold) {
            counter.belowThreshold += 1;
            if (!parent.hidden) {
                parent.hidden = true;
                counter.hidden += 1;
            }
        }
    }

    console.log(
        `set threshold to ${threshold}%, leaving ${counter.aboveThreshold} items visible.\n` +
        `${counter.hidden} items were hidden and ${counter.unhidden} items were unhidden.`
    );
}