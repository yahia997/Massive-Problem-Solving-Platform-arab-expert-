import React, { useEffect } from "react";

const Info = () => {
    useEffect(() => {
        document.title = "Info";
    }, []);
    return <>
        <section className="container top">
            <h3 className="py-3 text-white">تعليمات مهمة:</h3>
            <ol>
                <li className="text-light py-2">قم بكتابة الكود الخاص بك في منطقة كتابة الكود</li>
                <li className="text-light py-2">ثم قم بالضغط علي تشغيل و ستظهر نتائج console.log في منطة الكونسول و هذا لكي تتأكد من الكود قبل رفع الحل الخاص بك</li>
                <li className="text-light py-2">لن يظهر في الكونسول شيء إذا لم تعمل إستدعاء للfunction وكان كل الconsole.log بداخلها </li>
                <li className="text-light py-2">إذا قمت باستدعاء ال function و بداخلها console.log فسيطبعها و سيطبع بعدها undefined إذا لم ترجع الوظيفة قيمة return</li>
                <li className="text-light py-2">بعد الإنتهاء من كتابة كودك قم بالضغط علي إنهاء لكي تجتاز التحدي و تأخذ نقاطك</li>
                <li className="text-light py-2">حاول أن تقوم باجتياز التحدي بنفسك أولا و لكن إن واجهتك صعوبة قم بالضغط علي أستسلم أرني الكود</li>
                <li className="text-light py-2">عند ضغطك علي أستسلم أرني الكود لن يضيف إلي نقاطك إلا خمسة نقاط و ليس نقاط التحدي كاملة</li>
            </ol>
        </section>
    </>
}

export { Info };