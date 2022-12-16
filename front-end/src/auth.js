import React, {useState, useRef, useEffect} from "react";
import axios from "axios";

import { gapi } from "gapi-script";
import { GoogleLogin }  from 'react-google-login';

import invisible from "./images/invisible.png";
import eye from "./images/eye.png";
import "./styles/auth.css";
const clientId = "605327849339-9ij9aaokq1f3h4jvfo8cpoo018cul38t.apps.googleusercontent.com";

const LogIn = ({set}) => {
    const [see, setSee] = useState(false);
    const wrong = useRef(null);
    const [data, setData] = useState({
        userName: "",
        password: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let login_button = document.getElementById("login-button");
        login_button.classList.add("button-loading");
        axios.post(`/users/login`, {userName: data.userName, password: data.password})
            .then(user => {
                if (user.data.length !== 0) {
                    wrong.current.textContent = "";
                    localStorage.setItem("data", JSON.stringify(user.data[0]));
                    window.location.pathname = `/user/${user.data[0]._id}`;
                } else {
                    login_button.classList.remove("button-loading");
                    wrong.current.textContent = "من فضلك تأكد من إسم المستخدم أو كلمة المرور";
                }
            })
            .catch(err => console.log(err));
    }

        const responseGoogle = (response) => {
        let login_button = document.getElementById("login-button");

        axios.post(`/users/login`, {
            userName: response.profileObj.name,
            password: response.profileObj.googleId           
        })
            .then(user => {
                if (user.data.length !== 0) {
                    wrong.current.textContent = "";
                    localStorage.setItem("data", JSON.stringify(user.data[0]));
                    window.location.pathname = `/user/${user.data[0]._id}`;
                } else {
                    login_button.classList.remove("button-loading");
                    wrong.current.textContent = "من فضلك تأكد من إسم المستخدم أو كلمة المرور";
                }
            })
            .catch(err => console.log(err));
    }
    return <>
        <form className="w-100 p-4 d-flex justify-content-center flex-wrap" onSubmit={(e) => handleSubmit(e)}>
            <h3 className="text-dark w-100 text-center pb-2">تسجيل الدخول</h3>
            <div className="google-button w-100">
            <GoogleLogin
                clientId={clientId}
                buttonText="تسجيل الدخول"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                />
            </div>
            <div className="or my-4">
                <p className="m-0 px-2">أو</p>
            </div>
            <label className="form-label w-100" htmlFor="userName">إسم المستخدم</label>
            <input type="text"
                required
                id="userName"
                autoComplete="off"
                spellCheck="false"
                name="userName"
                value={data.userName}
                onChange={(e) => handleChange(e)}
            className="w-100 form-control my-0"/><span></span>
            <label className="form-label w-100" htmlFor="password">كلمة المرور</label>
            <span className="w-100 d-flex align-items-center justify-content-end flex-wrap">
            <input type={see ? "text" : "password"}
                className="w-100 form-control my-0"
                required
                    name="password"
                    spellCheck="false"
                    autoComplete="off"
                value={data.password}
                onChange={(e) => handleChange(e)}
                id="password" /><span></span>
                <button type="button" onClick={() => setSee(!see)} className="px-3 invis">
                    {see ?
                    <img src={invisible} alt="toggle-to-show-password"/>:
                    <img src={eye} alt="toggle-to-show-password"/>
                }
                </button>
            </span>
            <div className="d-flex justify-content-end w-100 my-1 g">
                <a href="/forgotPassword" className="g">نسيت كلمة المرور؟</a>
            </div>
            <p className="w-100 text-center fs-6 text-danger" ref={wrong}></p>
            <button id="login-button" className="signin px-3 py-1 w-100 text-light fs-5">دخول</button>
            <p className="py-2 d-flex align-items-center justify-content-center w-100 flex-wrap">ليس لديك حساب ؟<button className="g px-1" onClick={() => set("signin")}><u>قم بإنشاء حساب</u></button></p>
        </form>
    </>
}






const SignIn = ({set}) => {
    const [see, setSee] = useState(false);
    const wrong = useRef(null);
    const [c, setC] = useState("");
    const [data, setData] = useState({
        userName: "",
        img: "",
        email: "",
        password: ""
    });

    const responseGoogle = (response) => {
        let submit_button = document.getElementById("submit-button");

        axios.post(`/users`, {
            userName: response.profileObj.name,
            img: response.profileObj.imageUrl,
            email: response.profileObj.email,
            password: response.profileObj.googleId           
        })
                .then(res => {
                    if (res.data === "new user added !") {
                        axios.post(`/users/login`, {
            userName: response.profileObj.name,
            password: response.profileObj.googleId           
        })
                            .then(user => {
                                wrong.current.textContent = "";
                                localStorage.setItem("data", JSON.stringify(user.data[0]));
                                window.location.pathname = `/user/${user.data[0]._id}`;
                            })
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => {
                    submit_button.classList.remove("button-loading");
                    wrong.current.textContent = "لقد سجلت الدخول بهذا الحساب من قبل";
            })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]: value });
    }
    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        let submit_button = document.getElementById("submit-button");
        submit_button.classList.add("button-loading");
        if (c === data.password && data.password.length >= 8) {
            
            axios.post(`/users`, data)
                .then(res => {
                    if (res.data === "new user added !") {
                        axios.post(`/users/login`, { userName: data.userName, password: data.password })
                            .then(user => {
                                wrong.current.textContent = "";
                                localStorage.setItem("data", JSON.stringify(user.data[0]));
                                window.location.pathname = `/user/${user.data[0]._id}`;
                            })
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => {
                    submit_button.classList.remove("button-loading");
                    wrong.current.textContent = "إسم المستخدم أو البريد الإلكتروني هذا مأخوذ بالفعل";
            })
        } else if (c !== data.password) {
            submit_button.classList.remove("button-loading");
            wrong.current.textContent = "يجب أن تكون كلمة المرور مثل تأكيد كلمة المرور";
        } else if (data.password.length < 8) {
            submit_button.classList.remove("button-loading");
            wrong.current.textContent = "يجب أن تكون كلمة المرور أكثر من 8 أحرف";
        }
    }

    return <>
        <form className="w-100 p-4 d-flex justify-content-center flex-wrap" onSubmit={(e) => handleSubmit(e)}>
            <h3 className="text-dark w-100 text-center">إنشاء حساب</h3>
            <div className="google-button w-100">
              <GoogleLogin
                clientId={clientId}
                buttonText="إنشاء حساب"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
            </div>
            <div className="or my-4">
                <p className="m-0 px-2">أو</p>
            </div>
            <label className="form-label w-100" htmlFor="userName">إسم المستخدم</label>
            <input type="text"
                required
                autoComplete="off"
                id="userName"
                name="userName"
                spellCheck="false"
                value={data.userName}
                onChange={(e) => handleChange(e)}
            className="w-100 form-control my-0"/><span></span>
            <label className="form-label w-100" htmlFor="email">البريد الإلكتروني</label>
            <input type="email"
                required
                autoComplete="off"
                id="email"
                name="email"
                spellCheck="false"
                value={data.email}
                onChange={(e) => handleChange(e)}
            className="w-100 form-control my-0"/><span></span>
            <label className="form-label w-100" htmlFor="password">كلمة المرور</label>
            <span className="w-100 d-flex align-items-center justify-content-end flex-wrap">
            <input type={see ? "text" : "password"}
                className="w-100 form-control my-0"
                name="password"
                    autoComplete="off"
                    spellCheck="false"
                value={data.password}
                onChange={(e) => handleChange(e)}
                id="password" /><span></span>
                <button type="button" onClick={() => setSee(!see)} className="px-3 invis">
                    {see ?
                    <img src={invisible} alt="toggle-to-show-password"/>:
                    <img src={eye} alt="toggle-to-show-password"/>
                }
                </button>
            </span>
            <label className="form-label w-100" htmlFor="c">تأكيد كلمة المرور</label>
            <input type="password"
                className="w-100 form-control my-0"
                name="c"
                    autoComplete="off"
                    spellCheck="false"
                value={c}
                onChange={(e) => setC(e.target.value)}
                id="c" /><span></span>
            <p className="w-100 text-center fs-6 text-danger" ref={wrong}></p>
            <button id="submit-button" className="signin px-3 py-1 fs-5 w-100 text-light">إنشاء الحساب</button>
            <p className="py-2 d-flex align-items-center justify-content-center w-100 flex-wrap">هل لديك حساب بالفعل ؟<button className="g px-1" onClick={() => set("login")}><u>تسجيل الدخول</u></button></p>
        </form>
    </>
}

const Auth = () => {
    const p = useRef(null);
    const [active, setActive] = useState("signin");

    useEffect(() => {
        document.title = "Login || Signin";
        p.current.style.height = `${window.innerHeight}px`;
        const queryParams = new URLSearchParams(window.location.search);
        setActive(queryParams.get("type") || "signin");
    }, []);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };

        gapi.load('client:auth2', start);
    }, []);

    return <>
        <section className="container d-flex justify-content-center align-items-center overflow-auto" ref={p}>
            <div className="area row">

    <ul className="nav nav-tabs w-100  d-flex justify-content-end p-0 m-0">
        <li className="nav-item w-50">
            <button className={`nav-link ${active === "signin" ? "active" : ""} w-100 text-dark`}
            onClick={() => setActive("signin")}>حساب جديد</button>
        </li>
        <li className="nav-item w-50">
            <button className={`nav-link ${active === "login" ? "active" : ""} w-100 text-dark`}
            onClick={() => setActive("login")}>تسجيل الدخول</button>
        </li>
    </ul>
        <div className="h w-100 p-0 m-0">
                    {active === "login" ? <LogIn set={setActive} /> : <SignIn set={setActive} />}      
        </div>
        </div>
        </section>
        <span className="waves"></span>
    </>
}

export { Auth };