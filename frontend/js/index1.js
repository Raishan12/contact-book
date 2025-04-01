let div = document.getElementById("book")

async function getContact(){
    const res = await fetch("/getdata")
    console.log(res);
    const data = await res.json()
    console.log(data);

    let str = ``
    data.forEach(e=>{
        str+=`<div class="contacts">
                    <div class="name">
                        <p><span class="textname">Name: </span><span class="text">${e.name}</span></p>
                        <p><span class="textname">Phone: </span><span class="text">${e.phone}</span></p>
                    </div>
                    <div class="btns">
                        <a href="/update?_id=${e._id}"><div class="button">Edit</div></a>
                        <a href="/delete?_id=${e._id}"><div class="button">Delete</div></a>
                    </div>

                </div>`
                // <div class="hamburg"><img src="../images/icons8-menu-24.png"></div>
    })

    div.innerHTML = str
    
}

getContact()

