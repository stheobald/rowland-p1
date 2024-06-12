import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <img src="/Rowland_on_white.png" alt="Logo" className="h-24 w-full mr-3" />
        {/* <h1 className="text-2xl font-bold">Rowland AI</h1> */}
      </div>
    </header>
  );
};

export default Header;