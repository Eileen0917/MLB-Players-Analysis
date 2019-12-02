const db = require("./db");
const q1_2015 = `SELECT CAST(AVG(DECODE(scoring_position, 'Yes', start_speed, null)) AS NUMBER(*,2)) on2b3b,
CAST(AVG(DECODE(scoring_position, 'No', start_speed, null)) AS NUMBER(*,2)) non_on2b3b,
CAST(STATS_T_TEST_INDEP(scoring_position, start_speed, 'STATISTIC', 'Yes') AS NUMBER(*,2)) t_statistics,
STATS_T_TEST_INDEP(scoring_position,start_speed) p_value
FROM(
SELECT ABID, start_speed, 
    (case when on_2b = 1 or on_3b = 1 THEN 'Yes' ELSE 'No' END) AS scoring_position
FROM HSLIAO.pitches_2015
WHERE pitch_type in ('FF'))`;

const q1_2016 = `SELECT CAST(AVG(DECODE(scoring_position, 'Yes', start_speed, null)) AS NUMBER(*,2)) on2b3b,
CAST(AVG(DECODE(scoring_position, 'No', start_speed, null)) AS NUMBER(*,2)) non_on2b3b,
CAST(STATS_T_TEST_INDEP(scoring_position, start_speed, 'STATISTIC', 'Yes') AS NUMBER(*,2)) t_statistics,
STATS_T_TEST_INDEP(scoring_position,start_speed) p_value
FROM(
SELECT ABID, start_speed, 
    (case when on_2b = 1 or on_3b = 1 THEN 'Yes' ELSE 'No' END) AS scoring_position
FROM HSLIAO.pitches_2016
WHERE pitch_type in ('FF'))`;

const q1_2017 = `SELECT CAST(AVG(DECODE(scoring_position, 'Yes', start_speed, null)) AS NUMBER(*,2)) on2b3b,
CAST(AVG(DECODE(scoring_position, 'No', start_speed, null)) AS NUMBER(*,2)) non_on2b3b,
CAST(STATS_T_TEST_INDEP(scoring_position, start_speed, 'STATISTIC', 'Yes') AS NUMBER(*,2)) t_statistics,
STATS_T_TEST_INDEP(scoring_position,start_speed) p_value
FROM(
SELECT ABID, start_speed, 
    (case when on_2b = 1 or on_3b = 1 THEN 'Yes' ELSE 'No' END) AS scoring_position
FROM HSLIAO.pitches_2017
WHERE pitch_type in ('FF'))`;

const q1_2018 = `SELECT CAST(AVG(DECODE(scoring_position, 'Yes', start_speed, null)) AS NUMBER(*,2)) on2b3b,
CAST(AVG(DECODE(scoring_position, 'No', start_speed, null)) AS NUMBER(*,2)) non_on2b3b,
CAST(STATS_T_TEST_INDEP(scoring_position, start_speed, 'STATISTIC', 'Yes') AS NUMBER(*,2)) t_statistics,
STATS_T_TEST_INDEP(scoring_position,start_speed) p_value
FROM(
SELECT ABID, start_speed, 
    (case when on_2b = 1 or on_3b = 1 THEN 'Yes' ELSE 'No' END) AS scoring_position
FROM HSLIAO.pitches_2018
WHERE pitch_type in ('FF'))`;

const q2_2 = `SELECT CAST(AVG(DECODE(s2, 'Yes', start_speed, null)) AS NUMBER(*,2)) s2,
CAST(AVG(DECODE(s2, 'No', start_speed, null)) AS NUMBER(*,2)) non_s2,
CAST(STATS_T_TEST_INDEP(s2, start_speed, 'STATISTIC', 'Yes') AS NUMBER(*,2)) t_statistics,
STATS_T_TEST_INDEP(s2,start_speed) p_value
FROM(
SELECT ABID, start_speed,
    (case when S_COUNT = 2 THEN 'Yes' ELSE 'No' END) AS s2
FROM HSLIAO.pitches_2016
WHERE pitch_type in ('FF')
UNION
SELECT ABID, start_speed,
    (case when S_COUNT = 2 THEN 'Yes' ELSE 'No' END) AS s2
FROM HSLIAO.pitches_2017
WHERE pitch_type in ('FF')
UNION
SELECT ABID, start_speed,
    (case when S_COUNT = 2 THEN 'Yes' ELSE 'No' END) AS s2
FROM HSLIAO.pitches_2018
WHERE pitch_type in ('FF')
UNION
SELECT ABID, start_speed,
    (case when S_COUNT = 2 THEN 'Yes' ELSE 'No' END) AS s2
FROM HSLIAO.pitches_2015
WHERE pitch_type in ('FF'))`;

const q2_0 = `SELECT CAST(AVG(DECODE(s2, 'Yes', start_speed, null)) AS NUMBER(*,2)) s2,
CAST(AVG(DECODE(s2, 'No', start_speed, null)) AS NUMBER(*,2)) non_s2,
CAST(STATS_T_TEST_INDEP(s2, start_speed, 'STATISTIC', 'Yes') AS NUMBER(*,2)) t_statistics,
STATS_T_TEST_INDEP(s2,start_speed) p_value
FROM(
SELECT ABID, start_speed,
    (case when S_COUNT = 0 THEN 'Yes' ELSE 'No' END) AS s2
FROM HSLIAO.pitches_2016
WHERE pitch_type in ('FF')
UNION
SELECT ABID, start_speed,
    (case when S_COUNT = 0 THEN 'Yes' ELSE 'No' END) AS s2
FROM HSLIAO.pitches_2017
WHERE pitch_type in ('FF')
UNION
SELECT ABID, start_speed,
    (case when S_COUNT = 0 THEN 'Yes' ELSE 'No' END) AS s2
FROM HSLIAO.pitches_2018
WHERE pitch_type in ('FF')
UNION
SELECT ABID, start_speed,
    (case when S_COUNT = 0 THEN 'Yes' ELSE 'No' END) AS s2
FROM HSLIAO.pitches_2015
WHERE pitch_type in ('FF'))`;

async function run() {
  // chart 1
  const r1_2015 = await db.run(q1_2015);
  const r1_2016 = await db.run(q1_2016);
  const r1_2017 = await db.run(q1_2017);
  const r1_2018 = await db.run(q1_2018);

  const ON2B3B = [];
  const NON_ON2B3B = [];

  ON2B3B.push(r1_2015[0].ON2B3B);
  ON2B3B.push(r1_2016[0].ON2B3B);
  ON2B3B.push(r1_2017[0].ON2B3B);
  ON2B3B.push(r1_2018[0].ON2B3B);

  NON_ON2B3B.push(r1_2015[0].NON_ON2B3B);
  NON_ON2B3B.push(r1_2016[0].NON_ON2B3B);
  NON_ON2B3B.push(r1_2017[0].NON_ON2B3B);
  NON_ON2B3B.push(r1_2018[0].NON_ON2B3B);

  // chart 2
  const r2_2 = await db.run(q2_2);
  const r2_0 = await db.run(q2_0);

  const new_result = { ON2B3B, NON_ON2B3B, r2_2, r2_0 };

  return JSON.stringify(new_result);
}

module.exports = { run };
