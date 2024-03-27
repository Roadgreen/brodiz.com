import React, { useEffect, useState } from "react";


const useViewportSize =  () => {

  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.document.documentElement.clientWidth : 0,
    height: typeof window !== 'undefined' ? window.document.documentElement.clientHeight : 0,
  });

  const handleResize = () => {
    if (typeof window !== 'undefined') {
      setViewportSize({
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight,
      });
    }
  };

  useEffect(() => {
    // Mettez à jour la taille du viewport au montage initial
    handleResize();

    // Ajoutez un écouteur d'événement de redimensionnement
    window.addEventListener("resize", handleResize);

    // Nettoyez l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Le tableau de dépendances est vide, donc cela s'exécute une seule fois

  return viewportSize;
};

export default useViewportSize;
