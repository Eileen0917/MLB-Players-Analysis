const db = require("./db");
const q1 = `SELECT yearID, CAST(AVG(salary) AS NUMBER(*,2)) avg_salary
FROM HSLiao.Salaries
WHERE yearID >= 2000
GROUP BY yearID
ORDER BY yearID`;
const q2_1 = `SELECT P.yearID, P.avg_era
FROM(SELECT yearID, CAST(AVG(salary) AS NUMBER(*,0)) avg_salary
    FROM HSLiao.Salaries
    GROUP BY yearID)S, (
    SELECT yearID,
        CAST(AVG(w) AS NUMBER(*,2)) avg_w,
        CAST(AVG(l) AS NUMBER(*,2)) avg_l,
        CAST(AVG(g) AS NUMBER(*,2)) avg_g,
        CAST(AVG(ipouts) AS NUMBER(*,2)) avg_ipouts,
        CAST(AVG(h) AS NUMBER(*,2)) avg_h,
        CAST(AVG(er) AS NUMBER(*,2)) avg_er,
        CAST(AVG(hr) AS NUMBER(*,2)) avg_hr,
        CAST(AVG(bb) AS NUMBER(*,2)) avg_bb,
        CAST(AVG(so) AS NUMBER(*,2)) avg_so,
        CAST(AVG(era) AS NUMBER(*,2)) avg_era
    FROM HSLiao.Pitching
    GROUP BY yearID)P
WHERE S.yearID = P.yearID
ORDER BY S.yeariD`;
const q2_2 = `WITH T AS(
  SELECT S.*, S1.high_salary, S1.low_salary
  FROM HSLiao.Salaries S LEFT JOIN(
      SELECT yearID,
          PERCENTILE_CONT(0.8) WITHIN GROUP(ORDER BY salary)high_salary,
          PERCENTILE_CONT(0.2) WITHIN GROUP(ORDER BY salary)low_salary
      FROM HSLiao.Salaries
      GROUP BY yearID
  ) S1 ON S1.yearID = S.yearID
)

SELECT S.yearID, P.avg_era
FROM(
  SELECT yearID, CAST(AVG(salary) AS NUMBER(*,2)) avg_salary
  FROM HSLiao.Salaries
  WHERE playerID in( SELECT playerID FROM T WHERE salary >= high_salary)
  GROUP BY yearID)S, (
  SELECT yearID,
      CAST(AVG(w) AS NUMBER(*,2)) avg_w,
      CAST(AVG(l) AS NUMBER(*,2)) avg_l,
      CAST(AVG(g) AS NUMBER(*,2)) avg_g,
      CAST(AVG(ipouts) AS NUMBER(*,2)) avg_ipouts,
      CAST(AVG(h) AS NUMBER(*,2)) avg_h,
      CAST(AVG(er) AS NUMBER(*,2)) avg_er,
      CAST(AVG(hr) AS NUMBER(*,2)) avg_hr,
      CAST(AVG(bb) AS NUMBER(*,2)) avg_bb,
      CAST(AVG(so) AS NUMBER(*,2)) avg_so,
      CAST(AVG(era) AS NUMBER(*,2)) avg_era
  FROM HSLiao.Pitching
  WHERE playerID in(SELECT playerID FROM T WHERE salary >= high_salary)
  GROUP BY yearID) P
WHERE  S.yearID = P.yearID
ORDER BY S.yearID`;
const q2_3 = `WITH T AS(
  SELECT S.*, S1.high_salary, S1.low_salary
  FROM HSLiao.Salaries S LEFT JOIN(
      SELECT yearID,
          PERCENTILE_CONT(0.8) WITHIN GROUP(ORDER BY salary)high_salary,
          PERCENTILE_CONT(0.2) WITHIN GROUP(ORDER BY salary)low_salary
      FROM HSLiao.Salaries
      GROUP BY yearID
  ) S1 ON S1.yearID = S.yearID
)
SELECT S.yearID, P.avg_era
FROM(
  SELECT yearID, CAST(AVG(salary) AS NUMBER(*,2)) avg_salary
  FROM HSLiao.Salaries
  WHERE playerID in( SELECT playerID FROM T WHERE salary <= low_salary)
  GROUP BY yearID)S, (
  SELECT yearID,
      CAST(AVG(w) AS NUMBER(*,2)) avg_w,
      CAST(AVG(l) AS NUMBER(*,2)) avg_l,
      CAST(AVG(g) AS NUMBER(*,2)) avg_g,
      CAST(AVG(ipouts) AS NUMBER(*,2)) avg_ipouts,
      CAST(AVG(h) AS NUMBER(*,2)) avg_h,
      CAST(AVG(er) AS NUMBER(*,2)) avg_er,
      CAST(AVG(hr) AS NUMBER(*,2)) avg_hr,
      CAST(AVG(bb) AS NUMBER(*,2)) avg_bb,
      CAST(AVG(so) AS NUMBER(*,2)) avg_so,
      CAST(AVG(era) AS NUMBER(*,2)) avg_era
  FROM HSLiao.Pitching
  WHERE playerID in(SELECT playerID FROM T WHERE salary <= low_salary)
  GROUP BY yearID) P
WHERE  S.yearID = P.yearID
ORDER BY S.yearID`;
const q2_4 = `WITH T AS(
  SELECT S.*, S1.high_salary, S1.low_salary
  FROM HSLiao.Salaries S LEFT JOIN(
      SELECT yearID,
          PERCENTILE_CONT(0.97) WITHIN GROUP(ORDER BY salary)high_salary,
          PERCENTILE_CONT(0.03) WITHIN GROUP(ORDER BY salary)low_salary
      FROM HSLiao.Salaries
      GROUP BY yearID
  ) S1 ON S1.yearID = S.yearID
)

SELECT S.yearID, P.avg_era
FROM(
  SELECT yearID, CAST(AVG(salary) AS NUMBER(*,2)) avg_salary
  FROM HSLiao.Salaries
  WHERE playerID in( SELECT playerID FROM T WHERE salary >= high_salary)
  GROUP BY yearID)S, (
  SELECT yearID,
      CAST(AVG(w) AS NUMBER(*,2)) avg_w,
      CAST(AVG(l) AS NUMBER(*,2)) avg_l,
      CAST(AVG(g) AS NUMBER(*,2)) avg_g,
      CAST(AVG(ipouts) AS NUMBER(*,2)) avg_ipouts,
      CAST(AVG(h) AS NUMBER(*,2)) avg_h,
      CAST(AVG(er) AS NUMBER(*,2)) avg_er,
      CAST(AVG(hr) AS NUMBER(*,2)) avg_hr,
      CAST(AVG(bb) AS NUMBER(*,2)) avg_bb,
      CAST(AVG(so) AS NUMBER(*,2)) avg_so,
      CAST(AVG(era) AS NUMBER(*,2)) avg_era
  FROM HSLiao.Pitching
  WHERE playerID in(SELECT playerID FROM T WHERE salary >= high_salary)
  GROUP BY yearID) P
WHERE  S.yearID = P.yearID
ORDER BY S.yearID`;
const q2_5 = `WITH T AS(
  SELECT S.*, S1.high_salary, S1.low_salary
  FROM HSLiao.Salaries S LEFT JOIN(
      SELECT yearID,
          PERCENTILE_CONT(0.97) WITHIN GROUP(ORDER BY salary)high_salary,
          PERCENTILE_CONT(0.03) WITHIN GROUP(ORDER BY salary)low_salary
      FROM HSLiao.Salaries
      GROUP BY yearID
  ) S1 ON S1.yearID = S.yearID
)
SELECT S.yearID, P.avg_era
FROM(
  SELECT yearID, CAST(AVG(salary) AS NUMBER(*,2)) avg_salary
  FROM HSLiao.Salaries
  WHERE playerID in( SELECT playerID FROM T WHERE salary <= low_salary)
  GROUP BY yearID)S, (
  SELECT yearID,
      CAST(AVG(w) AS NUMBER(*,2)) avg_w,
      CAST(AVG(l) AS NUMBER(*,2)) avg_l,
      CAST(AVG(g) AS NUMBER(*,2)) avg_g,
      CAST(AVG(ipouts) AS NUMBER(*,2)) avg_ipouts,
      CAST(AVG(h) AS NUMBER(*,2)) avg_h,
      CAST(AVG(er) AS NUMBER(*,2)) avg_er,
      CAST(AVG(hr) AS NUMBER(*,2)) avg_hr,
      CAST(AVG(bb) AS NUMBER(*,2)) avg_bb,
      CAST(AVG(so) AS NUMBER(*,2)) avg_so,
      CAST(AVG(era) AS NUMBER(*,2)) avg_era
  FROM HSLiao.Pitching
  WHERE playerID in(SELECT playerID FROM T WHERE salary <= low_salary)
  GROUP BY yearID) P
WHERE  S.yearID = P.yearID
ORDER BY S.yearID`;

