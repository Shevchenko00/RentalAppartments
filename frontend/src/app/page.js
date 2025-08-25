'use client';
import Header from "@/components/Header/Header";
import styles from './page.module.scss'
import Button from "@/components/Button/Button";
import AnimatedSection from "@/components/AnimateSection/AnimateSection";
import Card from "@/components/Cards/Card";
import Footer from "@/components/Footer/Footer";
export default function Home() {
    const links = [
        { title: 'Sign in', href: '/login' },
        { title: 'Apartments', href: '/apartments' },
    ];
  return (
      <div>
          <Header links={links} />
          <main>
              <div className={styles.main_container}>
                  <AnimatedSection>
                  <section>
                      <h1 className={styles.title_comfort}>
                          We're working for<br /> your comfort.
                      </h1>

                      <div className={styles.content_wrapper}>
                          <div className={styles.image_block}>
                              <img src="/images/ComfortTitleImage.png" alt="Logo" width={588} height={392} />
                          </div>
                          <div className={styles.text_block}>
                              <p>
                                  From the moment you walk through our doors, every detail is thoughtfully arranged to make your stay
                                  as relaxing and enjoyable as possible. Whether it’s the softness of your pillow, the warmth of your
                                  morning coffee, or the ease of check-in, our team is always working behind the scenes to elevate your
                                  experience. Your comfort isn’t a coincidence — it’s our mission.
                              </p>
                              <Button text={'Booking'}/>
                          </div>
                      </div>
                  </section>
                  </AnimatedSection>
                  <section>
                      <AnimatedSection direction="right" distance={100} duration={0.6} delay={0.2}>
                      <h1 className={styles.title_grid}>See Where Comfort Lives</h1>
                      <div className={styles.grid_wrapper}>
                          <div className={styles.grid_container}>
                              <img className={styles.grid_section} src='/images/grid1/Frame1.png' />
                              <img className={styles.grid_section} src='/images/grid1/Frame2.png' />
                              <img className={styles.grid_section} src='/images/grid1/Frame3.png' />
                              <img className={styles.grid_section} src='/images/grid1/Frame4.png' />
                          </div>
                          <div className={styles.grid_container}>
                              <img className={styles.grid_section} src='/images/grid2/Frame1.png' />
                              <img className={styles.grid_section} src='/images/grid2/Frame2.png' />
                              <img className={styles.grid_section} src='/images/grid2/Frame3.png' />
                              <img className={styles.grid_section} src='/images/grid2/Frame4.png' />
                          </div>
                      </div>
                      </AnimatedSection>
                  </section>
                  <section>
                      <h1 className={styles.title_grid}>People Trust Us</h1>
                      <Card/>
                  </section>
              </div>

          </main>
          <Footer/>
      </div>

  )

}
