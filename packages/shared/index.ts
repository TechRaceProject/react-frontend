let hostUrl = 'localhost:8000'

export const setHostUrl = (url: string) => {
    hostUrl = url;
};

export const getHostUrl = () => {
    return hostUrl;
};

export const add = (a: number, b: number) => {
    return a + b;
};
