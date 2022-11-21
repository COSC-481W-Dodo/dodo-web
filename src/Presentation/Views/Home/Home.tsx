import './home.css';
import AndroidIcon from '@mui/icons-material/Android';

function Home() {

    return (
        <div>
            <h1 className="home-header mt-3">Welcome to Dodo</h1>
            <h3>A study app for...dodos...</h3>
            <br />
            <h3><a href="https://www.dropbox.com/s/4myd0qbwpnrdjm2/app_sprint2.apk?dl=0" target="_blank" rel="noreferrer"> <AndroidIcon /> Download the App</a></h3>
        </div>
    );
}

export default Home;