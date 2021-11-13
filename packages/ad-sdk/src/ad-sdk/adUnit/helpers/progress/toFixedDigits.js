const toFixedDigits = (num, digits) => {
    let formattedNum = String(num);

    while (formattedNum.length < digits) {
        formattedNum = "0" + formattedNum;
    }

    return formattedNum;
};

export default toFixedDigits;
