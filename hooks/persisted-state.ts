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

        console.log();

        localStorage.setItem(key, JSON.stringify(state));

        console.log('usePersistedState')

    }, [key, state]);
    return [state, setState];
}
