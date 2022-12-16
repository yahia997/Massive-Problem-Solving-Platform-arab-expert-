import React, {useEffect, useRef} from "react";
import "./styles/loader.css";

const Loader = () => {
    const l2 = useRef(null);
    useEffect(() => {
        l2.current.style.height = `${window.innerHeight}px`;
    }, []);
    return <>
        <div className="w-100 p-loader">
            <div ref={l2} className="w-100 d-flex justify-content-center align-items-center bg-transparent">
                <span className="circle"></span>
            </div>
        </div>
    </>
}

const L = () => {
    <div className="w-100 d-flex justify-content-center align-items-center p-loader">
        <span className="circle"></span>
    </div>
}

export { Loader , L};