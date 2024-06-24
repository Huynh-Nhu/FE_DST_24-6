import { useEffect } from "react";

const PatternGuideLine = () => {
  useEffect(() => {
    console.log("SHOW");
  }, []);

  return (
    <div className="floating-box change-icon">
      <div className="title">
        <span>PATTERN</span>
      </div>

      <div className="icons-container p-4">
        <p>[1..3]  : Giá trị tại pattern</p>
        <p>[4..4]  : Tháng hiện tại (A - L)</p>
        <p>[5..6]  : 2 số cuối của năm, </p>
        <p>[7..16]  : Mã tự tăng từ A -Z và từ 0-9 (chuyển từ base 10 sang các base bất kỳ)</p>
      </div>
    </div>
  );
};
export default PatternGuideLine;
