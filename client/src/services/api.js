import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials:true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error) => {
    return Promise.reject(error);
})

api.interceptors.response.use((response) => 
    response,
    async(error) => {
       
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest?._retry){
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/users/refresh-token`, 
                    {},
                    {withCredentials: true});

                const newAccessToken = res.data.accessToken;
                localStorage.setItem("token", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("token");
               
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
            return Promise.reject(error);
    })

export default  api;