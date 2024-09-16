export const getURLParams = (url) => {
    const params = new URLSearchParams(url.split('?')[1]);
    return Object.fromEntries(params.entries());
};
