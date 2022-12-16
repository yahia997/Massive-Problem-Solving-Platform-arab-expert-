import React, {useEffect, useState } from "react";

import axios from "axios";
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';



const ManageChallenge = ({ addOrUpadate }) => {
    const { CKEditor } = require('@ckeditor/ckeditor5-react');
    // const ClassicEditor = require('@ckeditor/ckeditor5-editor-classic');
    const [isAdmin, setIsAdmin] = useState(false);
    const [testing, setTesting] = useState([{ input: "[]", result: "[]" }]);
    const [forbidden, setForbidden] = useState([]);
    const [data, setData] = useState({
        name: "",
        type: "easy",
        description: "",
        funcName: "",
        solution: "",
        img: ""
    });

    useEffect(() => {
        if (localStorage.getItem("data")) {
            let userName = JSON.parse(localStorage.getItem("data")).userName;
            let password = JSON.parse(localStorage.getItem("data")).password;

            if (userName === "admin1" && password === "www@$WWW_gtav5532759") {
                setIsAdmin(true);
            }
        }
        if (addOrUpadate === "update") {
            let id = window.location.pathname.replace("/admin/update/", "");
            fetch(`/challenges/${id}`)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    const list = JSON.parse(data.testing).map(a => {
                        return {
                            input: JSON.stringify(a.input),
                            result: JSON.stringify(a.result)
                        }
                    });
                    setTesting(list);
                    setForbidden(data.forbidden);
                })
                .catch(err => console.log(err));
        }
    }, []);

    const handleTestingInput = (e, index) => {
        const { name, value } = e.target;
        const list = [...testing];
        list[index][name] = value;
        setTesting(list);
    }

    const handleRemoveClick = (index) => {
        const list = [...testing];
        list.splice(index, 1);
        setTesting(list);
    };

    const handleChangeForbidden = (e, index) => {
        const { value } = e.target;
        const list = [...forbidden];
        list[index] = value;
        setForbidden(list);
    }

    const handleRemoveClickForbidden = (index) => {
        const list = [...forbidden];
        list.splice(index, 1);
        setForbidden(list);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setData({ ...data, [name]: value });
    }

    const handleChangeImg = (e) => {
        let FR = new FileReader();

        FR.addEventListener("loadstart", () => {
            document.getElementById("size").textContent = "Loading...";
        });

        FR.addEventListener("load", (e) => {
            if (document.getElementById('img').files[0].size/1024 <= 100 && e.target.result.startsWith("data:image/")) {
                let myData = data;
                myData.img = e.target.result;
                document.getElementById("show-img").src = e.target.result;
                let size = document.getElementById('img').files[0].size;
                document.getElementById("size").textContent = `${(size/1024).toFixed(2)}  KB  `;
                setData(myData);
            } else if(document.getElementById('img').files[0].size/1024 > 100){
                document.getElementById("size").textContent = "يجب ألا يزيد حجم الصورة عن 100KB";
                document.getElementById("show-img").src = "";
            } else {
                document.getElementById("size").textContent = "يجب أن يكون الملف صورة";
                document.getElementById("show-img").src = "";                
            }
        });

        FR.readAsDataURL(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let finaltesting = testing.filter(obj => obj.input.length > 0 && obj.result.length > 0)
            .map(obj => { return { input: JSON.parse(obj.input), result: JSON.parse(obj.result) } });

        let finalForbidden = forbidden.filter(str => str.length > 0);

        let finalData;
        
        finalData = {...data, testing: JSON.stringify(finaltesting), forbidden: finalForbidden};

        if (addOrUpadate === "add") {
            
            axios.post("/challenges", finalData)
            .then((res) => {
                if (res.data = "new challenge added !") {
                    alert("تمت إضافة تحدى جديد بنجاح");
                }
            })
            .catch(err => alert(err));
        } else if (addOrUpadate === "update") {
            let id = window.location.pathname.replace("/admin/update/", "");

            axios.put(`/challenges/${id}`, finalData)
            .then((res) => {
                if (res.data = "challenge updated!") {
                    alert("تم تعديل التحدى بنجاح");
                }
            })
            .catch(err => alert(err));
        }
    }
    if (isAdmin) {
        return <>
            <form className="top container" onSubmit={(e) => handleSubmit(e)}>
                <h3 className="text-white py-3 text-center">
                    {
                        addOrUpadate === "add" ?
                            "إضافة تحدى جديد"
                            :
                            "تعديل تحدى موجود سابقا"
                    }
                </h3>
                <div className="row my-4">
                    <label className="form-label fs-4 g px-0" htmlFor="name">إسم التحدي</label>
                    <input type="text"
                        id="name"
                        placeholder="إسم التحدي"
                        className="form-control w-100 fs-5 admin-input"
                        spellCheck="false"
                        autoComplete="off"
                        required
                        value={data.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="row my-4">
                    <label className="form-label fs-4 g px-0" htmlFor="type">مستوى التحدي</label>
                    <select className="text-center"
                        id="type"
                        required
                        value={data.type}
                        name="type"
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="easy">easy</option>
                        <option value="normal">normal</option>
                        <option value="hard">hard</option>
                        <option value="very-hard">very-hard</option>
                    </select>
                </div>
                <div className="row my-4">
                    <label className="form-label fs-4 g px-0" htmlFor="description">وصف التحدى</label>
                    {
                        data.description && addOrUpadate === "update" ?
                        <CKEditor
                        type="text"
                        config={ {
                            language: 'ar',
                        } }
                        name="description"
                        editor={ClassicEditor}
                        onChange={(e, editor) => {
                            setData({...data, description: editor.getData()});
                        }}
                        data={data.description || "<p> </p>"}
                            /> : null    
                    }
                    {
                        addOrUpadate === "add" ?
                        <CKEditor
                        type="text"
                        config={ {
                            language: 'ar',
                        } }
                        name="description"
                        editor={ClassicEditor}
                        onChange={(e, editor) => {
                            setData({...data, description: editor.getData()});
                        }}
                        data={data.description || "<p> </p>"}
                            /> : null
                    }
                </div>
                <div className="row my-4 justify-content-center">
                    <label className="form-label fs-4 g px-0" htmlFor="img">إضافة صورة توضيحية (إختياري)</label>
                    <img src={data.img} alt="Upload Image" id="show-img" className="text-white col-5 my-3 text-center" />
                    <div id="size" className="text-white fs-5 my-3 col-12 text-center"></div>
                    <input 
                        type="file"
                        className="form-control"
                        id="img"
                        onChange={(e) => handleChangeImg(e)}
                    />
                    <button className="my-3 btn btn-danger"
                        onClick={() => {
                            setData({ ...data, img: "" });
                            document.getElementById("show-img").src = "";
                            document.getElementById("size").textContent = "";
                            document.getElementById("img").value = "";
                        }}
                        type="button"
                    >حذف الصورة</button>
                </div>
                <div className="row my-4">
                    <label className="form-label fs-4 g px-0" htmlFor="testing">تجارب الكود</label>
                    {
                        testing.length > 0 ?
                            testing.map((a, i) => {
                                return <div className="d-flex flex-wrap justify-content-between my-3 mx-0 border-info border rounded p-3 border-2" key={i}>
                                    <h5 className="pb-2 text-white w-100">تجربة {i + 1}</h5>
                                    <label className="form-label fs-5 g px-0" htmlFor={`input-${i}`}>المدخلات</label>
                                    <input
                                        spellCheck="false"
                                        autoComplete="off"
                                        placeholder="[json]"
                                        className="form-control fs-5 ltr ff-code admin-input"
                                        type="text"
                                        id={`input-${i}`}
                                        name="input"
                                        value={a.input}
                                        onChange={(e) => handleTestingInput(e, i)}
                                    />
                                    <label className="form-label fs-5 g px-0" htmlFor={`result-${i}`}>المخرجات</label>
                                    <input
                                        spellCheck="false"
                                        autoComplete="off"
                                        placeholder="[json]"
                                        className="form-control fs-5 ltr ff-code admin-input"
                                        type="text"
                                        id={`result-${i}`}
                                        name="result"
                                        value={a.result}
                                        onChange={(e) => handleTestingInput(e, i)}
                                    />
                                    <button className="w-100 mt-3 btn btn-danger"
                                    type="button"
                                    onClick={() => handleRemoveClick(i)}>حذف</button>
                                </div>
                            })
                            : null
                    }
                    <button type="button" className="btn btn-success w-100 fw-bold"
                        onClick={() => setTesting([...testing, { input: "[]", result: "[]" }])}
                    >أضف</button>
                </div>
                <div className="row my-4">
                    <label className="form-label fs-4 g px-0" htmlFor="funcName">اسم ال function</label>
                    <input type="text"
                        id="funcName"
                        placeholder="اسم ال function"
                        className="form-control w-100 fs-5 admin-input"
                        spellCheck="false"
                        autoComplete="off"
                        required
                        value={data.funcName}
                        name="funcName"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="row my-4">
                    <label className="form-label fs-4 g px-0" htmlFor="solution">الحل</label>
                    <textarea type="text"
                        id="solution"
                        placeholder="الحل"
                        spellCheck="false"
                        autoComplete="off"
                        required
                        value={data.solution}
                        name="solution"
                        className="fs-5 text-dark admin-textarea ff-code ltr"
                        rows="10"
                        onChange={(e) => handleChange(e)}
                    ></textarea>
                </div>
                <div className="row my-4">
                    <label className="form-label fs-4 g px-0" htmlFor="testing">أشياء لا يجب أن تكون في الكود</label>
                    {
                        forbidden.length > 0 ?
                            forbidden.map((a, i) => {
                                return <div className="d-flex flex-wrap justify-content-between my-3 mx-0 border-info border rounded p-3 border-2" key={i}>
                                    <input
                                        spellCheck="false"
                                        autoComplete="off"
                                        placeholder={addOrUpadate === "add" ? "key word" : forbidden[i]}
                                        className="form-control fs-5 ltr ff-code admin-input"
                                        type="text"
                                        id={`forbidden-${i}`}
                                        name="forbidden"
                                        value={a}
                                        onChange={(e) => handleChangeForbidden(e, i)}
                                    />
                                    <button className="w-100 mt-3 btn btn-danger"
                                    type="button"
                                    onClick={() => handleRemoveClickForbidden(i)}>حذف</button>
                                </div>
                            })
                            : null
                    }
                    <button type="button" className="btn btn-success w-100 fw-bold"
                        onClick={() => setForbidden([...forbidden, ""])}
                    >أضف</button>
                </div>
                <button type="submit" className="signin w-100 py-2 text-center fw-bold fs-5 my-4">
                    {
                        addOrUpadate === "add" ?
                            "أضف"
                            :
                            "تعديل"
                    }
                </button>
            </form>
        </>
    } else {
        return <>
            <section className="top container">
                <h1 className="text-light fs-1 w-100 text-center py-4">401</h1>
                <p className="text-white text-center w-100 fs-5 p-4">اسم المستخدم أو كلمة المرور غير صحيحة.</p> 
            </section>
        </>
    }
}

const AdminOptions = () => {
    const [option, setOption] = useState({
        update: "",
        del: "",
        updateArticle: "",
        deleteArticle: ""
    });

    const deleteChallenge = () => {
        axios.delete(`/challenges/${option.del}`, {})
            .then((res) => {
                if (res.data = "challenge deleted!") {
                    alert("تم حذف التحدى بنجاح");
                }
            })
            .catch(err => alert(err));
    }
    const deleteArticle = () => {
        axios.delete(`/blog/${option.deleteArticle}`, {})
            .then((res) => {
                if (res.data = "article deleted!") {
                    alert("تم حذف المقال بنجاح");
                }
            })
            .catch(err => alert(err));
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setOption({ ...option, [name]: value });
    }

    return <>
        <section className="top container">
            <div className="row my-4">
                <h3 className="g col-12">أضف تحديا جديدا</h3>
                <div className="my-3 col-12 d-flex justify-content-center">
                    <a href="/admin/add" className="signin text-center w-100 text-decoration-none fw-bold py-2">أضف تحديا جديدا</a>
                </div>
            </div>
            <div className="row my-4">
                <h3 className="text-info col-12">تعديل تحدي موجود سابقا</h3>
                <div className="my-3 d-flex col-12 justify-content-between">
                    <input type="text"
                        placeholder="ال id بتاع التحدي"
                        className="w-100 form-control"
                        name="update"
                        value={option.update}
                        onChange={(e) => handleChange(e)}
                    />
                    <a href={`/admin/update/${option.update}`} className="btn btn-info text-center text-decoration-none fw-bold me-3">تعديل</a>
                </div>
            </div>
            <div className="row my-4">
                <h3 className="text-danger col-12">حذف تحدي موجود سابقا</h3>
                <div className="my-3 d-flex col-12 justify-content-between">
                    <input type="text"
                        placeholder="ال id بتاع التحدي"
                        className="w-100 form-control"
                        value={option.del}
                        name="del"
                        onChange={(e) => handleChange(e)}
                    />
                    <button className="btn btn-danger text-center text-decoration-none fw-bold me-3"
                        onClick={() => deleteChallenge()}
                    >حذف</button>
                </div>
            </div>
        </section>
        <br />
        <section className="top container">
            <div className="row my-4">
                <h3 className="g col-12">أضف مقالا جديدا</h3>
                <div className="my-3 col-12 d-flex justify-content-center">
                    <a href="/admin/blog/add" className="signin text-center w-100 text-decoration-none fw-bold py-2">أضف مقالا جديدا</a>
                </div>
            </div>
            <div className="row my-4">
                <h3 className="text-info col-12">تعديل مقال موجود سابقا</h3>
                <div className="my-3 d-flex col-12 justify-content-between">
                    <input type="text"
                        placeholder="ال id بتاع المقال"
                        className="w-100 form-control"
                        name="updateArticle"
                        value={option.updateArticle}
                        onChange={(e) => handleChange(e)}
                    />
                    <a href={`/admin/blog/update/${option.updateArticle}`} className="btn btn-info text-center text-decoration-none fw-bold me-3">تعديل</a>
                </div>
            </div>
            <div className="row my-4">
                <h3 className="text-danger col-12">حذف مقال موجود سابقا</h3>
                <div className="my-3 d-flex col-12 justify-content-between">
                    <input type="text"
                        placeholder="ال id بتاع المقال"
                        className="w-100 form-control"
                        value={option.deleteArticle}
                        name="deleteArticle"
                        onChange={(e) => handleChange(e)}
                    />
                    <button className="btn btn-danger text-center text-decoration-none fw-bold me-3"
                        onClick={() => deleteArticle()}
                    >حذف</button>
                </div>
            </div>
        </section>
    </>
}

const First = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        document.title = "Admin Page";
        if (localStorage.getItem("data")) {
            let userName = JSON.parse(localStorage.getItem("data")).userName;
            let password = JSON.parse(localStorage.getItem("data")).password;

            if (userName === "admin1" && password === "www@$WWW_gtav5532759") {
                setIsAdmin(true);
            }
        }
    }, []);

    if(isAdmin) {
        return <>
            <AdminOptions/>
        </>
    } else {
        return <>
            <section className="top container">
                <h1 className="text-light fs-1 w-100 text-center py-4">401</h1>
                <p className="text-white text-center w-100 fs-5 p-4">اسم المستخدم أو كلمة المرور غير صحيحة.</p> 
            </section>
        </>
    }
}

export { First , ManageChallenge};