const { Router } = require("express");

const router = Router();

//Controladores
const {
  getDrivers,
  getDriverById,
  getDriversByName,
  postDrivers
} = require("../controllers/drivers.controller");

//Rutas
router.get("/drivers", getDrivers);
router.get('/drivers', getDriversByName)
router.get('/drivers/:id', getDriverById)
router.post('/drivers', postDrivers)



module.exports = router;
