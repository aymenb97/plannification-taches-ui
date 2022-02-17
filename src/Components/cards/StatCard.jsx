export default function StatCard(props) {
  return (
    <div className="card card-xl-stretch mb-xl-8">
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1">{props.title}</span>
          <span className="text-muted fw-bold fs-7">{props.count}</span>
        </h3>
      </div>
      <div className="card-body pt-2 ">
        <div
          className="scroll-y me-n5 pe-5 h-200px h-lg-auto"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header"
          data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body"
          data-kt-scroll-offset="0px"
          style={{ maxHeight: "233px" }}
        >
          {props.tasks
            ? props.tasks.map((task) => (
                <div className="d-flex align-items-center mb-8 fadeIn">
                  <div className="flex-grow-1 mx-5">
                    <span className="text-gray-800 fw-bolder fs-6">
                      {task.titreTache}
                    </span>
                    <div
                      className={`progress h-7px ${props.color} bg-opacity-50 mt-1`}
                    >
                      <div
                        className={`progress-bar ${props.color}`}
                        style={{ width: `${task.tauxAvancement}%` }}
                      ></div>
                    </div>
                    <span className="text-muted fw-bold d-block mt-1">
                      Taux: {task.tauxAvancement}%
                    </span>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
