import { Divider } from "@mui/material";
const Assignment = ({ assignment, attendant }) => {
  return (
    <div className="w-full space-y-1 lg:w-1/3">
      <div className="text-lg lg:text-xl">委派項目</div>
      <Divider className="my-2" />
      {!!attendant && (
        <div className="space-y-5">
          <div className="text-base lg:text-lg">
            服務位置：
            {!!attendant && ` ${assignment.number}號 — `}
            {assignment.position}
          </div>
          <ol className="text-base text-red-500 lg:text-lg">
            服務內容：
            {assignment.content.split("\n").map((item) => (
              <li
                style={{ listStyleType: "disc" }}
                className="ml-4 text-sm lg:text-lg"
                key={item}
              >
                {item}
              </li>
            ))}
          </ol>
          <div className="text-base lg:text-lg">
            負責的招待員：
            {assignment.isSeat ? (
              assignment.morningAttendant
            ) : (
              <div className="pl-6 text-sm lg:text-base">
                <div>
                  上午班次：
                  {assignment.morningAttendant}
                </div>
                <div>
                  下午班次：
                  {assignment.afternoonAttendant}
                </div>
              </div>
            )}
          </div>

          <div className="text-base lg:text-lg">
            服務時段：
            {assignment.isSeat ? (
              "8:00 ～ 大會結束後40分鐘"
            ) : (
              <div className="pl-6 text-sm lg:text-base">
                <div>上午班次：8:00 ～ 上午節目結束後15分鐘</div>
                <div>下午班次：上午節目結束後15分鐘 ～ 大會結束後40分鐘</div>
              </div>
            )}
          </div>
        </div>
      )}
      {!attendant && (
        <div className="text-lg italic text-slate-300">請選擇招待員號碼</div>
      )}
    </div>
  );
};

export default Assignment;
