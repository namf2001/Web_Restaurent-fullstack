import VideoIntro from '../../../assets/video/Restaurant Ad Video Template (Editable).mp4'
const About = () => {
    return (
        <div className="relative mt-24 h-screen overflow-hidden z-20">
            <div className="absolute left-0 top-0 right-0 inset-1 max-h-[450px]">
                <video className="object-cover h-full w-full"  autoPlay muted loop>
                    <source src={VideoIntro} type="video/mp4"/>
                </video>
            </div>
        </div>
    )
}

export default About