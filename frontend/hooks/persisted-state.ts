import  {useState, useEffect} from "react";

export const usePersistedState = (key, defaultValue) => {
    const [state, setState] = useState(
        () =>  defaultValue
    );
    useEffect(() => {

        // not yet set at all, so store default value
        if(null === localStorage.getItem(key)){
            localStorage.setItem(key, JSON.stringify(state));
        }

        localStorage.setItem(key, JSON.stringify(state));

    }, [key, state]);
    return [state, setState];
}
