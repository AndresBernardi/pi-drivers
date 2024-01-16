import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterByOrigin,
  getAllDrivers,
  getAllTeams,
  filterByTeam,
  orderByBirthdateAsc,
  orderByBirthdateDesc,
  orderByName,
} from "../../redux/actions";
import styles from './filter.module.css'

const FilterDrivers = () => {

  const dispatch = useDispatch();
  const [team, setTeam] = useState("all");


  const teams = useSelector((state) => state.allTeams).sort(function (a, b) {
    if (a < b) return -1;
    else return 1;
  });

  const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value));
  };

  const handleOrderByBirthdate = (event) => {
    const order = event.target.value;
    if (order === "asc") {
      dispatch(orderByBirthdateAsc());
    } else if (order === "desc") {
      dispatch(orderByBirthdateDesc());
    }
  };

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  const handleFilterByTeam = (event) => {
    setTeam(event.target.value);
    dispatch(filterByTeam(event.target.value));
  };

  useEffect(() => {
    dispatch(getAllDrivers());
    dispatch(getAllTeams());
  }, [dispatch]);

  return (
    <div className={styles.flex}>
      <div>
        <div>Filter by origin</div>
        <select className={styles.input}
          onChange={(event) => {
            handleFilterByOrigin(event);
          }}
        >
          <option value="all">All Drivers</option>
          <option value="api">Api drivers</option>
          <option value="from_DB">My drivers</option>
        </select>
      

        <div>Filter by team</div>
        <select className={styles.input}
          value={team}
          onChange={(event) => {
            handleFilterByTeam(event);
          }}
        >
          <option value="all">All teams</option>
          {teams.map((team) => {
            return (
              <option value={team} key={team}>
                {team}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <div>Order by name</div>
        <select className={styles.input}
          onChange={(event) => {
            handleOrderByName(event);
          }}
        >
          <option value="name">By Name</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>

        <div>Order by birthdate</div>
        <select className={styles.input} onChange={handleOrderByBirthdate}>
          <option value="bybirthdate">By Birthdate</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  );
};

export default FilterDrivers;