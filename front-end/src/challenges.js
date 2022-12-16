import React, {useState, useEffect} from "react";
import { Footer } from "./home";

const Challenge = ({ name, hard, passed, id}) => {
    var points = 0;
    if (hard === "very-hard") {
        points = 25;
    } else if (hard === "hard") {
        points = 20;
    }   else if (hard === "normal") {
        points = 15;
    }   else if (hard === "easy") {
        points = 10;
    }
    return <>
        <div className={`challenge ${hard}-challenge col-12 d-flex p-3 my-2 justify-content-between align-items-center flex-lg-nowrap flex-wrap`} onClick={() => {
            if (name) {
                window.location.pathname = `/challenge/${id}`;
            }
        }}>
            <h5 className={`p-0 m-0 w-75 ${name ? "" : "loading-text w-100"}`}>{name || "loading"}</h5>
            <div className="d-flex align-items-center p-lg-0 pt-3">
                <span className={`flag mx-2 text-nowrap ${name ? "" : "loading-text"}`}>
                    {points} نقطة
                </span>
                <span className={`${passed ? "signin" : "signin bg-secondary"} ${name ? "" : "text-transparent loading-text"} mx-2 text-dark fw-bold w-90px py-1 text-center`}>
                    {passed ? "لقد إجتزته": "لم تجتزه"}
                </span>
            </div>
        </div>
    </>
}

const Challenges = () => {
    const [d, setD] = useState([
        {name: "", type: "", _id: ""},
        {name: "", type: "", _id: ""},
        {name: "", type: "", _id: ""},
        {name: "", type: "", _id: ""},
        {name: "", type: "", _id: ""},
        {name: "", type: "", _id: ""},
        {name: "", type: "", _id: ""},
        {name: "", type: "", _id: ""},
        {name: "", type: "", _id: ""},
        {name: "", type: "", _id: ""}
    ]);
    const [type, setType] = useState("easy");
    var from = 0;

    useEffect(() => {
        document.title = "Challenges";
        fetch(`/challenges?skip=0&hardness=easy`)
            .then(res => res.json())
            .then(data => {
                setD(data);
            })
            .catch(err => console.log(err));
    }, []);
    
    const set = (hard) => {
        setD([
            {name: "", type: "", _id: ""},
            {name: "", type: "", _id: ""},
            {name: "", type: "", _id: ""},
            {name: "", type: "", _id: ""},
            {name: "", type: "", _id: ""},
            {name: "", type: "", _id: ""},
            {name: "", type: "", _id: ""},
            {name: "", type: "", _id: ""},
            {name: "", type: "", _id: ""},
            {name: "", type: "", _id: ""}
        ]);
        fetch(`/challenges?skip=0&hardness=${hard}`)
            .then(res => res.json())
            .then(data => setD(data))
            .catch(err => console.log(err));
        setType(hard);
        document.getElementById("load-p").textContent = "";
    }

    const load = () => {
        let loadMoreButton = document.getElementById("load");
        loadMoreButton.classList.add("button-loading");
        from = from + 20;
        fetch(`/challenges?skip=${from}&hardness=${type}`)
        .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    loadMoreButton.classList.remove("button-loading");
                    document.getElementById("load-p").textContent = "";
                    setD([...d, data[0]]);
                } else {
                    loadMoreButton.classList.remove("button-loading");
                    document.getElementById("load-p").textContent = "لا يوجد المزيد من التحديات في هذا المستوي.";
                }
            })
        .catch(err => console.log(err));
    }

    const check = (challengeName) => {
        let userData = JSON.parse(localStorage.getItem("data"));

        if (userData) {
            if (userData.passedChallenges.indexOf(challengeName) === -1) {
                return false
            }else {
                return true;
            }
        }else {
            return false;
        }
    }

    return <>
        <section className="container top">
            <div className="d-flex justify-content-center my-3 flex-wrap align-items-center">
                <button className="btn-2 m-2 px-2 py-1 fs-6 easy" disabled={type === "easy" ? true:false} onClick={() => set("easy")}>سهل</button>
                <button className="btn-2 m-2 px-2 py-1 fs-6 normal" disabled={type === "normal" ? true:false} onClick={() => set("normal")}>متوسط</button>
                <button className="btn-2 m-2 px-2 py-1 fs-6 hard" disabled={type === "hard" ? true:false} onClick={() => set("hard")}>صعب</button>
                <button className="btn-2 m-2 px-2 py-1 fs-6 very-hard" disabled={type === "very-hard" ? true:false} onClick={() => set("very-hard")}>صعب جدا</button>
            </div>
            <div className="row px-md-0 px-3">
                {d.map((obj, index) => {
                    return <Challenge name={obj.name} key={index} id={obj._id} hard={obj.type} passed={check(obj.name)}/>
                })}
            </div>
            <div className="w-100 d-flex justify-content-center flex-wrap">
                <p id="load-p" className="text-white text-center w-100"></p>
                <button className="signin px-3 py-1 fw-bold mb-5" id="load" onClick={() => load()}>المزيد</button>
            </div>
        </section>
        <Footer/>
    </>
}

export { Challenges };