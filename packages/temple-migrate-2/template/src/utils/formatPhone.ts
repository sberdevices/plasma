export const normalizePhone = (value: string) => {
    const phone = value.replace(/[+()-]/g, '');
    return `+7${phone.length === 11 ? phone.slice(1) : phone}`;
};

export const formatPhone = (value: string) => {
    const phone = normalizePhone(value);
    return `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10)}`;
};
