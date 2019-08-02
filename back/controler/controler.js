
var Profile = require('../model/registerModel');
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

var Product = require('../model/productModel');


module.exports.backRegister = (req, res) => {

    console.log("tafiditra");


    nom = req.body.nom
    email = req.body.email
    passWord = req.body.passWord
  
    

    Profile.find()
        .then(note0 => {


            if (note0.length == 0) {
                id = 0;
                console.log('mbola', id);

            } else {
                id = parseInt(note0[note0.length - 1].id) + 1;
            }


            var hash = bcrypt.hashSync(passWord, salt);

            const insert = new Profile({ _id: id, nom: nom, email: email, passWord: hash });
            (!nom || !email || !passWord) ? console.log(" nom reussi bla", nom, email, passWord) : insert.save()
                .then((e) => {
                    var token = jwt.sign({ e }, "shhhhh", { expiresIn: 129600 });
                    res.status(200).json({
                        token
                    })

                })
                .catch(e => {
                    console.log(e);

                    res.status(500).send({ mes: e.mes || "erreur" })
                })
        })

};


module.exports.backLogin = (req, res) => {

    email = req.body.email
    passWord = req.body.passWord
    console.log("email pwd", email, passWord);

    Profile.findOne({ email })
        .then(note0 => {
            console.log(note0);
            if (bcrypt.compareSync(passWord, note0.passWord)) {

                var token = jwt.sign({ note0 }, "shhhhh", { expiresIn: 129600 });
                res.status(200).json({
                    note0,
                    token
                })
            } else {
                res.send("not ok")
            }

        })
        .catch(e => {
            console.log(e);

            res.status(500).send({ mes: e.mes || "erreur" })
        })


};

module.exports.backAcc = (req, res) => {
    jwt.verify(req.token, 'shhhhh', (err, authData) => {
        if (err) {
            console.log("forbidden2");

            res.sendStatus(403);
        } else {
            console.log(req.body.b);

            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
}


module.exports.backgetAll = (req, res) => {
    Product.find()
        .then(note0 => {
            res.send(note0)
        })
        .catch((err) => {
            console.log(err);

        })

}









