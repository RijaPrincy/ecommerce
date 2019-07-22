var Product = require('../model/productModel');
const fs = require('fs')
const jwt = require('jsonwebtoken');



module.exports.postArticle = function (req, res) {
    var titre = req.body.titre
    var description = req.body.description
    var prix = req.body.prix
    var idPoster = req.body.idPoster



    var imageFile1 = req.files.file0;
    var imageFile2 = req.files.file1;
    var imageFile3 = req.files.file2;

    // console.log("imagefile", imageFile);

    Product.find()
        .then(note0 => {
            if (note0.length == 0) {
                id = 0;
            } else {
                id = parseInt(note0[note0.length - 1].id) + 1;
            }
            img = id * 3
            const articles = new Product({ _id: id, description: description, prix: prix, titre: titre, img1: img + 1, img2: img + 2, img3: img + 3, idPoster: idPoster });
            (!titre || !description || !prix) ? console.log("mank donne ") : articles.save()
                .then((note) => {
                    imageFile1.mv(`${__dirname}/public/${img + 1}.jpg`, function (err) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                    });

                    imageFile2.mv(`${__dirname}/public/${img + 2}.jpg`, function (err) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                    });
                    imageFile3.mv(`${__dirname}/public/${img + 3}.jpg`, function (err) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                    });
                    jwt.verify(req.token, 'shhhhh', (err, authData) => {
                        if (err) {
                            console.log("forbidden2");
                
                            res.sendStatus(403);
                        } else {
                            res.json({
                                message: 'Post created...',
                                authData,
                                note
                            });
                        }
                    });
                })
                .catch(e => {
                    res.status(500).send({ mes: e.mes || "erreur" })
                })
        })
}



module.exports.image = (req, res) => {
    try {
        let a = fs.readFileSync('./controler/public/' + req.params.im + ".jpg")
        res.write(a)
        res.end()
    } catch (e) {
        console.log("tsy lasa le sary", e.stack);
    }
}


module.exports.getArticle = function (req, res) {

  Product.find({idPoster:req.params.id})
        .then(note0 => {
            

            console.log(req.params.id);
            
            res.send(note0)

        }) .catch(err=>{res.send("erreur")})
           
}