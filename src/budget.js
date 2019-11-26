const db = require("./db");
const sql = `SELECT T.teamID, T.yearID, T.name, T.win_rate ,COUNT(*) high_salary_players
FROM(
    SELECT T1.teamID, T1.name, T1.yearID, CAST(T1.win/T1.game AS NUMBER(*,3)) win_rate, T2.high_salary
    FROM HSLiao.Teams T1 LEFT JOIN(
        SELECT yearID,PERCENTILE_CONT(0.8) WITHIN GROUP(ORDER BY salary) high_salary
        FROM HSLiao.Salaries
        GROUP BY yearID)T2 ON T1.yearID = T2.yearID
    WHERE T1.yearID <= 2016
    ) T
    LEFT JOIN HSLiao.Salaries S ON S.teamID = T.teamID AND S.yearID = T.yearID
WHERE S.salary >= T.high_salary
GROUP BY T.teamID, T.name, T.win_rate ,T.yearID
ORDER BY T.yearID DESC, high_salary_players DESC`;

async function run() {
  const result = await db.run(sql);
  //   console.log(result[2]);
  return result;
}

module.exports = { run };
