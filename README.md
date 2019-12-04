# 專案名稱 : 爸爸的私房錢
# 功能簡介
* 使用者登入
  * 使用facebook登入
  * 在網站註冊新帳號並登入
* 在登入下檢視所有記帳
* 依照分類檢視記帳
* 新增記帳
* 刪除現有記帳
* 編輯現有記帳




# 安裝說明
#### 開啟終端機，將專案下載至本機端
      git clone https://github.com/philip-lai/Sem3W5A17_papas_selfish_money.git

#### 切換檔案路徑至專案資料夾，並安裝套件
      1. 確認本機已安裝Mongodb及Robo 3T
      2. 使用終端機切換目錄至專案
      3. 使用終端機安裝套件：npm install
      4. 開起Robo 3T，建立一新資料庫名為moneybook
      5. 切換目錄至./models/seed/，並執行npm run seeder
      6. 至facebook developers創建應用程式取得client ID及client secret
      7.在根目錄新增.env這個檔案並寫入以下
      FACEBOOK_ID= //your Client ID
      FACEBOOK_SECRET= //your Client secret
      FACEBOOK_CALLBACK= http://localhost:3000/auth/facebook/callback

#### 3. 執行專案
      npm run dev
      

# 使用工具
* visual studio
* "bcryptjs": "^2.4.3",
* "body-parser": "^1.19.0",
* "connect-flash": "^0.1.1",
* "dotenv": "^8.2.0",
* "express": "^4.17.1",
* "express-handlebars": "^3.1.0",
* "express-session": "^1.17.0",
* "method-override": "^3.0.0",
* "mongoose": "^5.7.13",
* "passport": "^0.4.0",
* "passport-facebook": "^3.0.0",
* "passport-local": "^1.0.0"
* Robo 3T




