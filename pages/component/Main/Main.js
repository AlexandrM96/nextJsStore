
import Aside from '../Aside/Aside';
import Content from '../Content/Content';
import styles from '../../../styles/Main.module.css';

export default function Main() {
  return (
    <main className="main">
      <section className={styles.main__container }>
        <Aside />
        <Content />
      </section>
    </main>
  );
}


