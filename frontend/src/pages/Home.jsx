import BestSeller from '../components/BestSeller';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import NewsletterBox from '../components/NewletterBox';
import OurPolicy from '../components/OurPolicy';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
