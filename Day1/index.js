const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to backend day1 API');
});
app.post('/students', (req, res) => {
    const student = req.body;
    res.json({
        message: 'Student data received',
        data: student
    })
})
app.listen(3000, () => {
    console.groupCollapsed('Server is running on port http://localhost:3000');
});
