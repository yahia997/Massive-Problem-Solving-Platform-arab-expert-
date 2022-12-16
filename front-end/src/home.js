import React, {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import logo from "./images/عرب expert dark.svg";
import user from "./images/user.png";
import { ReactComponent as Support } from "./images/support.svg";
import "./styles/home.css";

const Ham = ({ open }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("data")) {
            let userData = localStorage.getItem("data");
            setData(JSON.parse(userData));
        }
    }, []);

    return <>
        <div className={`ham ${open ? "open" : ""} px-5 py-4 d-md-none`}>
            <div className=" w-100 py-2">
                <Link to="/" className="text-decoration-none nav-links fs-5">الرئيسية</Link>
            </div>
            <div className=" w-100 py-2">
                <Link to="/challenge" className="text-decoration-none nav-links fs-5">التحديات</Link>
            </div>
            <div className=" w-100 py-2">
                <Link to="/top" className="text-decoration-none nav-links fs-5">المتصدرون</Link>
            </div>
            <div className=" w-100 py-2 pb-4">
                <Link to="/articles" className="text-decoration-none nav-links fs-5">المدونة</Link>
            </div>
            {
                data ?  <a href={`/user/${data._id}`} className="text-decoration-none d-flex align-items-center justify-content-start ">
                    <span className="text-white fs-5 fw-bold"><img src={data.img || user} alt="avatar" className="nav-avatar ms-2" width="35" height="35" /> {data.userName}</span>
                    </a>:
            <>
            <div className=" w-100 py-2">
                <Link to="/auth?type=login" className="text-decoration-none nav-links fs-6 login">تسجيل الدخول</Link>
            </div>
            <div className=" w-100 py-2">
                <Link to="/auth?type=signin" className="text-decoration-none signin col-lg-1 px-2 py-1 fs-6 fw-bold">إنشاء حساب</Link>
            </div>
            </>
            }
        </div>
    </>
}

const Nav = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("data")) {
            let userData = localStorage.getItem("data");
            setData(JSON.parse(userData));
        }
    }, []);

    return <>
        <nav className="container-fulid py-2">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-2 d-flex align-items-center">
                        <img src={logo} alt="logo" className="nav-logo" draggable="false" width="100" height="45" />
                    </div>
                    <div className="col-lg-4 col-md-5 d-md-flex align-items-center justify-content-between d-none">
                        <Link to="/" className="text-decoration-none nav-links">الرئيسية</Link>
                        <Link to="/challenge" className="text-decoration-none nav-links">التحديات</Link>
                        <Link to="/top" className="text-decoration-none nav-links">المتصدرون</Link>
                        <Link to="/articles" className="text-decoration-none nav-links">المدونة</Link>
                    </div>
                    <span className="col-lg-2 d-lg-block d-none"></span>
                    <div className="col-lg-4 col-md-5 text-white ltr d-md-block d-none">
                    {
                    data ?  <a href={`/user/${data._id}`} className="text-decoration-none d-flex align-items-center justify-content-end ">
                    <span className="text-white fs-5 fw-bold"> {data.userName}<img src={data.img || user} alt="avatar" className="nav-avatar me-2" width="35" height="35" /></span>
                    </a>:   <>
                        <Link to="/auth?type=login" className="text-decoration-none nav-links col-lg-1 px-2 py-1 fs-6 login mx-1">تسجيل الدخول</Link>
                        <Link to="/auth?type=signin" className="text-decoration-none signin col-lg-1 px-2 py-1 fs-6 fw-bold mx-1">إنشاء حساب</Link>
                            </>
                    }
                    </div>
                    <div className="d-md-none d-block col-10 ltr">
                        <button className="p-2 ham-btn d-flex align-items-center justify-content-center" onClick={() => setOpen(!open)} aria-label="nav-button">
                            <svg width="34" height="21" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3H49" stroke="white" strokeWidth="5"></path><path d="M0 19H49" stroke="white" strokeWidth="5"></path><path d="M0 33H49" stroke="white" strokeWidth="5"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        <Ham open={open}/>
    </>
}

