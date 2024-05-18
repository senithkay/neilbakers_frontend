import {history} from "./common.ts";
import {AUTH_USER} from "./apiRoute.ts";



const BASE_URL = "https://neil-bakers.onrender.com";

interface Params {
    key: string;
    value: string | number | undefined;
}

const getPrams = (params: Params[]) => {
    let paramString = ''
    params.forEach((param)=>{
        paramString = paramString + '/' +param.value
    })
    return paramString;
}

export const sendGET = async (endpoint: string, params: Params[]) => {
   
   
    
    const paramsString = getPrams(params);
    try {

        const response = await fetch(`${BASE_URL}${endpoint}${paramsString}`, { credentials: 'include' });
        if (response.status === 401) {
            history.navigate('/signin')
            history.messageApi.open({
                type: "error",
                content: "Session expired",
            });
            return {
                data : []
            };
        }
        if (response.status === 500) {
            history.messageApi.open({
                type: "error",
                content: "An error occurred performing the request",
            });
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const sendPOST = async (endpoint: string, payload: any) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        });
        const json = await response.json();
        if (response.status === 401) {
            if (endpoint === AUTH_USER){
                return {
                    status: 0,
                    description:"Invalid username or password",
                };
            }
            history.messageApi.open({
                type: "error",
                content: "Session expired",
            });
            history.navigate('/signin')
            return [];
        }
        if (response.status === 500) {
            history.messageApi.open({
                type: "error",
                content: json.description,
            });
            return;

        }
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const sendGETPDF = async (endpoint: string, params: Params[]) => {
    const paramsString = getPrams(params);
    try {
        const response = await fetch(`${BASE_URL}${endpoint}${paramsString}`, { credentials: 'include' });
        if (response.status === 401) {
            history.messageApi.open({
                type: "error",
                content: "Session expired",
            });
            history.navigate('/signin')
            return {
                data : []
            };
        }

        if (response.status === 500) {
            history.messageApi.open({
                type: "error",
                content: "An error occurred performing the request",
            });
        }
        return response.blob()
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};



export const sendPOSTFORMDATA = async (endpoint: string, payload: any) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            body: payload,
            credentials :'include'
        });
        const json = await response.json();
        if (response.status === 401) {
            history.messageApi.open({
                type: "error",
                content: "Session expired",
            });
            history.navigate('/signin')
            return [];
        }
        if (response.status === 500) {
            history.messageApi.open({
                type: "error",
                content: json.description,
            });
        }
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export const sendDELETE = async (endpoint: string, params: Params[]) => {
    const paramsString = getPrams(params);
    try {
        const response = await fetch(`${BASE_URL}${endpoint}${paramsString}`, { credentials: 'include', method :'DELETE' });
        if (response.status === 401) {
            history.messageApi.open({
                type: "error",
                content: "Session expired",
            });
            history.navigate('/signin')
            return [];
        }
        if (response.status === 500) {
            history.messageApi.open({
                type: "error",
                content: "An error occurred performing the request",
            });
        }
        if (response.status === 400) {
            response.json().then((data)=>{
                history.messageApi.open({
                    type: "error",
                    content: data.description,
                });

            })
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const sendPUT = async (endpoint: string, params: Params[], payload: any) => {
    try {
        const paramsString = getPrams(params);
        const response = await fetch(`${BASE_URL}${endpoint}${paramsString}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        });
        if (response.status === 401) {
            if (endpoint === AUTH_USER){
                history.messageApi.open({
                    type: "error",
                    content: "Invalid credentials",
                });
            }
            history.messageApi.open({
                type: "error",
                content: "Session expired",
            });
            history.navigate('/signin')
            return [];
        }
        if (response.status === 500) {
            history.messageApi.open({
                type: "error",
                content: "An error occurred performing the request",
            });
        }
        else{
            history.messageApi.open({
                type: "success",
                content: 'Updated successfully',
            });
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};