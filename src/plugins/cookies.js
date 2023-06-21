import parseJwt from "@/plugins/parseJwt";

const setCookies = (username, value, { datetime }) => {
    const d = new Date();
    if (datetime) d.setTime(datetime);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${username}=${value};${expires};path=/;`;
};

const getCookies = (username) => {
    const cookies = `; ${document.cookie}`;
    const byValue = cookies.split(`; ${username}=`);
    if (byValue.length === 2) return byValue.pop().split(";").shift();
};

const delCookies = (username) => {
    setCookies(username, "", -1);
};

const certCookies = () => {
    const token = getCookies("CERT");
    if (token) {
        const { id_user, n: username, ri: exp } = parseJwt(token);
        if (!id_user) return delCookies("CERT");
        return {
            id_user,
            username,
            exp,
        };
    }
    return {
        id_user: undefined,
        username: undefined,
        exp: undefined,
    };
};

export { setCookies, getCookies, delCookies, certCookies };