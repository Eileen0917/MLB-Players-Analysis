# MLB-Players-Analysis

1. `cd MLB-Players-Analysis`

2. `npm i`

3. `touch .env`

```
PORT=3000

ORACLE_USER=YOUR_ORACLE_USER
ORACLE_PASSWORD=YOUR_ORACLE_PASSWORD
```

4. `npm run start`

5. `localhost:3000`and you should see `hello world!`

if you got error msg like `Error: listen EADDRINUSE: address already in use :::3000`
use `ps aux | grep node`
`kill -9 {the number shown above}`
