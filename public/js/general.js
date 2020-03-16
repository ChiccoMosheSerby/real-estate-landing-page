


let hotDealsFromDB = ["Condo Herzliya, Israel 2,850,000 USD ",
    "Apartment - Ramat Gan, Israel 3,150,000 USD ",
    "Condo - Kiryat Motzkin, Israel 1,790,000 USD ",
    "Apartment - Netanya, Israel 3,150,000 USD ",
    "Condo - Kiryat Gat, Israel 1,790,000 USD ",
    "House Re'ut - Modi'in, Israel 6,200,000 USD",
    "<img style='border:solid white 1px' src='/img/BG.png' alt=''>"];

    
let counter = 0;
let elem = $("#footer");
setInterval(change, 4000);

function change() {

    elem.fadeOut(function () {
        elem.html(hotDealsFromDB[counter]);
        counter++;
        if (counter >= hotDealsFromDB.length) { counter = 0; }
        elem.fadeIn();
    });


}

// let landingForm = document.getElementById('landingForm');
addEventListener("submit", addLeadToDB);

function addLeadToDB(e) {
    e.preventDefault();

    let newLeadObj =
    {
        email: e.target.email.value,
        name: e.target.name.value,
        phone: e.target.phone.value,
        message: e.target.concept.value
    };

    //push new lead to DB
    fetch("/newLeadRouter",
        {
            method: 'POST',
            body: JSON.stringify(newLeadObj),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(result => {
        result.json().then(res => {
            this.setState({})
        })
    }

    )
    // footer.style.backgroundColor = 'black';
    // footer.style.color = 'var(--themColor2)';

    e.target.email.value = '';
    e.target.name.value = '';
    e.target.phone.value = '';
    e.target.concept.value = '';
    thankYou.innerText = 'thanks! we recived your message';
}
