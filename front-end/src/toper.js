import React, {useState, useEffect} from "react";
import "./styles/auth.css";

const Person = ({ userName, num, points}) => {
    return <div key={num} className="d-flex w-100 odd-even border-bottom border-dark border-2 align-items-center">
        <span className={`border-start sequence fs-5 d-flex justify-content-center align-items-center 
        ${num === 0 ? "text-warning fw-bold" : ""}
        ${num === 1 ? "text-info fw-bold" : ""}
        ${num === 2 ? "g fw-bold" : ""}`}>{num + 1}</span>
        <p className={`m-0 d-inline-block text-truncate w-100 px-3 fs-5 text-light text-nowrap overflow-hidden ${userName ? "" : "loading-text"}`}>{userName || "loading"}</p>
        <span className="px-3 d-flex align-items-center fs-5">{ points }</span>
    </div>
}

const Top = () => {
    const [top, setTop] = useState([
        {userName: "", points: ""},
        {userName: "", points: ""},
        {userName: "", points: ""},
        {userName: "", points: ""},
        {userName: "", points: ""},
        {userName: "", points: ""},
        {userName: "", points: ""},
        {userName: "", points: ""},
        {userName: "", points: ""},
        {userName: "", points: ""},
    ]);

    useEffect(() => {
        document.title = "Leader Board";
        fetch("/toper")
            .then(res => res.json())
            .then(data => setTop(data));
    }, []);
    
    return <>
        <section className="top container text-white">
            <h2 className="w-100 text-white text-center py-4">المتصدرون من حيث عدد النقاط الكلي</h2>
            <div className="row justify-content-center">
                <div className="col-md-10 col-12">
                    <div className="d-flex w-100 ">
                        <span className="p-2 g">الترتيب</span>
                        <p className="m-0 d-flex align-items-center w-50 px-3 g">الإسم</p>
                        <span className="d-flex align-items-center ltr w-50 g">عدد النقاط</span>
                    </div>
                    {top.map((obj, i) => {
                        return <Person
                            userName={obj.userName}
                            num={i}
                            key={i}
                            points={obj.points}
                        />
                    })}
                </div>
            </div>
        </section>
    </>
}

export { Top };