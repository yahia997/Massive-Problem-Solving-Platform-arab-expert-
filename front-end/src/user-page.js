import React, { useEffect, useState }from "react";
import "./styles/auth.css";
import { Progress } from "./progress";
import user from "./images/user.png";

import axios from "axios";

const UserPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        document.title = "User Page";
        if (localStorage.getItem("data")) {
            let userData = localStorage.getItem("data");
            setData(JSON.parse(userData));
        } else {
            window.location.pathname = "/auth";
        }
    }, []);

    const del = () => {
        let id = JSON.parse(localStorage.getItem("data"))._id;
        axios.delete(`/users/${id}`, {});
        window.localStorage.removeItem("data");
        window.location.pathname = "/auth";
    }

    const logout = () => {
        window.localStorage.removeItem("data");
        window.location.pathname = "/auth";
    }

    if (localStorage.getItem("data")) {
        
        return <>
        <section className="user-information top container">
            <div className="row py-4 justify-content-center">
                <img src={data ? data.img || user : user } alt="avatar" className="avatar p-0"/>
                <h1 className="text-white text-center py-2 m-0">{data ? data.userName : ""}</h1>
                <p className="text-white text-center ff-code fs-5 p-0">{data ? data.email : ""}</p>
            </div>
            <div className="row pb-4">
                <h3 className="g mb-3">المستوي</h3>
                <Progress extra={ 0 } />
            </div>
            <div className="row pb-4">
                <h3 className="g">
                    التحديات التي اجتزتها
                :</h3>
                {JSON.parse(localStorage.getItem("data")).passedChallenges.map((str, i) => {
                    return <p key={i} className="text-white fs-5">&#9679;  { str }</p>
                })}
                </div>
            <button className="btn btn-info w-100 my-4 fw-bold" onClick={() => logout()}>تسجيل الخروج</button>
            <div className="row p-4 rounded border border-danger">
                    <p className="text-danger pb-3 fs-5 text-center">سيتم حذف الحساب نهائيا و جميع النقاط و لن تتمكن من تسجيل الدخول باستخدامه مجددا</p>
                    <button className="btn btn-danger w-100 fw-bold" onClick={() => del()}>حذف الحساب نهائيا</button>
            </div>
        </section>
    </>
    } else {
        return null;
    }
}

export { UserPage };