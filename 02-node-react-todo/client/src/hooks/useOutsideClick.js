import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            const { target } = e;
            const { current } = ref;
            if (current && !current.contains(target)) {
                callback();
            };
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};

export default useOutsideClick;