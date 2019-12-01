const db = require("./db");
const q1 = `SELECT P1.nameFirst, P1.nameLast, P.yearID,
p.h, P.so, P.era
FROM HSLiao.Pitching P
LEFT JOIN HSLiao.Teams T on P.teamID = T.teamID AND P.yearID = T.yearID
LEFT JOIN HSLiao.Players P1 ON P1.playerID = P.playerID
WHERE P.playerID in (
SELECT playerID
FROM HSLiao.Pitching
GROUP BY playerID
HAVING SUM(G) > 50
INTERSECT
SELECT playerID
FROM HSLiao.Players
WHERE EXTRACT(YEAR FROM finalgame) - EXTRACT(YEAR FROM debut) >= 10) and namelast = 'Scherzer'
ORDER BY P.playerID, P.yearID`;

const q2 = `SELECT P1.nameFirst, P1.nameLast, P.yearID, T.name, P.w, P.l, P.g, P.ipouts,
p.h, P.er, P.hr, P.bb, P.so, P.era, P.r
FROM HSLiao.Pitching P
LEFT JOIN HSLiao.Teams T on P.teamID = T.teamID AND P.yearID = T.yearID
LEFT JOIN HSLiao.Players P1 ON P1.playerID = P.playerID
WHERE P.playerID in (
SELECT playerID
FROM HSLiao.Pitching
GROUP BY playerID
HAVING SUM(G) > 50
INTERSECT
SELECT playerID
FROM HSLiao.Players
WHERE EXTRACT(YEAR FROM finalgame) - EXTRACT(YEAR FROM debut) >= 10) and namelast = 'Wang'
ORDER BY P.playerID, P.yearID`;

async function run() {
  const r1 = await db.run(q1);
  const h1 = [];
  const so1 = [];
  const era1 = [];

  for (const item of r1) {
    let hLog = {
      x: item.YEARID,
      y: item.H
    };
    let soLog = {
      x: item.YEARID,
      y: item.SO
    };
    let eraLog = {
      x: item.YEARID,
      y: item.ERA
    };
    h1.push(hLog);
    so1.push(soLog);
    era1.push(eraLog);
  }

  const r2 = await db.run(q2);
  const h2 = [];
  const so2 = [];
  const era2 = [];

  for (const item of r2) {
    let hLog = {
      x: item.YEARID,
      y: item.H
    };
    let soLog = {
      x: item.YEARID,
      y: item.SO
    };
    let eraLog = {
      x: item.YEARID,
      y: item.ERA
    };
    h2.push(hLog);
    so2.push(soLog);
    era2.push(eraLog);
  }

  console.log(r2);
  const new_result = { h1, so1, era1, h2, so2, era2 };

  return JSON.stringify(new_result);
}

module.exports = { run };
