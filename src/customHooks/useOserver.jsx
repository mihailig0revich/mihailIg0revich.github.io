import { useEffect, useRef } from "react";

export const useObserver = (ref, canLoad, isPostsLoading, cb, ...values) => {
    const observer = useRef()
    useEffect(() => {
        
        if (isPostsLoading) return;
        if (observer.current) observer.current.disconnect();
        const callback = function(entries) {
            
            if (entries[0].isIntersecting && canLoad) {
                cb(...values)
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(ref.current)
    }, [isPostsLoading])
}