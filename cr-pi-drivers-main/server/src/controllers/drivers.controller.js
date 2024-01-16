const axios = require("axios");
const { Driver, Team } = require("../db");
const { where } = require("sequelize");

const cleanArrayAPI = (array) => {
  return{
    id: array.id,
    forename: array.name.forename,
    surname: array.name.surname,
    description: array.description,
    image: array.image.url ? array.image.url : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
    nationality: array.nationality,
    birthdate: array.dob,
    created: false,
  }
}
const getDrivers = async (req, res) => {

  const driversAPI = await axios.get('http://localhost:5000/drivers').then((res)=> res.data)
  const driversMapped = driversAPI.map((driver)=> cleanArrayAPI(driver))
  res.status(200).json(driversMapped)
}

const cleanArrayDB = ({forename, surname, description, image, nationality, birthdate, teams}) => {
 // const teamNames = array.teams.map((team) => team.name).join(",");
  return {
    forename,
    surname,
    description,
    image,
    nationality,
    birthdate,
    //teams: teamNames,
    created: true,
  };
};

const driverId = async (id) => {
  
  const src = isNaN(id) ? "DB" : "API";
  const driverId =
    src == "API"
      ? cleanArrayAPI(
          (await axios.get(`http://localhost:5000/drivers/${id}`)).data
        )
      : cleanArrayDB(await Driver.findByPk(id, { include: Team }));
  return driverId;
};

const getDriverById = async (req, res) => {
  const id = req.params.id;
  try {
    const driver = await driverId(id);
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get Driver By Name
const getDriversByName = async(name) => {
    
  const name2 = name.toLowerCase();
  const drivers = await getDrivers();
  const resultadoNombre = drivers.filter((driver) => driver.name.toLowerCase().includes(name2));

  if(resultadoNombre.length > 15) {
      const sliced = resultadoNombre.slice(0,15)
      return sliced;
  }
  else if(resultadoNombre.length < 15){
      return resultadoNombre;
  }
  else{
      throw new Error('No existe ningún piloto con el nombre especificado')
  }

}

//Post Drivers

const postDrivers = async (req, res) => {
  const { forename, surename, description, image, nationality, birthdate, teams } = req.body;
  try {
    if(!teams){throw new Error("Teams are required")}
    const team = await Team.findAll({where: {name: teams}})

    if(image == '') {
      const newDriver = await Driver.create({
        forename,
        surename,
        description,
        nationality,
        birthdate,
      })
      await newDriver.addTeams(team)
      return res.status(200).json({ message: "Driver created successfully without image" });
    }else{
      const newDriver = await Driver.create({
        forename,
        surename,
        description,
        image: image,
        nationality,
        birthdate,
      })
      await newDriver.addTeams(team)
      return res.status(200).json({ message: "Driver created successfully with image" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDrivers,
  getDriverById,
  getDriversByName,
  postDrivers,
};
