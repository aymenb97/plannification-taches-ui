import React, { useEffect, useState } from "react";
import { instanceToken as axios } from "../../common/axiosWithAuth";
import { useSelector } from "react-redux";
import { EventSourcePolyfill } from "event-source-polyfill";
import { UserCircle } from "../UserCircle";
export default function ChatInner(props) {
  const [receiverId, setReveiverId] = useState(props.match.params.id);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState();
  const [messageText, setMessageText] = useState("");
  const [newMessages, setNewMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const jwt = useSelector((state) => state.auth.tokenId);
  const senderId = useSelector((state) => state.auth.id);
  const [name, setName] = useState("");
  const url = new URL("http://localhost:3000/.well-known/mercure?topic=*");

  useEffect(() => {
    const objDiv = document.getElementById("chat_inner_body");
    objDiv.scrollTop = objDiv.scrollHeight;
    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdLCJwYXlsb2FkIjp7InVzZXIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2R1bmdsYXMiLCJyZW1vdGVBZGRyIjoiMTI3LjAuMC4xIn19fQ.2VRuZZbCTVRQYhlNZW5Qsk5KffxJ4dKg8lOTxbZv-iQ`,
      },
    });
    eventSource.onmessage = (e) => {
      if (JSON.parse(e.data).receiver === `/api/users/${senderId}`) {
        let nMessages = [...newMessages];
        console.log(newMessages);

        const data = JSON.parse(e.data);
        nMessages.push({
          id: data.id,
          message: data.message,
          sender: data.sender,
          receiver: data.receiver,
        });

        console.log("AFTER", newMessages);

        setNewMessages(nMessages);
      }
    };
    if (messages.length === 0) {
      axios
        .get(`/messages?sender=${senderId}&receiver=${receiverId}`)
        .then((res) => {
          setMessages(res.data["hydra:member"]);

          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
      axios.get(`/users/${receiverId}`).then((res) => {
        setName(res.data.name + " " + res.data.surname);
      });
    }

    return function cleanup() {
      eventSource.close();
    };
  }, [newMessages]);

  function sendMessage() {
    setMessageText("");
    if (messageText.trim() !== "") {
      const nMessages = [...newMessages];
      const message = {
        message: messageText,
        sender: "/api/users/" + senderId,
        receiver: "/api/users/" + receiverId,
      };
      nMessages.push(message);
      setNewMessages(nMessages);
      const objDiv = document.getElementById("chat_inner_body");
      objDiv.scrollTop = objDiv.scrollHeight;
      axios
        .post(`/messages?sender=${senderId}&receiver=${receiverId}`, message)
        .then((res) => {});
    }
  }
  function enterToSendMessage(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }
  return (
    <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">
      <div className="card">
        <div className="card-header" id="kt_chat_messenger_header">
          <div className="d-flex justify-content-center flex-column me-3">
            <div className="d-flex flex-stack  py-4 rounded">
              <div className="d-flex align-items-center ">
                <UserCircle name={name} />
                <div className="ms-5">
                  <span className="fs-5 fw-bolder text-gray-900 mb-2">
                    {name}
                  </span>
                  <div className="fw-bold text-gray-400">{props.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-title"></div>
        <div className="card-body" id="kt_chat_messenger_body">
          <div
            id="chat_inner_body"
            className="scroll-y me-n5 pe-5 h-300px h-lg-auto"
            data-kt-element="messages"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer"
            data-kt-scroll-wrappers="#kt_content, #kt_chat_messenger_body"
            data-kt-scroll-offset="-2px"
            style={{ maxHeight: "250px" }}
          >
            {messages.map((el) =>
              el.sender.split("/")[3] === senderId.toString() ? (
                <div
                  key={el.id}
                  className="d-flex d-flex justify-content-end mb-5"
                >
                  <div className="d-flex flex-column align-items align-items-end">
                    <div className="p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end">
                      {el.message}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={el.id}
                  className="d-flex d-flex justify-content-start  mb-5"
                >
                  <div className="d-flex flex-column align-items align-items-start">
                    <div className="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start">
                      {el.message}
                    </div>
                  </div>
                </div>
              )
            )}
            {newMessages.map((el) =>
              el.sender.split("/")[3] === senderId.toString() ? (
                <div
                  key={el.id}
                  className="d-flex d-flex justify-content-end mb-5"
                >
                  <div className="d-flex flex-column align-items align-items-end">
                    <div className="p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end">
                      {el.message}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={el.id}
                  className="d-flex d-flex justify-content-start  mb-5"
                >
                  <div className="d-flex flex-column align-items align-items-start">
                    <div className="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start">
                      {el.message}
                    </div>
                  </div>
                </div>
              )
            )}

            <div className="d-flex d-flex justify-content-end mb-10 mb-10"></div>
          </div>
          <div className="card-footer pt-4">
            <textarea
              onKeyPress={enterToSendMessage}
              className="form-control form-control-flush mb-3"
              rows="1"
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
              }}
              data-kt-element="input"
              placeholder="Ecrire votre message"
              style={{ height: "43px" }}
            ></textarea>
            <div className="d-flex flex-stack justify-content-end pt-1">
              <button onClick={sendMessage} className="btn btn-primary">
                Envoyer
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
