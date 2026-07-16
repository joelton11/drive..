const express = require("express");
const multer = require("multer");
const fs = require("fs");

const uploadDrive = require("../services/drive");


const router = express.Router();



const storage = multer.diskStorage({

    destination:"uploads/",


    filename(req,file,cb){

        cb(
            null,
            Date.now()+"-"+file.originalname
        );

    }


});



const upload = multer({

    storage

});





router.post("/", upload.array("arquivos",20), async(req,res)=>{


    try{


        if(!req.files || req.files.length===0){

            return res.json({

                sucesso:false,

                mensagem:"Nenhum arquivo enviado"

            });

        }



        let enviados=[];



        for(const arquivo of req.files){


            const id = await uploadDrive(arquivo);


            enviados.push(id);



            fs.unlinkSync(
                arquivo.path
            );


        }




        res.json({

            sucesso:true,

            mensagem:"Arquivos enviados para o Drive",

            arquivos:enviados

        });



    }catch(error){


        console.log(error);



        res.status(500).json({

            sucesso:false,

            mensagem:"Erro no envio"

        });


    }


});



module.exports = router;