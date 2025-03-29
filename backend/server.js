const http = require("http")
const fs = require("fs")
const path = require("path")
const url = require("url")
const queryString = require("querystring")

const html1File = path.join(__dirname, "..", "frontend", "index.html")
const html2File = path.join(__dirname, "..", "frontend", "index.html")
const css1File = path.join(__dirname, "..", "frontend", "css", "style.css")
// const css2File = path.join(__dirname, "..", "frontend", "css", "style2.css")

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url)
    if (req.method === "GET") {
        if (parsedUrl.method === "/") {
            fs.readFile(html1File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                }else{
                    res.writeHead(200,{"Content-Type":"text/html"})
                    res.end(data)
                }
            })
        }
        if (parsedUrl.method === "/style1.css") {
            fs.readFile(css1File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                }else{
                    res.writeHead(200,{"Content-Type":"text/html"})
                    res.end(data)
                }
            })
        }
    }
})

port = 5000
server.listen(port, () => {
    console.log(`Server is Running at http://localhost/${port}`)
})