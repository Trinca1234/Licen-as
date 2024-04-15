import { parse } from "cookie";

export function GetCookie() {
    try {
        const cookies = parse(document.cookie || "");

        const userDataCookie = cookies.userData;

        if (userDataCookie) {
            const userData = JSON.parse(userDataCookie);

            const user = userData.user;
            return user;
        } else {
            console.log("userData cookie not found");
            return null;
        }

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export function DeleteUserDataCookie() {
    try {
        const pastDate = new Date(0).toUTCString();

        document.cookie = "userData=; expires=" + pastDate;

        console.log("userData cookie deleted");
    } catch (error) {
        console.error("Error:", error);
    }
}

