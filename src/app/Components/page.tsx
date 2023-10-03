'use client';

import { useState } from 'react';
import './form.css';

export function UploadForm() {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);
      data.set(
        'marca',
        (e.currentTarget.elements[0] as HTMLInputElement).value
      );
      data.set(
        'modelo',
        (e.currentTarget.elements[1] as HTMLInputElement).value
      );
      data.set(
        'seats',
        (e.currentTarget.elements[2] as HTMLInputElement).value
      );
      data.set(
        'engine',
        (e.currentTarget.elements[3] as HTMLInputElement).value
      );

      const formData = {
        marca: data.get('marca') as String,
        modelo: data.get('modelo'),
        seats: data.get('seats'),
        engine: data.get('engine'),
        file: `/uploads/${file.name}`,
      };
      console.log(formData);

      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }

    try {
      const data = new FormData();
      data.set('file', file);
      data.set(
        'marca',
        (e.currentTarget.elements[0] as HTMLInputElement).value
      );
      data.set(
        'modelo',
        (e.currentTarget.elements[1] as HTMLInputElement).value
      );
      data.set(
        'seats',
        (e.currentTarget.elements[2] as HTMLInputElement).value
      );
      data.set(
        'engine',
        (e.currentTarget.elements[3] as HTMLInputElement).value
      );

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit} className="linha">
      <label htmlFor="marca">Marca</label>
      <input type="text" name="marca" id="marca" placeholder="BMW" required />
      <label htmlFor="modelo">Modelo</label>
      <input
        type="text"
        name="modelo"
        id="modelo"
        placeholder="Modelo"
        required
      />
      <label htmlFor="seats">Número de lugares</label>
      <input type="number" name="seats" id="seats" placeholder="5" required />
      <div className="linha">
        <label>Tipo de motor</label>
        <div className="power">
          <div>
            <input
              type="radio"
              id="conbustao"
              name="engine"
              value="Conbustão"
            />
            <label htmlFor="conbustao">Conbustão</label>
          </div>
          <div>
            <input type="radio" id="eletrico" name="engine" value="Elétrico" />
            <label htmlFor="eletrico">Elétrico</label>
          </div>
          <div>
            <input type="radio" id="hibrido" name="engine" value="Hibrido" />
            <label htmlFor="hibrido">Hibrido</label>
          </div>
        </div>
      </div>
      <label htmlFor="file">Imagem</label>
      <input
        type="file"
        name="file"
        id="file"
        required
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="Adicionar" />
    </form>
  );
}
