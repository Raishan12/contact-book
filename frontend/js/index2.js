const urlparams = new URLSearchParams(window.location.search)
const id = urlparams.get("_id")


async function getContact(){
    const res = await fetch("/getdata")
    console.log(res);
    const data = await res.json()
    console.log(data);
    detail = data.find(e=>{
        e._id===id
        return e
    })
    let divi = document.getElementById("contacts")
    let str = `
    <form action="/update-data?_id=${id}" method="post" id="form">
        <div class="name">
            <label for="name">Name: </label>
            <input type="text" name="name" id="name" value=${detail.name}>
        </div>
        <br><br>
        <div class="name">
            <label for="phone">Phone: </label>
            <input type="text" name="phone" id="phone" value=${detail.phone}>
        </div>
        <input type="submit" value="Update" class="button">    
    </form>

    `
    divi.innerHTML = str
}

getContact()