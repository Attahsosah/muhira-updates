import React, { useContext } from 'react';
import { FaTools } from 'react-icons/fa'; // Importing a tool icon from react-icons
import { PageLoadedContext } from './context/CarCardContext';
// Test
const UnderConstruction = () => {
  const [loaded, setLoaded] = useContext(PageLoadedContext);
  return (
    <div className={loaded ? "flex flex-col items-center justify-center min-h-screen bg-gray-100":"hidden"}>
      <FaTools className="text-6xl mb-4 text-blue-500" />
      <h1 className="text-4xl font-bold mb-2">Under Construction</h1>
      <p className="text-gray-600">We are working on something amazing for Gurex! </p>
      <p className="text-gray-600">Stay Tuned! </p>

    </div>
  );
};

export default UnderConstruction;
