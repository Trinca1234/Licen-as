export function DeleteUserDataCookie() {
    try {
        const pastDate = new Date(0).toUTCString();

        document.cookie = "userData=; expires=" + pastDate;

        console.log("userData cookie deleted");
    } catch (error) {
        console.error("Error:", error);
    }
}

