// server.js
// Entry point del servicio PREDICT

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const predictRoutes = require("./routes/predictRoutes");
const { initModel } = require("./services/tfModelService");

const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
console.log(process.env.MONGO_URI );
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/prediccion')
.then(() => {
    console.log('Conexión a la base de datos establecida');
}).catch(err => {
    console.error('Error de conexión a la base de datos:', err);
});

// Servir la carpeta del modelo TFJS (model/model.json + pesos)
const modelDir = path.resolve(__dirname, "model");
app.use("/model", express.static(modelDir));

// Rutas del servicio PREDICT
app.use("/", predictRoutes);

// Arranque del servidor + carga del modelo
app.listen(PORT, async () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`[PREDICT] Servicio escuchando en ${serverUrl}`);

  try {
    await initModel(serverUrl);
  } catch (err) {
    console.error("Error al inicializar modelo:", err);
    process.exit(1);
  }
});
