import React, { useEffect } from "react";
export default function ChatInner() {
  useEffect(() => {
    const url = new URL("http://localhost:3000/.well-known/mercure?topic=*");
    const eventSource = new EventSource(url);
    eventSource.onmessage = (e) => console.log(JSON.parse(e["data"])); // do something with the payload
  });
  return (
    <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">
      <div className="card">
        <div className="card-header" id="kt_chat_messenger_header">
          <div className="d-flex justify-content-center flex-column me-3">
            <span className="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1">
              Lorem Ipsum
            </span>
          </div>
        </div>
        <div className="card-title"></div>
        <div className="card-body" id="kt_chat_messenger_body">
          <div
            className="scroll-y me-n5 pe-5 h-300px h-lg-auto"
            data-kt-element="messages"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer"
            data-kt-scroll-wrappers="#kt_content, #kt_chat_messenger_body"
            data-kt-scroll-offset="-2px"
            style={{ maxHeight: "223px" }}
          >
            <div className="d-flex d-flex justify-content-start mb-10 mb-10">
              <div className="d-flex flex-column align-items align-items-start">
                <div className="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start">
                  How likely are you to recommend our company to your friends
                  and family ?
                </div>
              </div>
            </div>
            <div className="d-flex d-flex justify-content-end mb-10 mb-10">
              <div className="d-flex flex-column align-items align-items-end">
                <div className="p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end">
                  Hey there, we’re just writing to let you know that you’ve been
                  subscribed to a repository on GitHub.
                </div>
              </div>
            </div>
            <div className="d-flex d-flex justify-content-end mb-10 mb-10"></div>
          </div>
          <div className="card-footer pt-4">
            <textarea
              className="form-control form-control-flush mb-3"
              rows="1"
              data-kt-element="input"
              placeholder="Ecrire votre message"
              style={{ height: "43px" }}
            ></textarea>
            <div className="d-flex flex-stack justify-content-end pt-1">
              <button className="btn btn-primary">Envoyer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
