import type { NextPage } from "next"; 
import { useRouter } from 'next/router'


const Home: NextPage = () => {
  const router = useRouter()

  router.push('dashboard')
  return (
    <div>
    </div>
  );
};

export default Home;
