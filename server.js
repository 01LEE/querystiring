const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'gg696923!!',
  database: 'peton'
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 데이터베이스 연결 실패: ", err);
    process.exit(1);
  }
  console.log("MySQL 데이터베이스에 연결되었습니다");
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

// 로그인 필요 확인 미들웨어
function isAuthenticated(req, res, next) {
  if (req.session.login_id) {
    return next();
  } else {
    res.redirect('/login');
  }
}

app.get('/', function(req, res) {
  console.log("세션 값:", req.session.login_id);
  res.render('home', { login_id: req.session.login_id });
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { login_id, password } = req.body;
  const query = 'SELECT * FROM user WHERE login_id = ? AND password = ?';

  db.query(query, [login_id, password], (err, results) => {
    if (err) {
      console.error("로그인 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }

    if (results.length > 0) {
      req.session.login_id = login_id;
      console.log("로그인 성공");
      res.send('<script>alert("로그인 성공!"); window.location.href = "/";</script>');
    } else {
      console.log("로그인 실패");
      res.send('<script>alert("로그인 실패"); window.location.href = "/login";</script>');
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("로그아웃 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }
    res.redirect('/');
  });
});

app.get('/noticeboard', isAuthenticated, function(req, res) {
  db.query('SELECT * FROM noticeboard', (err, results) => {
    if (err) {
      console.error("커뮤니티 조회 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }
    res.render('noticeboard', { noticeboard: results });
  });
});

app.get('/trainers', isAuthenticated, function(req, res) {
  db.query('SELECT * FROM Trainer', (err, results) => {
    if (err) {
      console.error("트레이너 조회 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }
    res.render('trainer', { trainers: results });
  });
});

app.get('/myinfo', isAuthenticated, function(req, res) {
  db.query('SELECT * FROM MyInfo', (err, results) => {
    if (err) {
      console.error("내 정보 조회 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }
    res.render('myinfo', { myInfos: results });
  });
});

app.get('/dogencyclopedia', isAuthenticated, function(req, res) {
  db.query('SELECT * FROM DogEncyclopedia', (err, results) => {
    if (err) {
      console.error("강아지 백과사전 조회 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }
    res.render('dogencyclopedia', { dogEncyclopedias: results });
  });
});

app.get('/adoption', isAuthenticated, function(req, res) {
  db.query('SELECT * FROM Adoption', (err, results) => {
    if (err) {
      console.error("입양 조회 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }
    res.render('adoption', { adoptions: results });
  });
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다`);
});
