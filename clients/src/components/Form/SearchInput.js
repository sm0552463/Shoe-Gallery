import React from "react";
import {useSearch} from "../../context/search.js"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({...values, results: data});
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex  navbar_search" role="search" onSubmit={handleSubmit} >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ width: "450px", height: "45px", fontSize: "16px" }}
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit" >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
