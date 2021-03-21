const express = require("express");
const http = require("http");
const app = express();
const db = require("./models");
const storage = [10];
const cors = require("cors");
const foo = { bar: 1, bas: 2 };
console.log(foo);
console.log(foo.bar);
const key = "bas";
console.log(foo[key]);
console.log(foo.foo);
// console.log({db})
app.use(cors());
app.use(express.json());
app.get("/health", (request, response, next) => {
  // response.json({status: 'ok'})
  const costomError = new Error("any error");
  costomError.status = 400;
  next(costomError);
});

app.get("/list-items", (request, response, next) => {
  const query = request.query;
  const { bar } = foo;
  const where = {};
  if (query.id) {
    where.id = query.id;
  }

  db.todos
    .findAll({
      where,
    })
    .then((foobar) => {
      console.log({ foobar });
      response.json({ status: "ok", data: foobar });
    })
    .catch((err) => console.log(err));
});

app.post(
  "/create-item",
  [
    (req, res, next) => {
      console.log("TEST MIDDLEWARE");
      next();
    },
  ],
  (req, res, next) => {
    const payload = req.body;
    console.log(payload);
    db.todos.create(payload).then((info) => {
      console.log(info);
      res.json({ status: "Ok", item: info });
    });

    // let data = ''
    // req.on('data', (chunk) => {
    //     data+=chunk;
    // })

    // req.once('end', () => {
    //     console.log(data)
    //     try {
    //         const parsed = JSON.parse(data)
    //         console.log(parsed.data)
    //         res.json({
    //             ok: true
    //         })
    //     } catch (e) {
    //         next(e)
    //     }
    // })
  }
);

app.delete(
  "/delete-item",
  [
    (req, res, next) => {
      console.log("TEST MIDDLEWARE");
      next();
    },
  ],
  (req, res, next) => {
    const where = {};
    const payload = req.body;
    const body = req.body;
    console.log(payload);
    const id = body.id;
    const zalupaKonskaja = {
      where: { id: body.id },
    };
    if (body.id) {
      where.id = body.id;
    }
    console.log(where.id);
    console.log(zalupaKonskaja);
    db.todos
      .destroy(zalupaKonskaja)
      .then((info) => {
        console.log(info);
        res.json({ status: "Ok" });
      })
      .catch((votGovno) => {
        res.status(500).json({ message: votGovno.message });
      });
  }
);

app.patch("/todo/:id", (req, res) => {
  
  const searchId = req.params.id;
  const payload = req.body;
  console.log({ searchId, payload });
  db.todos
    .update(payload, {
      where: {
        id: searchId,
      },
    })
    .then(() => {
      res.json({ status: "ok" });
    }).catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

app.use((errA, foo, bar, baz) => {
  console.log(errA);
  bar.status(errA.status || 500).json({
    message: errA.message,
  });
});

const server = http.createServer(app);

server.listen(4000, () => {
  console.log("awesome server");
});
