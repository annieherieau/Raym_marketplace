import React, { useState } from 'react';
import ConfigScreen from '../../components/ConfigScreen/ConfigScreen';


const Configurator = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <ConfigScreen toggleDrawer={toggleDrawer} />

    </div>
  );
};

export default Configurator;
