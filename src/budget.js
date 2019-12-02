const db = require("./db");
const sql = `(SELECT T.teamID, T.yearID, T.name, T.win_rate ,COUNT(*) high_salary_players
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
ORDER BY T.yearID DESC, high_salary_players DESC)`;

const query1 = `SELECT teamid, high_salary_players
FROM ${sql}
WHERE yearid = 2016`;

const query1_1 = `SELECT yearid, win_rate
FROM ${sql}
WHERE teamid = 'NYA'
ORDER BY yearid`;

const q1_2 = `SELECT yearid, win_rate
FROM ${sql}
WHERE teamid = 'LAN'
ORDER BY yearid`;

const q1_4 = `SELECT yearid, win_rate
FROM ${sql}
WHERE teamid = 'BOS'
ORDER BY yearid`;

const q1_3 = `SELECT yearid, win_rate
FROM ${sql}
WHERE teamid = 'TBA'
ORDER BY yearid`;

const q3 = `SELECT teamid, CAST (AVG(high_salary_players) AS NUMBER(*,3)) avg_h_salary_players
FROM ${sql}
WHERE yearid >= 2000
GROUP BY (teamid)
ORDER BY avg_h_salary_players`;

const q4 = `SELECT teamid, win_rate, high_salary_players
FROM ${sql}
WHERE yearid = 2016`;

const q5 = `SELECT yearID,CAST(CORR(winrate,total_salary) AS NUMBER(*,4)) correlation
FROM(
    SELECT T.teamID, T.yearID, T.name, T.winrate, SUM(S.salary) total_salary
    FROM (
        SELECT  teamID, yearID, name, CAST(win/game AS NUMBER(*,3)) winrate
        FROM HSLiao.Teams
        WHERE yearID <= 2016
    )T LEFT JOIN HSLiao.Salaries S
    ON S.teamID = T.teamID AND S.yearID = T.yearID
    GROUP BY T.teamID, T.yearID, T.name, T.winrate)
GROUP BY yearID
ORDER BY yearID`;

async function run() {
  // chart 1
  const results1 = await db.run(query1);

  let teams1 = [];
  let players1 = [];

  for (const item of results1) {
    teams1.push(item.TEAMID);
    players1.push(item.HIGH_SALARY_PLAYERS);
  }

  // chart 2
  const r2_nya = await db.run(query1_1);
  r2_nya.map(result => {
    result.x = result.YEARID;
    result.y = result.WIN_RATE;
    delete result.YEARID;
    delete result.WIN_RATE;
  });

  const r2_lan = await db.run(q1_2);
  r2_lan.map(result => {
    result.x = result.YEARID;
    result.y = result.WIN_RATE;
    delete result.YEARID;
    delete result.WIN_RATE;
  });

  const r2_bos = await db.run(q1_4);
  r2_bos.map(result => {
    result.x = result.YEARID;
    result.y = result.WIN_RATE;
    delete result.YEARID;
    delete result.WIN_RATE;
  });

  const r2_tba = await db.run(q1_3);
  r2_tba.map(result => {
    result.x = result.YEARID;
    result.y = result.WIN_RATE;
    delete result.YEARID;
    delete result.WIN_RATE;
  });

  // chart 3
  const r3 = await db.run(q3);
  let teams3 = [];
  let players3 = [];

  for (const item of r3) {
    teams3.push(item.TEAMID);
    players3.push(item.AVG_H_SALARY_PLAYERS);
  }

  // chart 4
  const r4 = await db.run(q4);
  r4.map(result => {
    result.x = result.HIGH_SALARY_PLAYERS;
    result.y = result.WIN_RATE;
    delete result.HIGH_SALARY_PLAYERS;
    delete result.WIN_RATE;
    delete result.TEAMID;
  });

  // chart 5
  const r5 = await db.run(q5);
  let year5 = [];
  let c5 = [];

  for (const item of r5) {
    year5.push(item.YEARID);
    c5.push(item.CORRELATION);
  }

  let new_result = {
    teams1,
    players1,
    r2_nya,
    r2_lan,
    r2_bos,
    r2_tba,
    teams3,
    players3,
    r4,
    year5,
    c5
  };
  return JSON.stringify(new_result);
}

module.exports = { run };
