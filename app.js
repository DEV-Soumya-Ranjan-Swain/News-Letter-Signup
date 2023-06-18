const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const { url } = require("inspector");
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/sign-up.html")
})

app.post("/", (req, res) => {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const mail = req.body.email;

    const data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",

                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }

            }
        ]
    }


    var jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/446f97210d"

    const options = {
        method: "POST",
        auth: "justtolearn:99255d866f67f660a594571ffbdc14fa-us8"
    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }
    })


    app.post("/failure",function(req,res){
        res.redirect("/");
    })

    request.write(jsonData);
    request.end();

})

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running");
})
