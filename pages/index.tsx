import Hero from '../components/Hero';
import OtherBuilders from '../components/OtherBuilders';
import SearchProfiles from '../components/SearchProfiles';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeLayout}>
      <Hero />
      <OtherBuilders />
      <SearchProfiles />
    </div>
  );
}
