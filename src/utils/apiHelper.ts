import {history} from "./common.ts";
import {AUTH_USER} from "./apiRoute.ts";

const BASE_URL = "http://localhost:3000";

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
            return {
                data : []
            };
        }
        if (response.status === 500) {
            alert("An error occurred performing the request");
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
        if (response.status === 401) {
            if (endpoint === AUTH_USER){
                alert("Invalid credentials")
            }
            history.navigate('/signin')
            return [];
        }
        if (response.status === 500) {
            alert("An error occurred performing the request");
        }
        const json = await response.json();
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
            history.navigate('/signin')
            return {
                data : []
            };
        }
        if (response.status === 500) {
            alert("An error occurred performing the request");
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
        if (response.status === 401) {
            history.navigate('/signin')
            return [];
        }
        const json = await response.json();
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
            history.navigate('/signin')
            return [];
        }
        if (response.status === 500) {
            alert("An error occurred performing the request");
        }
        if (response.status === 400) {
            response.json().then((data)=>{
                alert(data.description)
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
                alert("Invalid credentials")
            }
            history.navigate('/signin')
            return [];
        }
        if (response.status === 500) {
            alert("An error occurred performing the request");
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};