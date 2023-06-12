import { useState, useEffect } from 'react';

function getSavedValue(key: string, initialValue: any) {
    try {
        const savedValue = JSON.parse(localStorage.getItem(key) || "");
        if (savedValue || savedValue === false) return savedValue;
    } catch (e) {
        console.log({ e, key, initialValue });
    }

    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}



export default function useLocalStorage(key: string, initialValue: any) {
    const [value, setValue] = useState(() => (getSavedValue(key, initialValue)));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}