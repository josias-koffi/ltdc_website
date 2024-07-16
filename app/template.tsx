import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";


export default function Template({children}: { children: React.ReactNode }) {


  return <div>
    <Header/>
    {children}
    <Footer/>
  </div>;
}
