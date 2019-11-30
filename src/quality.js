const db = require("./db");
const sql = `SELECT yearID, CAST(AVG(salary) AS NUMBER(*,2)) avg_salary
FROM HSLiao.Salaries
GROUP BY yearID
ORDER BY yearID`;

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
