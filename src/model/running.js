const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://root:example@localhost:27017/";
const client = new MongoClient(url);

router.get("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("admin");
    const running = db.collection("RUNNING");
    await running.find({ }).limit(5).toArray((err, data) => {
      if(err) {
        res.status(400).send("recurso não encontrado");
        return;
      }
      res.json(data);
    });
  } catch (e) {
    console.log(e);
    res.json({ error: true, message: "erro ao conectar com a base" });
    client.close();
  }
});

const replaceAttr = (obj) => {
  const retorno = {
    date: obj.date,
    values: obj.values.rota,
  };
  return retorno;
}

router.get("/rotas", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("admin");
    const running = db.collection("RUNNING");
    await running.find({ }).limit(5).toArray((err, data) => {
      if(err) {
        res.status(400).send("recurso não encontrado");
        return;
      }
      const newData = data.map(replaceAttr);
      res.json(newData);
    });
  } catch (e) {
    console.log(e);
    res.json({ error: true, message: "erro ao conectar com a base" });
    client.close();
  }
} , []);

module.exports = router;
