function validateInn(companyINN: string): boolean {
    let result = false;

    if (/[^0-9]/.test(companyINN)) {
        return false;
    }

    if (![10, 12].includes(companyINN.length)) {
        return false;
    }

    const checkDigit = (inn: string, coefficients: number[]): number => {
        let n = 0;
        for (let i = 0; i < coefficients.length; i++) {
            n += coefficients[i] * Number(inn.charAt(i));
        }
        return n % 11 % 10;
    };

    if (companyINN.length === 10) {
        const n10 = checkDigit(companyINN, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
        result = n10 === Number(companyINN.charAt(9));
    } else if (companyINN.length === 12) {
        const n11 = checkDigit(companyINN, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        const n12 = checkDigit(companyINN, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        result = (n11 === Number(companyINN.charAt(10))) &&
            (n12 === Number(companyINN.charAt(11)));
    }

    return result;
}


export default validateInn;