const Footer = () => {
    return <>
    <footer className="container-fluid py-5">
        <div className="container">
            <div className="row justify-content-md-between justify-content-center">
                <div className="col-md-2 col-12 d-flex align-items-center justify-content-center">
                    <img src={logo} alt="logo" className="nav-logo" draggable="false" width="100" height="45" />
                </div>
                <div className="col-lg-5 col-md-6 col-12 d-flex align-items-center justify-content-md-between flex-wrap justify-content-center">
                        <Link to="/" className="text-decoration-none footer-links nav-links m-md-0 m-2">الرئيسية</Link>
                        <Link to="/challenge" className="text-decoration-none footer-links nav-links m-md-0 m-2">التحديات</Link>
                        <Link to="/top" className="text-decoration-none footer-links nav-links m-md-0 m-2">المتصدرون</Link>
                        <Link to="/articles" className="text-decoration-none footer-links nav-links m-md-0 m-2">المدونة</Link>
                    </div>    
            </div>
            </div>
    </footer>
    <p className="after-footer bg-dark text-center w-100 py-2 text-white m-0">.made by yahia mahmoud ❤️ 2022</p>
    <p className="after-footer bg-dark text-center w-100 py-2 text-white m-0">جميع الحقوق محفوظة &copy;.</p>
    </>
}

const Num = ({ n }) => {

    useEffect(() => {
        const counting = () => {
            var i = 0;

            function add() {
                document.getElementById("num-c").textContent = i;
                i++;

                if (i > n) {
                    myStop();
                }
            }
            
            const myInterval = setInterval(add, 5000/n);

            function myStop() {
                clearInterval(myInterval);
            }
        }
    
    counting();
    }, [n]);
    return <>
        <span className="fs-1 fw-bold col-2 d-flex justify-content-center align-items-center counter" id="num-c"></span>
    </>
}

