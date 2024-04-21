import styles from './signedLand.module.scss'
import React from 'react';
import {STopBar} from '../../components/signed-in-compenents/s-top-bar/s-top-bar';
import {SearchBar} from '../../components/search-bar/search-bar';

import {Footer}  from '../../components/footer/footer';

function SignedLand() {
  return (
    <div className={styles.container}>
      <STopBar/>
      <div className={styles.content}>
        <SearchBar/>
        <div className={styles.middle}>
        
        </div>
        
      </div>
      <div className={styles.footer} >
          <Footer/>
      </div>
    </div>
  )
}
export default SignedLand;
