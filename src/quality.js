const db = require("./db");
const q1 = `SELECT most_used,Count(*) counts,CAST(100*(COUNT(*)/sum(count(*)) over()) AS NUMBER(*,2))  percentage
FROM (
  SELECT namefirst,namelast, STATS_MODE(pitch_type) most_used FROM HSLiao.pitches_2016 P
LEFT JOIN HSLIAO.atbats_2016 A ON A.abID = P.abID
LEFT JOIN HSLiao.players P1 ON A.pitcherID = P1.nameID WHERE P1.playerID in (
SELECT playerID
FROM HSLiao.Pitching
WHERE yearID = 2016 AND G > 10 AND era <=(
SELECT PERCENTILE_CONT(0.2) WITHIN GROUP(ORDER BY era) FROM HSLiao.pitching
WHERE yearid = 2016 AND G > 10))
GROUP BY playerID, namefirst, namelast )
GROUP BY most_used`;

const q2_2015 = `SELECT most_used,
Count(*) counts,
CAST(100*(COUNT(*)/sum(count(*)) over()) AS NUMBER(*,2)) percentage
FROM (
SELECT namefirst,namelast, STATS_MODE(pitch_type) most_used FROM HSLiao.pitches_2015 P
LEFT JOIN HSLIAO.atbats_2015 A ON A.abID = P.abID
LEFT JOIN HSLiao.players P1 ON A.pitcherID = P1.nameID WHERE pitch_type !='FF'
AND P1.playerID in (
SELECT playerID
FROM HSLiao.Pitching
WHERE yearID = 2015 AND G > 10 AND era <=(
SELECT PERCENTILE_CONT(0.2) WITHIN GROUP(ORDER BY era) FROM HSLiao.pitching
WHERE yearid = 2015 AND G > 10))
GROUP BY playerID, namefirst, namelast )
GROUP BY most_used ORDER BY most_used`;

const q2_2016 = `SELECT most_used,
Count(*) counts,
CAST(100*(COUNT(*)/sum(count(*)) over()) AS NUMBER(*,2)) percentage
FROM (
SELECT namefirst,namelast, STATS_MODE(pitch_type) most_used FROM HSLiao.pitches_2016 P
LEFT JOIN HSLIAO.atbats_2016 A ON A.abID = P.abID
LEFT JOIN HSLiao.players P1 ON A.pitcherID = P1.nameID WHERE pitch_type !='FF'
AND P1.playerID in (
SELECT playerID
FROM HSLiao.Pitching
WHERE yearID = 2016 AND G > 10 AND era <=(
SELECT PERCENTILE_CONT(0.2) WITHIN GROUP(ORDER BY era) FROM HSLiao.pitching
WHERE yearid = 2016 AND G > 10))
GROUP BY playerID, namefirst, namelast )
GROUP BY most_used ORDER BY most_used`;

const q2_2017 = `SELECT most_used,
Count(*) counts,
CAST(100*(COUNT(*)/sum(count(*)) over()) AS NUMBER(*,2)) percentage
FROM (
SELECT namefirst,namelast, STATS_MODE(pitch_type) most_used FROM HSLiao.pitches_2017 P
LEFT JOIN HSLIAO.atbats_2017 A ON A.abID = P.abID
LEFT JOIN HSLiao.players P1 ON A.pitcherID = P1.nameID WHERE pitch_type !='FF'
AND P1.playerID in (
SELECT playerID
FROM HSLiao.Pitching
WHERE yearID = 2017 AND G > 10 AND era <=(
SELECT PERCENTILE_CONT(0.2) WITHIN GROUP(ORDER BY era) FROM HSLiao.pitching
WHERE yearid = 2017 AND G > 10))
GROUP BY playerID, namefirst, namelast )
GROUP BY most_used ORDER BY most_used`;

const q2_2018 = `SELECT most_used,
Count(*) counts,
CAST(100*(COUNT(*)/sum(count(*)) over()) AS NUMBER(*,2)) percentage
FROM (
SELECT namefirst,namelast, STATS_MODE(pitch_type) most_used FROM HSLiao.pitches_2018 P
LEFT JOIN HSLIAO.atbats_2018 A ON A.abID = P.abID
LEFT JOIN HSLiao.players P1 ON A.pitcherID = P1.nameID WHERE pitch_type !='FF'
AND P1.playerID in (
SELECT playerID
FROM HSLiao.Pitching
WHERE yearID = 2018 AND G > 10 AND era <=(
SELECT PERCENTILE_CONT(0.2) WITHIN GROUP(ORDER BY era) FROM HSLiao.pitching
WHERE yearid = 2018 AND G > 10))
GROUP BY playerID, namefirst, namelast )
GROUP BY most_used ORDER BY most_used`;

async function run() {
  // chart 1
  const r1 = await db.run(q1);
  const counts = [];
  const mu = [];

  for (const item of r1) {
    counts.push(item.COUNTS);
    mu.push(item.MOST_USED);
  }

  // chart 2
  const r2_2015 = await db.run(q2_2015);
  const r2_2016 = await db.run(q2_2016);
  const r2_2017 = await db.run(q2_2017);
  const r2_2018 = await db.run(q2_2018);

  const c2015 = [];
  const c2016 = [];
  const c2017 = [];
  const c2018 = [];
  const mu2 = [];
  for (const item of r2_2015) {
    c2015.push(item.COUNTS);
    mu2.push(item.MOST_USED);
  }
  for (const item of r2_2016) {
    c2016.push(item.COUNTS);
  }
  for (const item of r2_2017) {
    c2017.push(item.COUNTS);
  }
  for (const item of r2_2018) {
    c2018.push(item.COUNTS);
  }

  const new_result = { mu, counts, c2015, c2016, c2017, c2018, mu2 };
  return JSON.stringify(new_result);
}

module.exports = { run };
