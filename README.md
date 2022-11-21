# Crypto Assests handler

## Config


```bash
vi src/config/app.config.ts
```

## Build

```bash
npm run build
```

## Development

```bash
npm run start
```

## Usage

### 1) Given no parameters, return the latest portfolio value per token in USD

```bash
node dist/index.js
```
![](./docs/get-total-balance.png)

### 2) Given a token, return the latest portfolio value for that token in USD

```bash
node dist/index.js token --name btc
```
![](./docs/balance-per-token.png)

### 3) Given a date, return the portfolio value per token in USD on that date

```bash
node dist/index.js time --timestamp 1571966499
```
![](./docs/balance-per-time.png)

### 4) Given a date and a token, return the portfolio value of that token in USD on that date

```bash
node dist/index.js filter --name btc --timestamp 1571966499
```
![](./docs/balance-per-time.png)