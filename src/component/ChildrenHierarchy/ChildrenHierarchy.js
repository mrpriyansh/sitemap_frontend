import React, { useState } from 'react';
import styles from './ChildrenHierarchy.module.css';
import Carousel from 'react-multi-carousel';
import Page from '../Page/Page';
import "react-multi-carousel/lib/styles.css";
import { useGlobal } from '../../services/context';
import SelectSearch from 'react-select-search';

function ChildrenHierarchy ({data, parentTitle, parentUrl}) {
    const [children, changeChildren] = useState(data);
    const {response, setUrl, setData} = useGlobal();
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6,
          slidesToSlide: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };
    const comparator = (a, b) => {
        if(!response.mapping[a.url]) return 1;
        if(!response.mapping[b.url] || response.mapping[b.url]?.children?.length < response.mapping[a.url]?.children?.length )  
          return -1;
        return 1;
    }
    const options = data.map((child, i)=>{
      return {name: `${child.title}(${child.url}) `, value: i }
    });
  const onOptionChange =(e) =>{
    const {url, title} = data[e];
    setUrl(url);
    if(response.mapping[url])
        setData(response.mapping[url]);
    else setData({children:[], title, parent:parentUrl })
  }
  data.sort(comparator);
    return (
      
        <div className={styles.childrenhierarchy}>
          {data.length ? 
            <>
            <hr />

            <div className={styles.header}>
              <div className={styles.parents_title}>
                <span>Parent </span> - {parentTitle}
              </div>
              <SelectSearch options={options}  search={true} name="language" placeholder="Search Child Page" onChange={onOptionChange}/>

            </div>
            <hr />
            <Carousel 
                responsive={responsive}
                containerClass={styles.container}
                itemClass={styles.items}
            >
            {data.map(child =>{
                return <Page title={child.title} url={child.url} isParent={false} />
            })} 
            </Carousel>
            
          {response.mapping[data[0]?.url]?.children?.length?<ChildrenHierarchy data={response.mapping[data[0]?.url]?.children} parentTitle={response.mapping[data[0]?.url]?.title} parentUrl={data[0]?.url}/> : null}
          </> : <div className={styles.last_page}> This is the last page! Go upward if Possible! </div> }
        </div>
    )
}

export default ChildrenHierarchy;