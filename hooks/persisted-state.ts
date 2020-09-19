import  {useState, useEffect} from "react";

export const usePersistedState = (key, defaultValue) => {
    const [state, setState] = useState(
        () =>  defaultValue
    );
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));

        console.log('usePersistedState')

    }, [key, state]);
    return [state, setState];
}
