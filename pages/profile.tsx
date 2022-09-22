import Link from 'next/link';
import style from '../styles/profile.module.css';

export default function Profile() {
  return (
    <div className={style.profilePage}>
      <div>
        <h2>My profile</h2>
        <div className={style.profileBox}>
          <div className={style.buttonContainer}>
            <Link href="edit" passHref>
              <a className={style.profileButtons}>edit profile</a>
            </Link>
          </div>
          <div className={style.profileContainer}>
            <div className={style.profileNft}></div>
            <div className={style.profileContent}>
              <div className={style.profileItems}>
                <div className={style.profileItem}>
                  <p>@realweyonce</p>
                  <p>0xferfrefr</p>
                </div>
                <div className={style.profileItem}>
                  <p>Experience</p>
                  <p>4-5y</p>
                </div>
                <div className={style.profileItem}>
                  <p>Web3 experience</p>
                  <p>Expert</p>
                </div>
                <div className={style.profileItem}>
                  <p>Interests</p>
                  <p>DAOs</p>
                </div>
              </div>
              <div className={style.profileRolesBox}>
                <p>Roles</p>
                <div className={style.profileRoles}>
                  <p>UI/UX</p>
                  <p>Product designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Work activity</h2>
      <div>
        <div className={style.buttonContainer}>
          <Link href="add-position" passHref>
            <a className={style.profileButtons}>add position</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
