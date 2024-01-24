const axios = require("axios");
const { Driver, Team } = require("../db");
const { where } = require("sequelize");
const { Op } = require("sequelize"); 

const cleanArrApi = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      forename: elem.name.forename,
      surname: elem.name.surname,
      birthdate: elem.dob,
      image: elem.image.url,
      teams: elem.teams,
      nationality: elem.nationality,
      description: elem.description,
      created: false,
    };
  });

  const cleanArrDB = (arr) =>
  arr.map((elem) => {
      return {
          id: elem.id,
          forename: elem.forename,
          surname: elem.surname,
          birthdate: elem.birthdate,
          image: elem.image,
          teams: elem.teams, // Convertir la lista de equipos en una cadena de texto
          nationality: elem.nationality,
          description: elem.description,
          created: true,
      }
  })
  
  
const driverId = async (id) => {
  
  const src = isNaN(id) ? "DB" : "API";
  if(src == "API"){
   const response = await axios.get(`http://localhost:5000/drivers/${id}`);
   const responseData = response.data
    return {
      id: responseData.id,
      forename: responseData.name.forename,
      surname: responseData.name.surname,
      image: responseData.image.url,
      birthdate : responseData.dob,
      nationality : responseData.nationality,
      teams: responseData.teams,
      description: responseData.description,
    }
  }else if(src == 'DB'){
    const driverId = await Driver.findByPk(id, { include: Team });
    return driverId
  } else{
    return "No se encontro el driver"
  }

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

  const allDrivers = async (req, res) => {
    const dataDB = await Driver.findAll({
      include: Team,
    });
  
    const driversFromDB = cleanArrDB(dataDB);
  
    const apiData = (await axios.get("http://localhost:5000/drivers")).data;
    const driversFromApi = cleanArrApi(apiData);
    const combinedData = [...driversFromApi, ...driversFromDB];
    return combinedData;
  };
  
  const searchDriverByName = async (name) => {
    const lowerCaseName = name.toLowerCase(); //
    try{
    const dbDrivers = await Driver.findAll({
      where: {
        forename: {
          [Op.iLike]: `%${lowerCaseName}%`,
        },
      },
      include: Team, // Incluir la relación con los equipos
    });
  
    const apiData = (await axios.get("http://localhost:5000/drivers"));
    const apiDataDrivers = apiData.data;
    const apiDrivers = cleanArrApi(apiDataDrivers);
  

    const filteredApiDrivers = apiDrivers.filter(
      (driver) => driver.forename.toLowerCase() === lowerCaseName
    );
  
    const combinedData = [...filteredApiDrivers, ...dbDrivers];
  
    return combinedData;
  }catch(error){
    console.log('Ocurrio un error!')
  }
  }
  const getDrivers = async (req, res) => {
    const { name } = req.query;
    const results = name ? await searchDriverByName(name) : await allDrivers();
  
    res.status(200).json(results);
  };

//Get Driver By Name
const getDriversByName = async(req, res) => {
  const name = req.query.name
  const allDrivers = await allDriversController()
  const driversByName = allDrivers.filter((driver)=> driver.forename.toLowerCase().includes(name.toLowerCase()))
  res.status(200).json(driversByName)
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
