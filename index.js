// app.js

const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
    let dateParam = req.params.date;
    let date;



    if (!dateParam) {
        date = new Date();
        // 如果没有提供日期，使用当前日期
    } else if (!isNaN(dateParam)) {
        date = new Date(parseInt(dateParam)); // 如果是数字，解析为时间戳
    } else {
        date = new Date(dateParam); // 否则，解析为日期字符串
    }

    if (date.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }
    res.json({ unix: date.getTime(), utc: date.toUTCString() });


});

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器正在运行在 http://localhost:${PORT}`);
});