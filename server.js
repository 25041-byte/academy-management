const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const SECRET_PIN = "0808";

app.post('/api/verify-code', (req, res) => {
    const { code } = req.body;
    if (code === SECRET_PIN) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'الرمز السرّي غير صحيح' });
    }
});

app.get('/api/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'database.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'خطأ في قراءة البيانات' });
        res.json(JSON.parse(data || '{}'));
    });
});

app.post('/api/data', (req, res) => {
    fs.writeFile(path.join(__dirname, 'database.json'), JSON.stringify(req.body, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'خطأ في حفظ البيانات' });
        res.json({ success: true });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
