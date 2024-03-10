const express = require("express");
const accountRoutes = express.Router();
const fs = require("fs");

const dataPath = "./../users.json";

const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getAccountData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

accountRoutes.get("/users", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});

accountRoutes.post("/user/add", (req, res) => {
  var existAccounts = getAccountData();
  var newElement = req.body;
  newElement["id"] = Math.floor(100000 + Math.random() * 900000).toString();
  newElement["picture"] =
    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5";
  existAccounts.push(newElement);

  saveAccountData(existAccounts);
  res.send({ success: true, msg: "account data added successfully" });
});

accountRoutes.get("/user/:id", (req, res) => {
  const accounts = getAccountData();
  const userId = req.params["id"];
  const user = accounts.find((field) => field.id == userId);
  res.send(user ? user : `accounts with id ${userId} not found`);
});

accountRoutes.put("/account/:id", (req, res) => {
  var existAccounts = getAccountData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      const accountId = req.params["id"];
      existAccounts[accountId] = req.body;

      saveAccountData(existAccounts);
      res.send(`accounts with id ${accountId} has been updated`);
    },
    true
  );
});

accountRoutes.delete("/user/delete/:id", (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      var existAccounts = getAccountData();

      const userId = req.params["id"];
      var filtered = existAccounts.filter(function (item) {
        return item.id !== userId;
      });

      saveAccountData(filtered);
      res.send(`accounts with id ${userId} has been deleted`);
    },
    true
  );
});
module.exports = accountRoutes;
