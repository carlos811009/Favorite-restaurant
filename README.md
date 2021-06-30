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

# 若想使用facebook登入請依循以下步驟

- 前往 https://developers.facebook.com/ ，按下"我的應用程式"
- 按下"建立應用程式"選擇"消費者"並輸入需要的資訊
### 再將env 資訊做修改
- FACEBOOK_ID="應用程式編號"  
- FACEBOOK_SECRET="應用程式密鑰"
- FACEBOOK_CALLBACK="專案網址"/auth/facebook/callback (本地操作可不填寫）

# 本地瀏覽
http://localhost:3000/

- 帳號: user1@example.com , 密碼：12345678
- 帳號: user2@example.com , 密碼：12345678
