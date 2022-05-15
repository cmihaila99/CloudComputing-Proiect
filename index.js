const express = require('express')

const {detectLanguage, translateText}=require("./translateFunctions2")
//const cors = require('cors')
const app = express();
//app.use(cors())


detectLanguage('스트레이 키즈')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(error);
    });

const lyrics="It's Christmas Eve 밤새 내린 눈은 잠깐만 예뻐 낭만은 개뿔 눈치 없는 차들 땜에 금방 새까매진 거 봐 걷기도 빡세 눈밭보단 갯벌"

translateText(lyrics, 'en')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

const port = process.env.PORT || 8080;

app.use('/', express.static('frontend'))

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Search Song Lyrics application listening on port ${port}!`)
});

