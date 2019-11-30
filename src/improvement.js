const db = require("./db");
const sql = `SELECT P.nameFirst, P.nameLast, B.yearid, T.name, B.g, B.ab, B.r, B.h, B.rbi, B.hbp
FROM HSLiao.Batting B
    LEFT JOIN HSLiao.Teams T on B.teamID = T.teamID AND B.yearID = T.yearID
    LEFT JOIN HSLiao.Players P ON P.playerID = B.playerID
WHERE B.playerID in (
    SELECT playerID
    FROM HSLiao.Players
    WHERE EXTRACT(YEAR FROM finalgame) - EXTRACT(YEAR FROM debut) >= 10)
    AND B.playerID in (
    SELECT playerID
    FROM HSLiao.Batting
    GROUP BY playerID
    HAVING SUM(AB) > 1000
    )
ORDER BY B.playerID, B.yearID`;

async function run() {
  const results = await db.run(sql);
  //   let new_result = {};
  //   for (const item of results) {
  //     let log = {
  //       x: item.WIN_RATE,
  //       y: item.HIGH_SALARY_PLAYERS
  //     };
  //     if (!new_result[item.NAME]) {
  //       new_result[item.NAME] = [];
  //     }
  //     new_result[item.NAME].push(log);
  //   }

  //   console.log(new_result);

  return JSON.stringify(results);
}

module.exports = { run };
