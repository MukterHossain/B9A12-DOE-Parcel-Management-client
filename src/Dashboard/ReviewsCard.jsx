// import CountUp from "react-countup/build/CountUp";
import altLogo from '../../src/assets/altLogo.jpg'


const ReviewsCard = ({ item }) => {
    const { name, image, rating, feedback, date } = item;

    return (
        <div>
            <div className="card card-compact w-full  bg-sky-100  hover:scale-105 transition-all shadow-xl">
                <img className="max-w-24 mx-auto rounded-full mt-3 max-h-24 group-hover:scale-125" src={image  ? image : altLogo} alt='profile' />
                <div className="card-body">
                    <h2 className="card-title uppercase text-blue-600 font-bold">{name}</h2>
                    <p>{feedback}</p>
                    <p>date: {date}</p>
                    <hr />
                    <div className="space-y-2">
                        <p>rating {rating}</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsCard;