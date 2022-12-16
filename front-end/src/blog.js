import { useEffect, useState } from "react";

import axios from "axios";
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';

const ManageArticle = ({ addOrUpadate }) => {
  const { CKEditor } = require('@ckeditor/ckeditor5-react');

  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState({
        title: "",
        body: "",
        keyWords: "",
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
            let id = window.location.pathname.replace("/admin/blog/update/", "");
            fetch(`/blog/${id}`)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                })
                .catch(err => console.log(err));
        }
    }, []);

    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      
      setData({ ...data, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (addOrUpadate === "add") {
            
            axios.post("/blog", data)
            .then((res) => {
                if (res.data = "new article added !") {
                    alert("تمت إضافة مقال جديد بنجاح");
                }
            })
            .catch(err => alert(err));
        } else if (addOrUpadate === "update") {
            let id = window.location.pathname.replace("/admin/blog/update/", "");

            axios.put(`/blog/${id}`, data)
            .then((res) => {
                if (res.data = "article updated!") {
                    alert("تم تعديل المقال بنجاح");
                }
            })
            .catch(err => alert(err));
        }
    }

  if (isAdmin) {
    return <>
    <form className="top container" onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <h3 className="text-white py-3 text-center">
          {
            addOrUpadate === "add" ?
                "إضافة مقال جديد"
                :
                "تعديل مقال موجود سابقا"
          }
          </h3>
      </div>
      <div className="row my-4">
        <label className="form-label fs-4 g px-0" htmlFor="title">عنوان المقال</label>
        <input type="text"
            id="title"
            placeholder="عنوان المقال"
            className="form-control w-100 fs-5 admin-input"
            spellCheck="false"
            autoComplete="off"
            required
            value={data.title}
            name="title"
            onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="row my-4">
          <label className="form-label fs-4 g px-0" htmlFor="body">المقال</label>
          {
              data.body && addOrUpadate === "update" ?
              <CKEditor
              type="text"
              config={ {
                  language: 'ar',
              } }
              name="body"
              editor={ClassicEditor}
              onChange={(e, editor) => {
                  setData({...data, body: editor.getData()});
              }}
              data={data.body || "<p> </p>"}
                  /> : null    
          }
          {
              addOrUpadate === "add" ?
              <CKEditor
              type="text"
              config={ {
                  language: 'ar',
              } }
              name="body"
              editor={ClassicEditor}
              onChange={(e, editor) => {
                  setData({...data, body: editor.getData()});
              }}
              data={data.body || "<p> </p>"}
                  /> : null
          }
      </div>
      <div className="row my-4">
        <label className="form-label fs-4 g px-0" htmlFor="keyWords">الكلمات المفتاحية</label>
        <small className="text-white my-3">افصل بين كل كلمة أو أكثر بسلاش /</small>
        <input type="text"
            id="keyWords"
            placeholder="الكلمات المفتاحية"
            className="form-control w-100 fs-5 admin-input"
            spellCheck="false"
            autoComplete="off"
            required
            value={data.keyWords}
            name="keyWords"
            onChange={(e) => handleChange(e)}
        />
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

export {ManageArticle};