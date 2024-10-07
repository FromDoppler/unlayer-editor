

import { useState } from '../../unlayer-react';
import { MyTabProps } from './types';

const CustomTabViewer: React.FC<MyTabProps> = () => {
  const [formData, setFormData] = useState<MyTabProps>({
    widgetUrl: 'www.misitio.com',
    startCondition: '',
    percentage: 30,
    seconds: 5,
    frequency: '',
    maxViews: 5,
    endCondition: '',
    maxShows: 30,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'radio' ? checked && value : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));

    window.parent.postMessage(JSON.stringify(formData), 'http://localhost:3000/');
  };

  return (
    <div id="abc" className="custom-tab">
      <h3>Mostrar widget en:</h3>
      <input
        type="text"
        name="widgetUrl"
        value={formData.widgetUrl}
        onChange={handleChange}
        className="input-text"
      />

      <h4>Cuando empezar a mostrar el widget:</h4>
      <div className="radio-group">
        <label><input type="radio" name="startCondition" value="immediately" checked={formData.startCondition === 'immediately'} onChange={handleChange} /> Inmediatamente</label>
        <label><input type="radio" name="startCondition" value="conditions" checked={formData.startCondition === 'conditions'} onChange={handleChange} /> Bajo alguna de las siguientes condiciones:</label>
        <label><input type="radio" name="startCondition" value="leaveSite" checked={formData.startCondition === 'leaveSite'} onChange={handleChange} /> Cuando el usuario deja el sitio web</label>
        <label>
          <input type="radio" name="startCondition" value="percentage" checked={formData.startCondition === 'percentage'} onChange={handleChange} />
          Cuando el usuario alcanza <input type="number" name="percentage" value={formData.percentage} onChange={handleChange} className="input-number" />% del sitio web
        </label>
        <label>
          <input type="radio" name="startCondition" value="seconds" checked={formData.startCondition === 'seconds'} onChange={handleChange} />
          Después de transcurridos <input type="number" name="seconds" value={formData.seconds} onChange={handleChange} className="input-number" /> segundos
        </label>
      </div>

      <h4>Frecuencia:</h4>
      <div className="radio-group">
        <label><input type="radio" name="frequency" value="eachPageView" checked={formData.frequency === 'eachPageView'} onChange={handleChange} /> Mostrar en cada vista de página del usuario</label>
        <label>
          <input type="radio" name="frequency" value="maxViews" checked={formData.frequency === 'maxViews'} onChange={handleChange} />
          Mostrar por día hasta <input type="number" name="maxViews" value={formData.maxViews} onChange={handleChange} className="input-number" /> veces por usuario
        </label>
      </div>

      <h4>Cuando dejar de mostrar el widget:</h4>
      <div className="radio-group">
        <label><input type="radio" name="endCondition" value="never" checked={formData.endCondition === 'never'} onChange={handleChange} /> Nunca</label>
        <label>
          <input type="radio" name="endCondition" value="conditions" checked={formData.endCondition === 'conditions'} onChange={handleChange} />
          Bajo alguna de las siguientes condiciones:
        </label>
        <label><input type="radio" name="endCondition" value="click" checked={formData.endCondition === 'click'} onChange={handleChange} /> Después de que el usuario haga clic</label>
        <label>
          <input type="radio" name="endCondition" value="maxShows" checked={formData.endCondition === 'maxShows'} onChange={handleChange} />
          Después de mostrar <input type="number" name="maxShows" value={formData.maxShows} onChange={handleChange} className="input-number" /> veces al usuario
        </label>
      </div>
    </div>
  );
};

export default CustomTabViewer;