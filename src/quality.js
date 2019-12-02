const db = require("./db");
const q1 = `SELECT CAST(AVG(DECODE(scoring_position, 'Yes', start_speed, null)) AS NUMBER(*,2)) on2b3b,
CAST(AVG(DECODE(scoring_position, 'No', start_speed, null)) AS NUMBER(*,2)) non_on2b3b,
CAST(STATS_T_TEST_INDEP(scoring_position, start_speed, 'STATISTIC', 'Yes') AS NUMBER(*,2)) t_statistics,
STATS_T_TEST_INDEP(scoring_position,start_speed) p_value
FROM(
SELECT ABID, start_speed, 
    (case when on_2b = 1 or on_3b = 1 THEN 'Yes' ELSE 'No' END) AS scoring_position
FROM HSLIAO.pitches_2015
WHERE pitch_type in ('FF'))`;

async function run() {
  const r1 = await db.run(q1);
  console.log(r1);
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

  let new_result = {};
  return JSON.stringify(new_result);
}

module.exports = { run };