const Home = () => {
    const intro = useRef(null);
    const [num, setNum] = useState(0);
    const [f, setF] = useState(true);
    const [a, setA] = useState(true);
    useEffect(() => {
        document.title = "Arab Expert";
        const canvas = document.getElementById("canvas1");
        intro.current.style.height = `${window.innerHeight}px`;
        canvas.style.height = `${window.innerHeight}px`;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        // mouse position
        let mouse = {
            x: null,
            y: null,
            radius: (canvas.height/80) * (canvas.width/80)
        }

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
            }
        );

        // create particle
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            //method to draw
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = "#919191";
                ctx.fill();
            }
            // check particle position, mouse position
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // check collision
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                        this.x += 10;
                    }
                    if (mouse.x > this.x && this.x > this.size * 10) {
                        this.x -= 10;
                    }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                        this.y += 10;
                    }
                    if (mouse.y > this.y && this.y > this.size * 10) {
                        this.y -= 10;
                    }
                }
                //move particle
                this.x += this.directionX;
                this.y += this.directionY;
                //draw particle
                this.draw();
            }
        }

        // create particle array
        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles*1.1; i++) {
                let size = (Math.random() * 5) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 5) - 2.5;
                let directionY = (Math.random() * 5) - 2.5;
                let color = '#919191';

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        
        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x)
                    * (particlesArray[a].x - particlesArray[b].x))
                        + ((particlesArray[a].y - particlesArray[b].y)
                        * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = 'rgba(145, 145, 145,' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        //animation loop
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        // resize event
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
            init();
        });

        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        init();
        animate();

    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.location.pathname === "/") {
                if (document.getElementById("support").getBoundingClientRect().y <= window.innerHeight / 1.5 && a) {
                    setA(false);
                    let paths = document.querySelectorAll("#support svg path");
                    let i = paths.length-1;
                    let int = setInterval(() => {
                        paths[i].classList.add("anim");
                        i--;
                        if(i === 0) {
                            clearInterval(int);
                        }
                    }, 250);

                    
                } else if (document.getElementById("num").getBoundingClientRect().y <= window.innerHeight / 1.5 && f) {
                    setF(false);
                    fetch("/usersNumber")
                        .then(res => res.json())
                        .then(data => {
                            setNum(data);
                        });
                }
            }
        }

        window.addEventListener('scroll', handleScroll);

        return _ => {
            window.removeEventListener('scroll', handleScroll);
        }
    });
    return <>
        <section className="container top" ref={intro}>
            <div className="row h-100 flex-wrap-reverse">
                <div className="col-md-6 col-12 h-100 d-flex align-items-center align-content-center flex-wrap justify-content-md-start justify-content-center">
                    <h1 className="text-md-end text-center text-white w-100 mb-2 num-1 fw-bold">ثاني منصة عربية لحل التحديات البرمجية بلغة <mark className="p-0 m-0">الجافاسكربت</mark></h1>
                    <a href={localStorage.getItem("data") ? "/challenge" : "/auth"} className="px-3 py-1 fw-bold signin fs-5 text-decoration-none start-btn">إبدأ الآن</a>
                </div>
                <canvas id="canvas1" className="position-absolute w-100" style={{left: "0px", top: "60px"}}></canvas>
            </div>
            <div className="row">
            </div>
        </section>
        <section className="container my-5">
            <div className="row align-content-center justify-content-center py-5" id="num">
                {num > 0 ? < Num n={num}/> : <span className="fs-1 fw-bold col-2 d-flex justify-content-center align-items-center counter">000</span>}
                <p className="fs-4 text-light col-12 text-center py-3">شخصاً قاموا بتسجيل الدخول</p>
            </div>
        </section>
        <section className="container my-5" id="section-2">
            <div className="row py-5">
                <div className="col-12 point-b pb-5 d-flex align-items-center">
                    <h3 className="text-light px-3 w-75">عربية بالكامل و مبرمجة من قبل مبرمجين عرب.</h3>
                    <span className="advantages-start p-0"></span>
                </div>
                <div className="col-12 point-b pb-5 d-flex align-items-center">
                    <h3 className="text-light px-3 w-75">مجانية بالكامل.</h3>
                    <span className="advantages p-0"></span>
                </div>
                <div className="col-12 point-b pb-5 d-flex align-items-center">
                    <h3 className="text-light px-3 w-75">كل تحدي له الحل الخاص به كي تستفيد من التحدي حتي إن لم تستطع اجتيازه.</h3>
                    <span className="advantages p-0"></span>
                </div>
                <div className="col-12 point-b pb-5 d-flex align-items-center">
                    <h3 className="text-light px-3 w-75">أسئلة متنوعه لكافة المستويات.</h3>
                    <span className="advantages p-0"></span>
                </div>
                <div className="col-12 point-b pb-5 d-flex align-items-center">
                    <h3 className="text-light px-3 w-75">بيئة عمل لكتابة الكود الخاص بك و console لمساعدتك في الوصول للحل.</h3>
                    <span className="advantages-end p-0"></span>
                </div>
            </div>
        </section>
        <section className="container">
            <div className="row justify-content-center" id="support">
                <Support/>
            </div>
            <div className="row justify-content-center">
                <p className="w-100 text-center text-white fs-2 my-3">ماذا تنتظر إنها مجانية؟</p>
                <a className="signin start-btn my-3 px-3 py-1 fw-bold fs-5 text-decoration-none" href="/auth">
                    إبدأ الآن
                </a>
                <div className="w-100 d-flex justify-content-center my-3">
                    <a href="https://wa.me/201097741207" className="g my-3 join-team">إنضم إلي فريقنا.</a>
                </div>
            </div>
        </section>
        <Footer/>
    </>
}

export { Home , Nav, Footer};