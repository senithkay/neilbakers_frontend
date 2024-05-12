import styles from './footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.wrapper}>
        <p>2024 Neil Bakery. All rights reserved</p>
        <p>Designed and Developed by <a href="http://www.itsoftsolutions.lk" target='_blank'>ITSOFT SOLUTIONS (PVT) LTD</a></p>
    </div>
  )
}

export default Footer