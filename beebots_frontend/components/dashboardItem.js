import { useState } from "react";
import Box from "./box";

import styles from "./dashboardItem.module.scss";

export default function DashboardItem({
  children,
  title,
  use2Times = false,
  onTimeSpanChange = () => {},
  onTimeSpan2Change = () => {},
  availableTimeSpans = [1, 7, 30],
  className,
}) {
  const [timeSpan1, setTimeSpan1] = useState(1);
  const [timeSpan2, setTimeSpan2] = useState(7);

  return (
    //maxwidth of a content = 600px ca? (for mobile optimization)
    <Box className={className + " " + styles.BoxWrapper}>
      <div className={styles.wrapper}>
        <p>{title}</p>
        <div className={styles.times}>
          {use2Times ? (
            <>
              <select
                onChange={(e) => {
                  setTimeSpan2(e.target.value);
                  onTimeSpan2Change(e.target.value);
                }}
              >
                {timeSpan1 <= 7 ? <option value={7}>7d</option> : null}
                {timeSpan1 <= 30 ? <option value={30}>30d</option> : null}
                {timeSpan1 <= 60 ? <option value={60}>180d</option> : null}
              </select>
              <span>/</span>
            </>
          ) : null}
          <>
            <select
              className={styles.secondTime}
              onChange={(e) => {
                setTimeSpan1(e.target.value);
                if (timeSpan1 > timeSpan2) {
                  setTimeSpan2(timeSpan1);
                  onTimeSpan2Change(timeSpan1);
                }
                onTimeSpanChange(e.target.value);
              }}
            >
              {
                availableTimeSpans.map((timeSpan) => (
                  <option key={timeSpan} value={timeSpan}>{timeSpan}d</option>
                ))
              }

            </select>
          </>
        </div>
      </div>
         <div>{children}</div>
    </Box>
  );
}
