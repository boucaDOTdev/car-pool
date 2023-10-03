import Image from 'next/image';
import styles from './page.module.css';
import { UploadForm } from './Components/page';

export default function Home() {
  return (
    <main className={styles.main}>
      <UploadForm></UploadForm>
      <Image
        src={'/uploads/bmw-m-series-seo-overview-ms-04.jpg'}
        alt="BMW"
        width={'905'}
        height={'501'}
      ></Image>
    </main>
  );
}
