# 我的餐廳清單

## 建立自己的喜好餐廳
![image](https://github.com/carlos811009/Q1-3-/blob/main/%E6%88%AA%E5%9C%96%202021-06-20%2018.57.24.png)

# 線上體驗
https://restaurantwebcarlos.herokuapp.com/

# 測試帳號

- 帳號: user1@example.com , 密碼：12345678
- 帳號: user2@example.com , 密碼：12345678

# 開發環境
### Node.js (V10.15.0)

# 資料庫
### mongoDB with Robo3T

# 套件
- express
- express-handlebars
- method-override
- bcryptjs
- passport
- passport-local
- passport-facebook
- express-session
- connect-flash

# download File
git clone https://github.com/carlos811009/Q1-3-.git

# Step

- 連線本地mongoDB
- 開啟Robo3T (預設為localhost:27017)
- 專案資料夾內新建.env(設定開發環境）
- npm install express
- npm run seed
- node app.js 

# 開發環境
請參考 .env example

# env設置

建立.env 檔將 .env.example 內容複製貼上，並依照下面步驟更改

前往 https://developers.facebook.com/ ，按下"我的應用程式"
按下"建立應用程式"選擇"消費者"並輸入需要的資訊
按下左方"設定"的"基本資料"其
"應用程式編號" 即為FACEBOOK_ID
"應用程式密鑰" 即為FACEBOOK_SECRET
按下左方 "Facebook 登入" 的設定，訂在"有效的 OAuth 重新導向 URI"欄位中輸入
若為本地端請輸入，則不用輸入，
.env中的"專案網址"改為 "http://localhost:3000"
若上傳至server 請輸入
"專案網址"/auth/facebook/callback
定更改.env "FACEBOOK_CALLBACK" 的內容如上
FACEBOOK_ID="應用程式編號"  
FACEBOOK_SECRET="應用程式密鑰"
FACEBOOK_CALLBACK="專案網址"/auth/facebook/callback

# 本地瀏覽
http://localhost:3000/

- 帳號: user1@example.com , 密碼：12345678
- 帳號: user2@example.com , 密碼：12345678
