import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGlobal } from '../use-global';
import { getMap } from '../services/map.service';

export default function MapPreview() {
  const { mapId } = useParams();
  const [{ authToken }, {}] = useGlobal();

  useEffect(() => {
    getMap(authToken, mapId).then(mapData => {
      console.log(mapData);
    });
  }, []);

  return <div>map preview here</div>;
}
