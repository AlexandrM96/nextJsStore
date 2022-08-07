import Aside from '../Aside/Aside';
import Content from '../Content/Content';
import styles from '../../../styles/Main.module.css';

export default function Main(props) {

    return (
        <main className="main">
            <section className={styles.main__container}>
                {/*<Aside items={props.items}/>*/}
                {/*<Content/>*/}
            </section>
        </main>
    );
}

