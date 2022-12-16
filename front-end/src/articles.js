import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import eye2 from "./images/eye-2.png";
import "./styles/blog.css";
import bookIcon from "./images/book-icon.svg";
import NotFound from "./404";

const Article = ({ id, title, people, keyWords }) => {
  return <div className={`challenge article col-12 d-flex p-3 my-3 justify-content-between align-items-start flex-wrap`} onClick={() => {
            if (id) {
                window.location.pathname = `/articles/${id}`;
            }
        }}>
            <h5 className={`p-0 m-0 w-75 ${title ? "" : "loading-text w-100"}`}>{title || "loading"}</h5>
            <div className="d-flex align-items-start p-lg-0">
            <span className={`d-flex justify-content-between align-items-center text-light fs-5 text-nowrap ${title ? "" : "loading-text"}`}>
                  {people}
              <img src={eye2} alt="eye" className="mx-1"/>
            </span>
            </div>
            <div className="d-flex w-100 flex-wrap">
      {
        keyWords.split("/").map((word, index) => {
          return <span key={`keyWord-${index}`} className="key-word-article text-light py-1 px-2 m-1 rounded">{word}</span>
        }) 
      }
            </div>
        </div>
}

const Articles = () => {
    const [d, setD] = useState([
        {title: "", keyWords: "", _id: ""},
        {title: "", keyWords: "", _id: ""},
        {title: "", keyWords: "", _id: ""},
        {title: "", keyWords: "", _id: ""},
        {title: "", keyWords: "", _id: ""},
        {title: "", keyWords: "", _id: ""},
        {title: "", keyWords: "", _id: ""},
        {title: "", keyWords: "", _id: ""},
        {title: "", keyWords: "", _id: ""},
        {title: "", keyWords: "", _id: ""}
    ]);

  var from = 0;

  useEffect(() => {
      document.title = "Blog";
      fetch(`/blog?skip=0`)
          .then(res => res.json())
          .then(data => {
              setD(data);
          })
          .catch(err => console.log(err));
  }, []);

    const load = () => {
        let loadMoreButton = document.getElementById("load-2");
        loadMoreButton.classList.add("button-loading");
        from = from + 20;
        fetch(`/blog?skip=${from}`)
        .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    loadMoreButton.classList.remove("button-loading");
                    document.getElementById("load-p-2").textContent = "";
                    setD([...d, data[0]]);
                } else {
                    loadMoreButton.classList.remove("button-loading");
                    document.getElementById("load-p-2").textContent = "لا يوجد المزيد من المقالات.";
                }
            })
        .catch(err => console.log(err));
    }  


  return <>
    <section className="top container">
      <div className="row px-md-0 px-3">
        {
          d.map((obj, index) => {
            return <Article key={`article-${index}`} id={obj._id} title={obj.title} people={obj.numOfPeople} keyWords={obj.keyWords} />
          })  
        }
      </div>
      <div className="row">
        <div className="w-100 d-flex justify-content-center flex-wrap">
          <p id="load-p-2" className="text-white text-center w-100"></p>
          <button className="signin px-3 py-1 fw-bold mb-5" id="load-2" onClick={() => load()}>المزيد</button>
        </div>
      </div>
    </section>
  </>
}

const SingleArticle = () => {
  const Prism = import('prismjs');
  const { id } = useParams();
  const content = useRef(null);
  const [err, setErr] = useState(false);
  const [data, setData] = useState({
    title: "",
    body: "",
    keyWords: "",
    numOfPeople: "",
    created: "",
    updated: ""
  });

  useEffect(() => {
    fetch(`/blog/${id}`)
      .then(res => res.json())
      .then(d => {
        if (typeof d === "string") {
          setErr(true);
        }else {
          setData(d);
          content.current.innerHTML = d.body;
          document.title = d.title;
        }
      })
      .catch(err => console.log(err));

    axios.put(`/blog/saw/${id}`, {});
  }, []);

  // To colour the code
  useEffect(() => {
    let i = 0;
    while (document.querySelectorAll("pre")[i]) {
      let text = document.querySelectorAll("pre")[i].firstElementChild.textContent;
      Prism.highlightElement(document.querySelectorAll("pre")[i].firstElementChild);

      let elem = document.createElement("button");
      let elem2 = document.createElement("div");
      const textnode = document.createTextNode("Copy");
      elem2.classList.add("copy");
      elem.appendChild(textnode);
      elem2.appendChild(elem);

      elem.onclick = () => {
        navigator.clipboard.writeText(text);
      }

      document.querySelectorAll("pre")[i].insertBefore(elem2, document.querySelectorAll("pre")[i].firstElementChild);
      i++;
    }
  }, [data]);

  function scroll(elem) {
    let scrolled = window.scrollY;
    window.scrollTo(0, scrolled + elem.getBoundingClientRect().y - 95);
  }

  // 
  useEffect(() => {
    let parent = document.getElementById("article-menu-right");
    parent.style.height = `${window.innerHeight - 101}px`;
    let i = 0;
    while (document.querySelectorAll("h2")[i]) {
      if (document.querySelectorAll("h2")[i]) {
        let elemToScroll = document.querySelectorAll("h2")[i];
        let b = document.createElement("button");
        b.textContent = elemToScroll.textContent;
        b.onclick = () => scroll(elemToScroll);

        parent.appendChild(b);
      }
      i++;
    }
  }, [data]);

  function toggleMenu() {
    let elem = document.getElementById("article-menu-right");
    elem.classList.toggle("toggle");
  }
  if (!err) {
    return <>
    <div className="top container-fluid">
      <div className="row blog-menu py-1 d-flex flex-nowrap">
        <button className="col-1 d-md-none text-white d-flex align-items-center justify-content-center" onClick={() => toggleMenu()}>
          <img src={bookIcon} alt="book-icon"/>
        </button>
        <div className="col-5 col-md-6 d-flex flex-nowrap">
          <a href="/articles" className="fs-6">المقالات</a>
          <span className="px-1">{">"}</span>
          <a href={`/articles/${id}`} className="fs-6 text-uppercase text-nowrap">{data.title}</a>
        </div>
        <div className="col-6 d-flex flex-nowrap justify-content-end align-items-center">
          <p className="ps-1 m-0">{data.numOfPeople}</p>
          <img src={eye2} alt="eye" width="16" height="16" />
        </div>
      </div>
    </div>
    <section className="container mt-5">
      <div className="row flex-row-reverse px-md-0 px-3 rtl">
        <div className="col-12 col-md-9 col-lg-10">
          <h1 className="text-light">{data.title}</h1>
        </div>
      </div>
      <div className="row flex-row-reverse px-md-0 px-3 rtl">
        <div className="article-custom col-12 col-md-9 col-lg-10" ref={content}>

        </div>
        <div className="col-6 col-md-3 col-lg-2 article-menu-right toggle" id="article-menu-right">
          <p className="text-white w-100 fs-5 pt-1">العناوين الرئيسية</p>
        </div>
      </div>
    </section>
  </>
  }else {
    return <NotFound/>
  }
}

export { Articles, SingleArticle};