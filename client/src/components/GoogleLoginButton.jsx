import api from "../services/api.js"
import { useEffect, useRef } from 'react';

const GoogleLoginButton = () => {

    const googleButtonRef = useRef(null);

    useEffect(() => {
        if(!window.google) return;

        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

            callback: async(response) => {
                try {
                    console.log("Google credential:", response.credential);

                    const res = await api.post("/auth/google/register", {
                        credential: response.credential,
                    })
                    console.log(res)
                    console.log("Backend response", res.data);

                    // save token 
                    localStorage.setItem(
                        "accessToken",
                        res.data.accessToken
                    )
                } catch (error) {
                    console.log("google login error", error.response?.data || error.message);
                }
            }
        },[]);
        window.google.accounts.id.renderButton(
            googleButtonRef.current,
            {
                theme: "outline",
                size: "large",
                width: 350,
                text: "continue_with"
            }
        )
    }, [])

  return (
    <div ref={googleButtonRef}>
      
    </div>
  )
}

export default GoogleLoginButton
