import Image from 'next/image';
import { useEffect, useState } from 'react';
import { OPTIONS } from '../constants';
import style from '../styles/SearchProfile.module.css';

interface IProfile {
  experience: string;
  web3Experience: string;
  interests: string;
  role: string;
  author: string;
}

export default function SearchProfiles() {
  const [rolesFilter, setRolesFilter] = useState('');
  const [expFilter, setExpFilter] = useState('');
  const [filterRolesMenu, setFilterRolesMenu] = useState(false);
  const [filterExpMenu, setFilterExpMenu] = useState(false);
  const [positionsShown, setPositionsShown] = useState(6);
  const showMore = () => setPositionsShown(positionsShown + 6);
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<IProfile[]>([]);
  useEffect(() => {
    const a = [];
    for (let i = 0; i < 100; i++) {
      const date = new Date();
      date.setDate(Math.ceil(Math.random() * 10 + 10));
      a.push({
        author: [
          'realkdi',
          'weyonce',
          'abdul',
          'nuelgeek',
          'fidex',
          'omar',
          'moussab',
          'laotse',
          'socrates',
          'siddharta',
          'leonidas',
          'darthvador',
          'mattlevi',
        ][Math.round(Math.random() * 12)],
        role: OPTIONS.roles[Math.floor(Math.random() * 15)].text,
        interests: OPTIONS.interests[Math.floor(Math.random() * 7)].text,
        web3Experience: OPTIONS.web3Exp[Math.floor(Math.random() * 3)].text,
        experience: OPTIONS.experience[Math.floor(Math.random() * 8)].text,
      });
    }
    setProfiles(a);
    setFilteredProfiles(a);
  }, []);
  const toggleFilterRoles = () => setFilterRolesMenu(!filterRolesMenu);
  const toggleFilterWeb3Exp = () => setFilterExpMenu(!filterExpMenu);
  return (
    <div className={style.profiles}>
      <h2>Search our profiles</h2>
      <div className={style.filters}>
        <div>
          <button onClick={toggleFilterRoles}>
            {rolesFilter ? rolesFilter : 'Filter on role'}
          </button>
          {filterRolesMenu && (
            <div className={style.rolesOptions}>
              {OPTIONS.roles.map((role, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setPositionsShown(6);
                    setRolesFilter(rolesFilter === role.text ? '' : role.text);
                    setFilteredProfiles(
                      profiles
                        .filter((profile) =>
                          rolesFilter === role.text
                            ? true
                            : profile.role === role.text,
                        )
                        .filter((profile) =>
                          expFilter
                            ? profile.web3Experience === expFilter
                            : true,
                        ),
                    );
                  }}
                  className={style.roleOption}
                >
                  <p>
                    {role.text} (
                    {
                      profiles.filter((profile) => profile.role === role.text)
                        .length
                    }
                    )
                  </p>
                  <div className={style.checkbox}>
                    {rolesFilter === role.text && (
                      <span className={style.checkboxChecked}></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <button onClick={toggleFilterWeb3Exp}>
            {expFilter ? expFilter : 'Filter on web3 experience'}
          </button>
          {filterExpMenu && (
            <div className={style.rolesOptions}>
              {OPTIONS.web3Exp.map((web3Exp, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setPositionsShown(6);
                    setExpFilter(
                      expFilter === web3Exp.text ? '' : web3Exp.text,
                    );
                    setFilteredProfiles(
                      profiles
                        .filter((profile) =>
                          expFilter === web3Exp.text
                            ? true
                            : profile.web3Experience === web3Exp.text,
                        )
                        .filter((profile) =>
                          rolesFilter ? profile.role === rolesFilter : true,
                        ),
                    );
                  }}
                  className={style.roleOption}
                >
                  <p>
                    {web3Exp.text} (
                    {
                      profiles.filter(
                        (profile) => profile.web3Experience === web3Exp.text,
                      ).length
                    }
                    )
                  </p>
                  <div className={style.checkbox}>
                    {expFilter === web3Exp.text && (
                      <span className={style.checkboxChecked}></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={style.profilesContainer}>
        <ol className={style.profilesList}>
          {filteredProfiles.slice(0, positionsShown).map((profile, index) => (
            <div key={index} className={style.profileContainer}>
              <li className={style.profile}>
                <Image
                  src={`/nfts/profile/${(index % 19) + 1}.png`}
                  width={200}
                  height={200}
                  alt="position nft"
                />
                <div className={style.profileDescription}>
                  <div className={style.profileAuthor}>
                    <p>@{profile.author}</p>
                  </div>
                  <p className={style.profileRole}>{profile.role}</p>
                  <div>
                    {' '}
                    <p className={style.experience}>
                      {profile.experience} experience
                    </p>
                    <p className={style.web3Exp}>
                      web3: {profile.web3Experience}
                    </p>
                  </div>

                  <p className={style.interests}>
                    Interested in {profile.interests}
                  </p>
                </div>
              </li>
              {/* 
              <div className={style.arrowButton}>
                <span className={style.arrowBar}>
                  <span className={style.arrowTip1}></span>
                  <span className={style.arrowTip2}></span>
                </span>
              </div> */}
            </div>
          ))}
        </ol>
        {filteredProfiles.length > positionsShown && (
          <button className={style.loadMore} onClick={showMore}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
