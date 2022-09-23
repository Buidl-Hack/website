import Hero from '../components/Hero';
import OtherBuilders from '../components/OtherBuilders';
import RecentPositions from '../components/RecentPositions';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeLayout}>
      <Hero />
      <OtherBuilders />
      <RecentPositions />
    </div>
  );
}
