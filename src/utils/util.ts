export const priceFormatter = (price: number) =>
    new Intl.NumberFormat("uz-Uz", {
        maximumFractionDigits: 5,
    }).format(price) || "0";

export const priceFormatter2 = (price?: number) => {
    if (!price) return "";
    const str = price.toString();
    const index = str.indexOf(".");
    if (index > -1)
        return (
            new Intl.NumberFormat("uz-Uz").format(+str.slice(0, index)) +
            str.slice(index)
        );
    else return new Intl.NumberFormat("uz-Uz").format(price);
};
