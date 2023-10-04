import Image from 'next/image';
import styles from './page.module.css';
import { UploadForm } from './Components/page';

const carsApi = [
  {
    carId: 1,
    brand: 'BMW',
    model: 'Série 7',
    steats: 4,
    licencePlate: 'MCS 3372',
    engineType: 'Conbustão',
    currentAutonomy: 234,
    image: '/uploads/bmw-m-series-seo-overview-ms-04.jpg',
  },
  {
    carId: 2,
    brand: 'BMW',
    model: 'Série 5',
    steats: 5,
    licencePlate: 'MCS 3323',
    engineType: 'Hibrido',
    currentAutonomy: 342,
    image: '/uploads/bmw-7-series-sedan-ms-G70.jpg',
  },
];

export default function Home() {
  async function getCars() {
    try {
      const res = await fetch('http://localhost:5000/api/cars', {
        method: 'GET',
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      const temp = JSON.parse(await res.text());
      console.log(' TEMP TEST ' + JSON.stringify(temp));

      return carsApi.map((car: any) => (
        <div key={car.carId}>
          <Image src={car.image} alt="car" width={'905'} height={'501'}></Image>
          <div>
            <div>Marca: {car.brand}</div>
            <div>Modelo: {car.model}</div>
            <div>Número de lugares: {car.steats}</div>
            <div>Matrícula: {car.licencePlate}</div>
            <div>Tipo de motor: {car.engineType}</div>
            <div>Autonomia Corrente: {car.currentAutonomy}</div>
          </div>
        </div>
      ));
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  }

  return (
    <main className={styles.main}>
      <UploadForm></UploadForm>
      {getCars()}
    </main>
  );
}
