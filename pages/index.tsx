import Hero from '../components/Hero';
import MostActive from '../components/MostActive';
import RecentPositions from '../components/RecentPositions';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeLayout}>
      <Hero />
      <RecentPositions />
      <MostActive />
    </div>
  );
}
