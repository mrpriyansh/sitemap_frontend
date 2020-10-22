import React from 'react';
import styles from './Hierarchy.module.css';

import Page from '../Page/Page';
import ChildrenHierarchy from '../ChildrenHierarchy/ChildrenHierarchy';

function Hierarchy ({parent, url}) {

    return (
      <div className={styles.hierarchy}>
        <div className={styles.parent}>
          <Page title={parent?.title} url={url} parent={parent?.parent} isParent={true} />
        </div>
        <ChildrenHierarchy data={parent?.children} parentTitle={parent?.title} parentUrl={url}/>
      </div>
    )
}

export default Hierarchy;