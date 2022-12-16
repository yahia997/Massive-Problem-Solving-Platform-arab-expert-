const NotFound =  () => {
  const notFound = require('./images/not-found.png');
  return <>
    <section className="top container">
      <div className="row justify-content-center">
        <img src={notFound} alt="404" className="col-lg-6 col-md-10 col-12" />
        <div className="col-12 row justify-content-center">
          <a href="/" className="d-block col-lg-6 col-md-10 col-12 signin text-center py-2 text-decoration-none fw-bold">الصفحة الرئيسية</a>
        </div>
      </div>
    </section>
  </>
}

export default NotFound;