async function run() {
  // chart 1
  const r1 = await db.run(q1);

  let year1 = [];
  let s1 = [];
  for (const item of r1) {
    year1.push(item.YEARID);
    s1.push(item.AVG_SALARY);
  }

  // chart 2
  const r2_1 = await db.run(q2_1);
  r2_1.map(result => {
    result.x = result.YEARID;
    result.y = result.AVG_ERA;
    delete result.YEARID;
    delete result.AVG_ERA;
  });
  const r2_2 = await db.run(q2_2);
  r2_2.map(result => {
    result.x = result.YEARID;
    result.y = result.AVG_ERA;
    delete result.YEARID;
    delete result.AVG_ERA;
  });
  const r2_3 = await db.run(q2_3);
  r2_3.map(result => {
    result.x = result.YEARID;
    result.y = result.AVG_ERA;
    delete result.YEARID;
    delete result.AVG_ERA;
  });
  const r2_4 = await db.run(q2_4);
  r2_4.map(result => {
    result.x = result.YEARID;
    result.y = result.AVG_ERA;
    delete result.YEARID;
    delete result.AVG_ERA;
  });
  const r2_5 = await db.run(q2_5);
  r2_5.map(result => {
    result.x = result.YEARID;
    result.y = result.AVG_ERA;
    delete result.YEARID;
    delete result.AVG_ERA;
  });
  // console.log(r2);

  let new_result = {
    year1,
    s1,
    r2_1,
    r2_2,
    r2_3,
    r2_4,
    r2_5
  };

  return JSON.stringify(new_result);
}

module.exports = { run };
