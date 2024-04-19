import axios from "axios";
import { parse } from "cookie";
import queryString from "query-string";
import { DeleteUserDataCookie } from "./deleteCookie";

export function GetCookie() {
    try {
        const cookies = parse(document.cookie || "");

        const userDataCookie = cookies.userData;

        if (userDataCookie) {
            const userData = JSON.parse(userDataCookie);

            try {
                const isAtivo = async () => {
                    try {
                        const url = queryString.stringifyUrl({
                            url:"/api/login/ativo",
                            query:{
                                email: userData.user.EMail
                            }
                        });

                        const res = await axios.get(url);

                        if(res.status == 200){
                            if(res.data == false){
                                DeleteUserDataCookie()
                            }
                        }

                    } catch (error) {
                        console.log(error);
                    }
                };

                isAtivo();
                
            
              } catch (error) {
                console.log(error);
              }

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