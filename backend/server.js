const http = require("http")
const fs = require("fs")
const path = require("path")
const url = require("url")
const queryString = require("querystring")
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017")

const html1File = path.join(__dirname, "..", "frontend", "index.html")
console.log(html1File);

const html2File = path.join(__dirname, "..", "frontend", "addpage.html")
const html3File = path.join(__dirname, "..", "frontend", "update.html")
const css1File = path.join(__dirname, "..", "frontend", "css", "style1.css")
const css2File = path.join(__dirname, "..", "frontend", "css", "style2.css")
const js1File = path.join(__dirname, "..", "frontend", "js", "index1.js")
const js2File = path.join(__dirname, "..", "frontend", "js", "index2.js")

const server = http.createServer(async (req, res) => {
    const db = client.db("contactbook")
    const collection = db.collection("contacts")
    console.log("Connected to database");

    const parsedUrl = url.parse(req.url)
    console.log(parsedUrl);

    if (req.method === "GET") {
        if (parsedUrl.pathname === "/") {
            fs.readFile(html1File, (err, data) => {
                if (err) {
                    res.writeHead(404)
                    res.end(err.message)
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" })

                    res.end(data)
                    // res.writeHead(302, { Location: "/getdata" })
                    // res.end()
                }
            })
        }
        else if (parsedUrl.pathname === "/css/style1.css") {
            fs.readFile(css1File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                } else {
                    res.writeHead(200, { "Content-Type": "text/css" })
                    res.end(data)
                }
            })
        }
        else if (parsedUrl.pathname === "/js/index1.js") {
            fs.readFile(js1File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                } else {
                    res.writeHead(200, { "Content-Type": "text/json" })
                    res.end(data)
                }
            })
        }


        else if (parsedUrl.pathname === "/addpage") {
            fs.readFile(html2File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" })
                    res.end(data)
                }
            })
        }
        else if (parsedUrl.pathname === "/css/style2.css") {
            fs.readFile(css2File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                } else {
                    res.writeHead(200, { "Content-Type": "text/css" })
                    res.end(data)
                }
            })
        }
        else if (parsedUrl.pathname === "/js/index2.js") {
            fs.readFile(js2File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                } else {
                    res.writeHead(200, { "Content-Type": "text/json" })
                    res.end(data)
                }
            })
        }

        else if (parsedUrl.pathname == "/getdata") {

            const data = await collection.find().toArray();

            console.log(data);

            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(data))

        }

        else if (parsedUrl.pathname == "/update") {

            fs.readFile(html3File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" })
                    res.end(data)
                }
            })
        }

        else if (parsedUrl.pathname === "/delete") {
            let id = queryString.parse(parsedUrl.query)
            collection.deleteOne({ _id: new ObjectId(id._id) }).then(() => {
                console.log("Deleted")
            }).catch((err) => {
                console.log(err.message)
            })

            res.writeHead(200, { "Content-Type": "text/html" })
            res.end(fs.readFileSync(html1File))

        }

        else {
            res.writeHead(404)
            res.end("404 Not Found")
        }
    }

    else if (req.method === "POST") {

        if (parsedUrl.pathname === "/send-data") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
                console.log(body);
            });

            req.on("end", async () => {
                console.log(body);
                const value = queryString.parse(body)
                await collection.insertOne(value).then(() => {
                    console.log("Inserted")
                }).catch((err) => {
                    console.log(err.message)
                })

                res.writeHead(200, { "Content-Type": "text/html" })
                res.end(fs.readFileSync(html1File))
            });
        }

        else if (parsedUrl.pathname === "/update-data") {

            let id = queryString.parse(parsedUrl.query)
            console.log(id);


            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
                console.log(body);
            });

            req.on("end", () => {
                console.log(body);
                const value = queryString.parse(body)

                console.log(value);

                collection.updateOne({ _id: new ObjectId(id._id) }, { $set: value }).then(() => {
                    console.log("Updated")
                }).catch((err) => {
                    console.log(err.message)
                })


                res.writeHead(200, { "Content-Type": "text/html" })
                res.end(fs.readFileSync(html1File))
            });
        }

    }

})

port = 8000

server.listen(port, () => {
    console.log(`Server is Running at http://localhost:${port}`)
})