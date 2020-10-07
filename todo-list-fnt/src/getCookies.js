const getCookies = (cookieName) => {
    const name = cookieName + "=";
    const allCookieArray = document.cookie.split(';');

    for(let i = 0; i < allCookieArray.length; i++){
        let temp = allCookieArray[i].trim();
        if(temp.indexOf(name) === 0)
            return temp.substring(name.length, temp.length);
    }

    return "";
}

export default getCookies;