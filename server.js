    require("dotenv").config();

    const express = require("express");
    const path = require("path");
    const fs = require("fs");

    const authRoutes = require("./routes/auth");
    const uploadRoutes = require("./routes/upload");

    const app = express();

    const PORT = process.env.PORT || 3000;

    // cria a pasta uploads se não existir
    if (!fs.existsSync("./uploads")) {
        fs.mkdirSync("./uploads");
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // arquivos do site
    app.use(express.static(path.join(__dirname, "public")));

    // rotas
    app.use("/", authRoutes);
    app.use("/upload", uploadRoutes);

    // inicia servidor
   app.listen(PORT, "0.0.0.0", () => {
    console.log(`ORVIX rodando na porta ${PORT}`);
});