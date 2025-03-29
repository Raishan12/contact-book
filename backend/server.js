const http = require("http")
const fs = require("fs")
const path = require("path")
const url = require("url")
const queryString = require("querystring")

const html1File = path.join(__dirname, "..", "frontend", "index.html")
const html2File = path.join(__dirname, "..", "frontend", "addpage.html")
const css1File = path.join(__dirname, "..", "frontend", "css", "style1.css")
const css2File = path.join(__dirname, "..", "frontend", "css", "style2.css")
const js1File = path.join(__dirname, "..", "frontend", "js", "index1.js")
const js2File = path.join(__dirname, "..", "frontend", "js", "index2.js")

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url)
    if (req.method === "GET") {
        if (parsedUrl.pathname === "/") {
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
        else if (parsedUrl.pathname === "/css/style1.css") {
            fs.readFile(css1File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                }else{
                    res.writeHead(200,{"Content-Type":"text/css"})
                    res.end(data)
                }
            })
        }
        else if (parsedUrl.pathname === "/js/index1.js") {
            fs.readFile(js1File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                }else{
                    res.writeHead(200,{"Content-Type":"text/json"})
                    res.end(data)
                }
            })
        }


        else if (parsedUrl.pathname === "/addpage") {
            fs.readFile(html2File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                }else{
                    res.writeHead(200,{"Content-Type":"text/html"})
                    res.end(data)
                }
            })
        }
        else if (parsedUrl.pathname === "/css/style2.css") {
            fs.readFile(css2File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                }else{
                    res.writeHead(200,{"Content-Type":"text/css"})
                    res.end(data)
                }
            })
        }
        else if (parsedUrl.pathname === "/js/index2.js") {
            fs.readFile(js2File, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end(err.message)
                }else{
                    res.writeHead(200,{"Content-Type":"text/json"})
                    res.end(data)
                }
            })
        }

        else {
            res.writeHead(404)
            res.end("404 Not Found")
        }



    }
})

port = 5000
server.listen(port, () => {
    console.log(`Server is Running at http://localhost/${port}`)
})