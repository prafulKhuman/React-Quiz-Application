import Header from "./../../Component/Header";
import Footer from "./../../Component/Footer";
import Banner from "./Banner";
import ScoreCard from "./ScoreCard";
import QuizList from "./QuizList";
import WrokeProcess from "./WrokeProcess";
function Dashboard() {
    return (<>
        <Header />
        <main id="top">
            <Banner/>
            <ScoreCard/>
            <QuizList/>
            <WrokeProcess/>
        </main>
        <Footer />
    </>);
}

export default Dashboard;