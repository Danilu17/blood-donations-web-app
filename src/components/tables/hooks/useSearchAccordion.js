import { useState } from "react";

const useSearchAccordion = () => {
  const [searchValue, setSearchValue] = useState({});

  const handleSearch = (data) => {
    const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
    setSearchValue(filteredData);
  };

  const handleClear = () => {
    setSearchValue({});
  };

  return {
    searchValue,
    handleSearch,
    handleClear,
  };
};

export default useSearchAccordion;
