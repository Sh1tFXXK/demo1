// app.js
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname,'views' ,'index.html')))


app.get('/api/:date?', (req, res) => {
    let date = req.params.date;

    if (!date) {
        // 如果没有指定日期，则使用当前时间
        date = new Date();
    } else {
        // 尝试解析日期字符串或时间戳
        if (!isNaN(date)) {
            // 如果是时间戳，则直接创建 Date 对象
            date = new Date(parseInt(date));
        } else {
            // 尝试解析日期字符串
            date = new Date(date);
        }

        if (isNaN(date.getTime())) {
            // 如果解析失败，则返回错误信息
            return res.json({ error: 'Invalid Date' });
        }
    }

    const unixTimestamp = date.getTime(); // 获取 Unix 时间戳
    const utcString = date.toUTCString(); // 生成 UTC 字符串

    // 返回结果
    res.json({ unix: unixTimestamp, utc: utcString });
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

